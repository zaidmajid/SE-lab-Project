import userModel from "../models/userModel.js";
import frontendlogsModel from "../models/frontendlogsModel.js";
import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import { saveLogs } from "./backendlogsController.js";
import { usersAudit } from "./usersauditController.js";


export const registerController = async (req, res) => {
  try {
    const { name, email, password,role,answer} = req.body;
    console.log(req.body);
    //validations
    if (!name) {
      return res.send({message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    if (!role) {
      return res.send({ message: "Role is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      role,
      answer,
    }).save();

    // User Insert Audit
    usersAudit(user._id,"INSERT","-",user);
    
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) { 
    console.log(error);
    saveLogs(error.message,"/register","POST") 
    res.status(500).send({
      success: false,    
      message: "Error in Registeration",
      error,
    });
  }
};
//get managers
export const getManagers = async (req, res) => {
  try {
    const users = await userModel.find({ role: 0, active: true }); // Only fetch users with role 0
    return res.json(users);
  } catch (error) {
    saveLogs(error.message,"/managers","GET") 
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
//get users
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({  active: true }); 
    return res.json(users);
  } catch (error) {
    saveLogs(error.message,"/managers","GET") 
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const toggleActive = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.active = !user.active;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    saveLogs(error.message,"/manager/toggleActive/:id","PUT");
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//get a manager 
export const getManager = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id }); 
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    saveLogs(error.message,"/manager/:id","GET");
    return res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
};
// edit manager 
export const editManager = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const oldValue = await userModel.find({_id:userId});

    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: userId },
      updatedData,
      { new: true }
    );

    usersAudit(userId,"UPDATE",oldValue[0],updatedData); 

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    
    }

    res.status(200).json({ User: updatedUser });
  } catch (error) {
    saveLogs(error.message,"/manager/:id","PUT");
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
};
//Delete Manager

export const delManager = async (req, res) => {
  try {
    const userId = req.params.id;
    const oldValue = await userModel.find({_id:userId}); 
   

    const deletedUser = await userModel.findOneAndDelete({ _id: userId });
    usersAudit(userId,"DELETE",oldValue[0],"-");

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({  deletedUser });
  } catch (error) {
    saveLogs(error.message,"/manager/:id","DELETE");
    return res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
};
//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not registered",
      });
    }

    // Check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Adjust the expiration time according to your needs
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    saveLogs(error.message,"/login","POST");
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in login",
    });
  }
};

  
//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    saveLogs(error.message,"/forgot-password","POST");
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

  export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      saveLogs(error.message,"/test","GET");
      console.log(error);
      res.send({ error });
    }
  };

  export  const fronEndlogsController =async (req, res) => {
      const ErrorMessage=req.body.message;
      const pageURL=req.body.url;
      const portal=req.body.portal;
      console.log(req.body);
      const log = new frontendlogsModel({ ErrorMessage,pageURL,portal});
      await log.save();

      res.send({ message: "Log saved" });
  };