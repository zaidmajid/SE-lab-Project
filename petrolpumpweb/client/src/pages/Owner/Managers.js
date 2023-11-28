import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Form, Input, Button, Switch } from "antd";
import { toast } from "react-toastify";
import { Select } from "antd";
import Layout from "./../../components/Layout/Layout";
import OwnerMenu from "../../components/Layout/OwnerMenu";
import { saveLogs } from "../../components/utils/logs";
const { Option } = Select;

const Managers = () => {
  const [managersArray, setManagerArray] = useState([]);
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editManager, setEditManager] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsEdit(false);
  };

  const handleShow = () => setShow(true);

  const getManager = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/manager/${id}`);
      setEditManager(data);
      setLoading(false);
    } catch (error) {
      saveLogs(error.message,"Owner/manager","Owner") 
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    handleShow();
    setIsEdit(true);
    getManager(id);
  };

  const getManagers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/managers`);
      setManagerArray(data);
    } catch (err) {
      saveLogs(err.message,"Owner/manager","Owner") 
      console.log("Error", err);
    }
  };

  const delManager = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/manager/${id}`);
      getManagers();
    } catch (error) {
      saveLogs(error.message,"Owner/manager","Owner") 
      console.error("Error deleting manager:", error);
    }
  };

  useEffect(() => {
    getManagers();
  }, []);

  async function submit(e) {
    e.preventDefault();
  
    try {
      setLoading(true);
      formData.role="0";
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role:  formData.role,
        answer: formData.answer,
      });
      console.log(formData);
      console.log(response.data); // Log the response data
      const { data } = response;
  
      if (data && data.success) {
        getManagers();
        toast.success("Manager Added Successfully ....");
       
      } else {
        toast.error(data.message);
      }
  
      setLoading(false);
      handleClose();
    } catch (err) {
      saveLogs(err.message,"Owner/manager","Owner") 
      toast.error(err.response.data);
      setLoading(false);
    }
  }
  
  const editData = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/manager/${editManager?._id}`, formData);
      getManagers();
      handleClose();
    } catch (error) {
      saveLogs(error.message,"Owner/manager","Owner") 
      console.error("Error updating manager:", error);
    }
  };

  const toggleManagerActive = async (id, currentActiveStatus) => {
    try {
      console.log(id);
      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/manager/toggleActive/${id}`);
      toast.success("manager Active Status Updated Successfully");
      getManagers();
    } catch (error) {
      saveLogs(error.message,"Owner/manager","Owner") 
      toast.error("Error updating active status");
    }
  };

  const dashboardStyle = {
    backgroundColor: "#001f3f", // Dark blue color
    color: "white",
    minHeight: "100vh", // Set a minimum height to cover the entire viewport
  };

  return (
    <>
      <Layout title="Managers">
        <div className="container-fluid m-3 p-3 dashboard" style={dashboardStyle}>
          <div className="row">
            <div className="col-md-3">
              <OwnerMenu />
            </div>
            <div className="col-md-9">
              <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{isEdit ? "Edit" : "Add"} Manager</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="bg-primary flex justify-center items-center">
                    <div className="bg-white p-4 rounded w-[475px]">
                      <h1 className="text-primary py-4 text-center text-2xl">
                        <span className="text-orange-500 text-2xl">
                          {isEdit ? "Edit" : "Add New"} Manager
                        </span>
                      </h1>

                      {loading ? (
                        "Loading..."
                      ) : (
                        <Form layout="horizontal">
                          <Form.Item label="Name" name="name">
                            <Input
                              placeholder="Name"
                              value={formData.name}
                              defaultValue={isEdit ? editManager?.name : ""}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                          </Form.Item>
                          <Form.Item label="Email" name="email">
                            <Input
                              placeholder="Email"
                              value={formData.email}
                              defaultValue={isEdit ? editManager?.email : ""}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </Form.Item>
                          <Form.Item label="Password" name="password">
                            <Input.Password
                              placeholder="Password"
                              value={formData.password}
                              defaultValue={isEdit ? editManager?.password : ""}
                              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                          </Form.Item>
                          <Form.Item label="Answer" name="answer">
                            <Input
                              placeholder="Your Pet Name"
                              value={formData.answer}
                              defaultValue={isEdit ? editManager?.answer : ""}
                              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
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
                    disabled={!isEdit && !formData.name || !isEdit && !formData.email || !isEdit && !formData.password || !isEdit && !formData.answer || loading}
                  >
                    {loading ? "loading ..." : "Save"}
                  </Button>
                </Modal.Footer>
              </Modal>
              <div className="container">
                <div className="d-flex justify-content-between mt-3 ml-20">
                  <h2>Managers</h2>
                  <button className="btn btn-success" onClick={handleShow}>
                    +Add
                  </button>
                </div>
                <table className="table ml-20">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Manager ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Answer</th>
                      <th scope="col">Role</th>
                      <th scope="col">Active</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managersArray?.map((manager, index) => (
                      <tr key={manager?._id}>
                        <td>{index + 1}</td>
                        <td>{manager?._id}</td>
                        <td>{manager?.name}</td>
                        <td>{manager?.email}</td>
                        <td>{manager?.answer}</td>
                        <td>{manager?.role}</td>
                        <td>
                          {/* Switch for Active/Inactive */}
                          <Switch
                            checked={manager.active}
                            onChange={() => toggleManagerActive(manager._id, manager.active)}
                          />
                        </td>
                        <td>
                          {/* Update and Delete buttons */}
                          <button className="btn btn-secondary mx-2" onClick={() => handleEdit(manager._id)}>
                            Update
                          </button>
                          <button className="btn btn-danger" onClick={() => delManager(manager?._id)}>
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

export default Managers;
