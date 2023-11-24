import backendlogsModal from "../models/backendlogsModel.js";

export const saveLogs = async (ErrorMessage, pageURL,request) => {
    
    const log = new backendlogsModal({ ErrorMessage,pageURL,request});
    await log.save();

    return;
  };