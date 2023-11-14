import Employee from '../models/employeeModel.js'


export const AddEmployee = async (req, res) => {

try {
    
    const employee = new Employee(req.body
       );
    await employee.save();

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the employee.' });
  }
}
export const getEmployees = async (req, res) => {
    // console.log("Hello");
    try {
        const employee = await Employee.find()
        return res.json(employee)
    } catch (error) {
        
    }
}

export const getEmployee = async (req, res) => {
   
    try {
        const employee = await Employee.findOne({_id: req.params.id})
        res.status(200).json(employee);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the list of Employee.' });
      }
}

export const editEmployee = async (req, res) => {
  try {
    // console.log(req.params.id);
      const employeeId = req.params.id;
      const updatedData = req.body;
  
      const updatedEmployee = await Employee.findByIdAndUpdate(
          { _id: employeeId },
          updatedData,
          { new: true }
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      res.status(200).json({ Employee: updatedEmployee });
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the Employee.' });
  }
}

export const delEmployee = async (req, res) => {

    try {
        const employee = await Employee.findOneAndDelete({_id: req.params.id})
       return res.json(employee)

    } catch (error) {
        
    }
}
