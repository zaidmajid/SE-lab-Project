/*
  Description: This file defines the CreateCategory component, which serves as the manager interface for handling category-related operations. It includes functionality for creating, updating, and deleting categories, as well as toggling the active status of a category. The component integrates with the ManagerMenu, Layout, CategoryForm, and utilizes Axios for API requests. Additionally, it incorporates the Ant Design Modal for editing category details.

  Dependencies:
  - React: JavaScript library for building user interfaces.
  - useState, useEffect: React hooks for managing component state and lifecycle.
  - axios: Library for making HTTP requests.
  - react-hot-toast: Toast notifications for providing user feedback.

  Components:
  - ManagerMenu: Sidebar navigation for the manager dashboard.
  - Layout: Higher-order component providing the overall structure of the manager interface.
  - CategoryForm: Form component for creating and updating category information.
  - Modal (Ant Design): Component for displaying a modal when editing category details.
*/

import React, { useState, useEffect } from "react";
import ManagerMenu from './../../components/Layout/ManagerMenu';
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import { saveLogs } from "../../components/utils/logs";

const CreateCategory = () => {
  // Styling for the dashboard component
  const dashboardStyle = {
    backgroundColor: "#001f3f", // Dark blue color
    color: "white",
    minHeight: "100vh", // Set a minimum height to cover the entire viewport
  };

  // State variables
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to create a new category
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/create-category`, {
        name,
      });

      // Display success or error message based on the API response
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // Log error and display a generic error message
      console.log(error);
      saveLogs(error.message,"Manager/create-category","Manager") 
      toast.error("something went wrong in input form");
    }
  };

  // Get all categories from the server
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-category`);

      // Update state with the fetched categories if the request is successful
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      // Log error and display an error message
      saveLogs(error.message,"Manager/create-category","Manager") 
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  // Fetch categories when the component mounts
  useEffect(() => {
    getAllCategory();
  }, []);

  // Toggle category active status
  const toggleCategoryActive = async (id, currentActiveStatus) => {
    try {
      // Send a PUT request to toggle the active status of a category
      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/category/toggleActive/${id}`);
      toast.success("Category Active Status Updated Successfully");
      getAllCategory();
    } catch (error) {
      // Log error and display an error message
      saveLogs(error.message,"Manager/create-category","Manager") 
      toast.error("Error updating active status");
    }
  };

  // Update category information
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update the name of a category
      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/update-category/${selected._id}`,
        { name: updatedName }
      );

      // Display success or error message based on the API response
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // Log error
      saveLogs(error.message,"Manager/create-category","Manager") 
      console.log(error);
    }
  };

  // Delete a category
  const handleDelete = async (categoryId) => {
    try {
      // Send a DELETE request to delete a category
      const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/delete-category/${categoryId}`);

      // Display success or error message based on the API response
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // Log error and display an error message
      saveLogs(error.message,"Manager/create-category","Manager") 
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Manager-Category">
      <div className="container-fluid m-3 p-3 dashboard" style={dashboardStyle}>
        <div className="row">
          <div className="col-md-3">
            {/* Sidebar navigation for the manager dashboard */}
            <ManagerMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              {/* Form for creating and updating category information */}
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              {/* Table displaying category information */}
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        {/* Button to edit category details */}
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        {/* Button to delete a category */}
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                        {/* Button to toggle the active status of a category */}
                        <button
                          className={`btn ${c.active ? "btn-success" : "btn-danger"} ms-2`}
                          onClick={() => toggleCategoryActive(c._id, c.active)}
                        >
                          {c.active ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Modal for editing category details */}
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
