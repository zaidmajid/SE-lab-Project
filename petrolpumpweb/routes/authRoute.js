import express from "express";
import {registerController,
    loginController,
    testController,
    forgotPasswordController
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);
//LOGIN || POST
router.post("/login",loginController);
//test routs
router.get("/test",requireSignIn,isAdmin, testController);
//protected Admin route auth
router.get("/admin-auth", requireSignIn,isAdmin,  (req, res) => {
    res.status(200).send({ ok: true });
  });
  //protected Manager route auth
router.get("/user-auth", requireSignIn,  (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;