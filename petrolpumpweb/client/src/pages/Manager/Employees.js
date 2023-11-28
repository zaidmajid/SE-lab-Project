import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Form, Input, Button, Switch } from "antd";
import { toast } from "react-toastify";
import Layout from "./../../components/Layout/Layout";
import { saveLogs } from "../../components/utils/logs";
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
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee/${id}`);
      setEditEmployee(data);
      setActiveStatus(data.active);
      setLoading(false);
    } catch (error) {
      saveLogs(error.message,"Manager/employee","Manager") 
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    handleShow();
    setIsEdit(true);
    getEmployee(id);
  };

  const handleToggleActive = async (id) => {
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/employee/toggleActive/${id}`);
      toast.success("Employee Active Status Updated Successfully");
      getEmployees();
    } catch (error) {
      saveLogs(error.message,"Manager/employee","Manager") 
      toast.error("Error updating active status");
    }
  };

  const getEmployees = async () => {
    try {
      let { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/employees`);
      setEmployeeArray(data);
    } catch (err) {
      saveLogs(err.message,"Manager/employee","Manager") 
      console.log("Error", err);
    }
  };

  const delEmployee = async (id) => {
    try {
      const data = await axios.delete(`${process.env.REACT_APP_API_URL}/api/employee/${id}`);
      getEmployees();
    } catch (error) {
      saveLogs(error.message,"Manager/employee","Manager") 
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  async function submit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/employee/add`, {
        name: formData.name,
        email: formData.email,
        cnic: formData.cnic,
        address: formData.address,
        phone: formData.phone,
        salary: formData.salary,
        active: activeStatus,
      });

      toast.success("Employee Added Successfully ....");
      setEmployeeArray([...employeesArray, data]);
      setLoading(false);
      handleClose();
    } catch (err) {

      saveLogs(err.message,"Manager/employee","Manager") 
      toast.error(err.response.data);
      setLoading(false);
    }
  }

  const editData = async () => {
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/employee/${editEmployee?._id}`, {
        ...formData,
        active: activeStatus,
      });
      getEmployees();
      handleClose();
    } catch (error) {
      saveLogs(error.message,"Manager/employee","Manager") 
      console.error("Error updating employee:", error);
    }
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
                <div className="bg-primary flex justify-center items-center">
                  <div className="bg-white p-4 rounded w-[475px]">
                    <h1 className="text-primary py-4 text-center text-2xl">
                      <span className="text-orange-500 text-2xl">
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
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                          <Input
                            placeholder="Email"
                            value={formData.email}
                            defaultValue={isEdit ? editEmployee?.email : ""}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </Form.Item>
                        <Form.Item label="CNIC" name="cnic">
                          <Input
                            placeholder="CNIC"
                            value={formData.cnic}
                            defaultValue={isEdit ? editEmployee?.cnic : ""}
                            onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                          />
                        </Form.Item>
                        <Form.Item label="Phone" name="phone">
                          <Input
                            placeholder="Phone"
                            value={formData.phone}
                            defaultValue={isEdit ? editEmployee?.phone : ""}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </Form.Item>
                        <Form.Item label="Address" name="address">
                          <Input
                            placeholder="Address"
                            value={formData.address}
                            defaultValue={isEdit ? editEmployee?.address : ""}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          />
                        </Form.Item>
                        <Form.Item label="Salary" name="salary">
                          <Input
                            placeholder="Salary"
                            value={formData.salary}
                            defaultValue={isEdit ? editEmployee?.salary : ""}
                            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
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
                    !isEdit && !formData.phone ||
                    !isEdit && !formData.salary ||
                    loading
                  }
                >
                  {loading ? "Loading..." : "Save"}
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="col-md-9">
              <div className="container">
                <div className="d-flex justify-content-between mt-3 ml-20">
                  <h2>Employees</h2>
                  <button className="btn btn-success" onClick={handleShow}>
                    + Add
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
                    {employeesArray?.map((employee, index) => (
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
                          <button
                            className="btn btn-secondary mx-2"
                            onClick={() => handleEdit(employee._id)}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => delEmployee(employee?._id)}
                          >
                            Delete
                          </button>{" "}
                        </td>
                      </tr>
                    ))}
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
