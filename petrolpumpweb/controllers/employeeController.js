import Employee from '../models/employeeModel.js';
import { saveLogs } from "./backendlogsController.js";
import { employeeAudit } from "./employeeauditController.js";


export const AddEmployee = async (req, res) => {

try {
    
    const employee = new Employee(req.body
       );
    await employee.save();
    employeeAudit(employee._id,"INSERT","-",employee);

    res.status(201).json(employee);
  } catch (error) {
    saveLogs(error.message,"/employee/add","POST") 
    res.status(500).json({ error: 'An error occurred while adding the employee.' });
  }
}


export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ active: true });
    res.json(employees);
  } catch (error) {
    saveLogs(error.message,"/employees","GET") 
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the list of employees.' });
  }
};

export const toggleActive = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    employee.active = !employee.active;
    await employee.save();

    res.status(200).json(employee);
  } catch (error) {
    saveLogs(error.message,"/employee/toggleActive/:id","PUT") 
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getEmployee = async (req, res) => {
   
    try {
        const employee = await Employee.findOne({_id: req.params.id})
        res.status(200).json(employee);
      } catch (error) {
        
    saveLogs(error.message,"/employee/:id","GET") 
        res.status(500).json({ error: 'An error occurred while fetching the list of Employee.' });
      }
}

export const editEmployee = async (req, res) => {
  try {
    // console.log(req.params.id);
      const employeeId = req.params.id;
      const updatedData = req.body;
      const oldValue = await Employee.find({_id: req.params.id}); 
      const updatedEmployee = await Employee.findByIdAndUpdate(
          { _id: employeeId },
          updatedData,
          { new: true }
      );
      employeeAudit(employeeId,"UPDATE",oldValue[0],updatedData); 
      if (!updatedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      res.status(200).json({ Employee: updatedEmployee });
  } catch (error) {
      saveLogs(error.message,"/employee/:id","PUT") 
      res.status(500).json({ error: 'An error occurred while updating the Employee.' });
  }
}

export const delEmployee = async (req, res) => {

    try {
      
        const oldValue = await Employee.find({_id: req.params.id}); 
        const employee = await Employee.findOneAndDelete({_id: req.params.id})
        employeeAudit(employee._id,"DELETE",oldValue[0],"-");
        
       return res.json(employee)

    } catch (error) {
      saveLogs(error.message,"/employee/:id","DELETE") 
               res.status(500).json({ error: 'An error occurred while deleting the Employee.' });
    }
}
