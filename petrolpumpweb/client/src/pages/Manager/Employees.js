import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Form, Input, Button, message, Switch } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./../../components/Layout/Layout";
import { toast } from "react-toastify";

import { Select, Avatar, Badge } from "antd";

import ManagerMenu from "../../components/Layout/ManagerMenu";

const Employees = () => {
  const [employeesArray, setEmployeeArray] = useState([]);
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editEmployee, setEditEmployee] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState(true);

  const handleClose = () => {
    setShow(false);
    setIsEdit(false);
  };

  const handleShow = () => setShow(true);

  const getEmployee = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:8080/api/employee/${id}`);
      setEditEmployee(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    handleShow();
    setIsEdit(true);
    getEmployee(id);
  };

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

  const handleToggleActive = async (id) => {
    try {
      const { data } = await axios.put(`http://localhost:8080/api/employee/toggleActive/${id}`);
      toast.success("Employee Active Status Updated Successfully");
      getEmployees();
    } catch (error) {
      toast.error("Error updating active status");
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  async function submit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:8080/api/employee/add", {
        name: formData.name,
        email: formData.email,
        cnic: formData.cnic,
        address: formData.address,
        phone: formData.phone,
        salary: formData.salary,
      });

      toast.success("Employee Added Successfully ....");
      setEmployeeArray([...employeesArray, data]);
      setLoading(false);
      handleClose();
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  }

  const editData = async () => {
    try {
      const { data } = await axios.put(`http://localhost:8080/api/employee/${editEmployee?._id}`, formData);
      getEmployees();
      handleClose();
    } catch (error) {}
  };

  return (
    <>
      <Layout title="Employees">
        <div className="container-fluid m-3 p-3 dashboard" style={{ backgroundColor: "#001f3f", color: "white", minHeight: "100vh" }}>
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
                        {/* ... other form items */}
                        <Form.Item label="Active" name="active">
                          <Switch checked={activeStatus} onChange={() => setActiveStatus(!activeStatus)} />
                        </Form.Item>
                        {/* ... other form items */}
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
                  {loading ? "loading ..." : "Save"}{" "}
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
                <table className="table ml-20">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">CNIC</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Address</th>
                      <th scope="col">Salary</th>
                      <th scope="col">Active</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeesArray?.map((employee, index) => {
                      return (
                        <tr key={employee._id}>
                          <td>{index + 1}</td>
                          <td>{employee?.name}</td>
                          <td>{employee?.email}</td>
                          <td>{employee?.cnic}</td>
                          <td>{employee?.phone}</td>
                          <td>{employee?.address}</td>
                          <td>{employee?.salary}</td>
                          <td>
                            <Switch
                              checked={employee?.active}
                              onChange={() => handleToggleActive(employee._id)}
                            />
                          </td>
                          <td>
                            <button className="btn btn-secondary mx-2" onClick={() => handleEdit(employee._id)}>Update</button>
                            <button className="btn btn-danger" onClick={() => delEmployee(employee?._id)}>Delete</button>{" "}
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
