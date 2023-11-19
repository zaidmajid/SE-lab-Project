import express from 'express';
const router = express.Router();


import { AddEmployee, delEmployee, editEmployee, getEmployee, getEmployees,toggleActive } from "../controllers/employeeController.js";

router.post("/employee/add",AddEmployee);

router.get("/employees",getEmployees);
router.put("/employee/:id", editEmployee)

router.get("/employee/:id", getEmployee)

router.delete("/employee/:id", delEmployee)
router.put("/employee/toggleActive/:id", toggleActive); 

export default router;