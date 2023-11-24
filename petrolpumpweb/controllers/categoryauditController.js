import categoryauditModel from "../models/categoryauditModel.js";

export const categoryAudit = async (categoryid, action, oldValue, newValue) => {
    
    const audit = new categoryauditModel({categoryid,action,oldValue,newValue});
    await audit.save();

    return;
  };