import React, { useContext, useEffect } from "react"
import {useState} from "react"
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./../../components/Layout/Layout";
import { toast } from "react-toastify";

import { Select,  Avatar, Badge } from "antd";

import ManagerMenu from "../../components/Layout/ManagerMenu";



const Employees = () => {

  const [employeesArray, setEmployeeArray] = useState([]);
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false)
  const [editEmployee ,setEditEmployee] = useState({})
  const handleClose = () => {
    setShow(false)
    setIsEdit(false)
  }
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);


  const getEmployee = async (id) => {
    setLoading(true)
    try {
        console.log(id);
      const {data} = await axios.get(`http://localhost:8080/api/employee/${id}`);
      console.log(data);
      setEditEmployee(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
const handleEdit = (id) => {
  console.log(id);
  handleShow();
  setIsEdit(true);
  getEmployee(id);
}
 
  const getEmployees = async () => {
    try {
      let { data } = await axios.get("http://localhost:8080/api/employees");
      setEmployeeArray(data);
    } catch (err) {
      console.log("Error", err);
    }
  };


 

  const delEmployee = async (id) => {
    try {
      const data = await axios.delete(`http://localhost:8080/api/employee/${id}`);
      getEmployees();
    } catch (error) {}
  };

  


  useEffect(() => {
    getEmployees();
  }, []);

  async function submit(e) {
    e.preventDefault();

    
    try {
      setLoading(true);
      const {data} = await axios.post("http://localhost:8080/api/employee/add", {
        name:formData.name,
        email:formData.email,
        cnic:formData.cnic,
        address:formData.address,
        phone:formData.phone,
        salary:formData.salary
       
      });

      toast.success("Employee Added Successfully ....");
      setEmployeeArray([...employeesArray, data])
      setLoading(false);
      handleClose()

      // console.log("SIGNUP RESPONSE: ", data);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  }

  const editData = async () => {
    try {

      const {data} = await axios.put(`http://localhost:8080/api/employee/${editEmployee?._id}`, formData );
      getEmployees()
      handleClose()

    } catch (error) {}
  }
  const dashboardStyle = {
    backgroundColor: "#001f3f", // Dark blue color
    color: "white",
    minHeight: "100vh", // Set a minimum height to cover the entire viewport
  };

  const cardStyle = {
    backgroundColor: "#001f3f", // Darker blue color for the card background
    color: "white",
    padding: "20px",
    borderColor: "beige",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.1)", // White shadow for better visibility
  };
  return (
  
    <>
  
  <Layout title="Employees">
      <div className="container-fluid m-3 p-3 dashboard" style={dashboardStyle}>
        <div className="row">
          <div className="col-md-3">
            <ManagerMenu />
          </div>
          
        <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit" : "Add"} Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" bg-primary flex justify-center items-center">
            <div className="bg-white p-4 rounded w-[475px]">
              <h1 className="text-primary py-4 text-center text-2xl">
                <span className="text-orange-500 text-2xl">
                  {" "}
                  {isEdit ? "Edit" : "Add New"} Employee
                </span>
              </h1>
            

              {loading ? "Loading..." : (
                <Form layout="horizontal">
                <Form.Item label="Name" name="name">
                  <Input
                    placeholder="Name"
                    value={formData.name}
                    defaultValue={isEdit ? editEmployee?.name : ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Email" name="Email">
                  <Input
                    placeholder="Email"
                    value={formData.email}
                    defaultValue={isEdit ? editEmployee?.email : ""}

                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="CNIC" name="cnic">
                  <Input
                    placeholder="cnic"
                    value={formData.cnic}
                    defaultValue={isEdit ? editEmployee?.cnic : ""}

                    onChange={(e) =>
                      setFormData({ ...formData, cnic: e.target.value })
                    }
                  />
                </Form.Item>
               
                <Form.Item label="Phone" name="phone">
                  <Input
                    placeholder="phone"
                    value={formData.phone}
                    defaultValue={isEdit ? editEmployee?.phone : ""}

                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item label="Address" name="address">
                  <Input
                    placeholder="address"
                    value={formData.address}
                    defaultValue={isEdit ? editEmployee?.address : ""}

                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item label="Salary" name="salary">
                  <Input
                    placeholder="salary"
                    value={formData.salary}
                    defaultValue={isEdit ? editEmployee?.salary : ""}

                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                  />
                </Form.Item>
               
            
              </Form>
            


              )}
              
            </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="mt-3"
            onClick={isEdit ? editData : submit}
            disabled={
              !isEdit && !formData.name ||
              !isEdit && !formData.email ||
              !isEdit && !formData.cnic ||
              !isEdit && !formData.address ||
              !isEdit && !formData.salary ||

              loading
            }
          >
            {loading ? "loading ...": "Save"}{" "}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="col-md-9">
      <div className="container ">
        <div className="d-flex justify-content-between mt-3 ml-20">
          <h2>Employee</h2>
          <button className="btn btn-success" onClick={handleShow}>
            +Add
          </button>
        </div>
        <table class="table ml-20">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">CNIC</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Salary</th>
             <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeesArray?.map((employee, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{employee?.name}</td>
                  <td>{employee?.email}</td>
                  <td>{employee?.cnic}</td>
                  <td>{employee?.phone}</td>
                  <td>{employee?.address}</td>
                  <td>{employee?.salary}</td>

                  <td>
                    <button class="btn btn-secondary mx-2" 
                    onClick={() => handleEdit(employee._id)}>Update</button>
                    <button
                      class="btn btn-danger"
                      onClick={() => delEmployee(employee?._id)}
                    >
                    Delete
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>
      </div>
      </div>
      </Layout>
    </>
  
  );
};

export default Employees;
