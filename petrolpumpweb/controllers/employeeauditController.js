import employeeauditModel from "../models/employeeauditModel.js";

export const employeeAudit = async (employeeid, action, oldValue, newValue) => {
    
    const audit = new employeeauditModel({employeeid,action,oldValue,newValue});
    await audit.save();

    return;
  };