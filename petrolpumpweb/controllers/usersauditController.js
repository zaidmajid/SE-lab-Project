import usersauditModel from "../models/usersauditModel.js";

export const usersAudit = async (userid, action, oldValue, newValue) => {
    
    const audit = new usersauditModel({userid,action,oldValue,newValue});
    await audit.save();

    return;
  };