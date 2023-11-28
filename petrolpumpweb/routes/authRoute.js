import express from "express";
import {registerController,
    loginController,
    testController,
    forgotPasswordController,
    delManager, editManager, getManager, getManagers,toggleActive,fronEndlogsController
    ,getUsers
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router(); 

//routing
//REGISTER || METHOD POST
router.post("/register", registerController); //post request ha or path is ka copy kr lia mene
router.post("/frontendLogs", fronEndlogsController);

router.get("/managers",getManagers);
router.put("/manager/:id", editManager)

router.get("/manager/:id", getManager)
router.put("/manager/toggleActive/:id", toggleActive);
router.delete("/manager/:id", delManager)
//get users
router.get("/users",getUsers);
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