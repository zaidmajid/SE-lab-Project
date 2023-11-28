import Layout from "./../../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import { useNavigate } from 'react-router-dom';
import ManagerMenu from "./../../components/Layout/ManagerMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { saveLogs } from "../../components/utils/logs";

const { Option } = Select;

const DisplaySales = () => {
    const navigate = useNavigate();

  const dashboardStyle = {
    backgroundColor: "#001f3f",
    color: "white",
    minHeight: "100vh",
  };

  const [sales, setSales] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [sProduct, setProduct] = useState("");
  const [Salequantity, setSaleQuantity] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedSoldquantity, setUpdatedSoldquantity] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");

  const getAllSales = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-sale`);
      if (data?.success) {
        const salesWithCategoryDetails = await Promise.all(
          data.sales.map(async (sale) => {
            const categoryResponse = await axios.get(
              `${process.env.REACT_APP_API_URL}/api/single-category/${sale.product.category}`
            );
            const categoryDetails = categoryResponse.data.category;
            return { ...sale, categoryDetails };
          })
        );

        setSales(salesWithCategoryDetails);
      }
    } catch (error) {
      saveLogs(error.message,"Manager/sales","Manager") 
      console.log(error);
      toast.error("Something went wrong in getting sales");
    }
  };

  useEffect(() => {
    getAllSales();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(selectedProduct);
      console.log(selected._id);
      console.log(updatedSoldquantity);
      console.log(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
      
      const previousSoldQuantity = Salequantity;
  
      // Calculate the difference between the new and previous sale quantities
      const quantityDifference = updatedSoldquantity - Salequantity;
  
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/update-sale/${selected._id}`,
        {
          product: selectedProduct,
          Salequantity: updatedSoldquantity,
          date: `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
        }
      );
  
      if (data?.success) {
        toast.success(`Sale is updated`);
  
        // Update product quantity based on the difference
        let updatedquantity;
        console.log(quantityDifference);
  
        if (quantityDifference > 0) {
          // If the new sale quantity is greater, subtract the difference from the selected product quantity
          console.log(sProduct);
          updatedquantity = sProduct-quantityDifference;
          console.log(updatedquantity);
          // Update the product quantity using the appropriate API
          const updateQuantityResponse = await axios.put(
            `${process.env.REACT_APP_API_URL}/api/update-productquantity/${selectedProduct}`,
            { quantity: updatedquantity },  // Subtract the difference
          );
  
          if (updateQuantityResponse.data?.success) {
            toast.success('Product quantity updated successfully');
          } else {
            toast.error(updateQuantityResponse.data?.message);
          }
        } else if (quantityDifference < 0) {
          // If the new sale quantity is less, add the absolute difference to the selected product quantity
        const qt= -quantityDifference;
        console.log(sProduct);
        console.log(qt);
         updatedquantity = sProduct+ qt;
  
          // Update the product quantity using the appropriate API
          const updateQuantityResponse = await axios.put(
            `${process.env.REACT_APP_API_URL}/api/update-productquantity/${selectedProduct}`,
            { quantity:updatedquantity},  // Add the absolute difference
          );
  
          if (updateQuantityResponse.data?.success) {
            toast.success('Product quantity updated successfully');
          } else {
            toast.error(updateQuantityResponse.data?.message);
          }
        }
  
        setSelected(null);
        setUpdatedSoldquantity("");
        setYear("");
        setDay("");
        setMonth("");
        setVisible(false);
        getAllSales();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      saveLogs(error.message,"Manager/sales","Manager") 
      console.log(error);
    }
  };
  

  // Function to navigate to the create-sales page
  const navigateToAddSales = () => {
    navigate("/dashboard/Manager/create-sales");
  };

  return (
    <Layout title="Manager-Category">
      <div className="container-fluid m-3 p-3 dashboard" style={dashboardStyle}>
        <div className="row">
          <div className="col-md-3">
            <ManagerMenu />
          </div>
          <div className="col-md-9 ">
          <h1>Sales</h1>
          <div className="d-flex mb-3">
            <button
                className="btn btn-success"
                onClick={navigateToAddSales}
                style={{ width: '100px', paddingLeft: '20px', marginRight: '6px' }}
            >
                ADD
            </button>
            </div>


            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Count</th>
                    <th scope="col">BrandName</th>
                    <th scope="col">Category</th>
                    <th scope="col">Date</th>
                    <th scope="col">Sold Quantity</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sales?.map((s, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{s?.product.Brandname}</td>
                        <td>{s?.categoryDetails?.name}</td>
                        <td>{new Date(s?.date).toISOString().split("T")[0]}</td>
                        <td>{s?.Salequantity}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setSelectedProduct(s?.product?._id);
                              setProduct(s?.product?.quantity);
                              setSaleQuantity(s?.Salequantity);
                              setDay(
                                new Date(s?.date).getDate().toString()
                              );
                              setMonth(
                                (new Date(s?.date).getMonth() + 1).toString()
                              );
                              setYear(
                                new Date(s?.date).getFullYear().toString()
                              );
                              setSelected(s);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
              <h2>Sales Edit</h2> {/* Added heading */}
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select a product"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    value={selectedProduct}
                    readOnly
                    onChange={(value) => setSelectedProduct(value)}
                  >
                    {sales?.map((sale) => (
                      <Option
                        key={sale.product._id}
                        value={sale.product._id}
                      >
                        {sale.product.Brandname}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select day"
                    size="large"
                    className="form-select mb-3"
                    onChange={(value) => setDay(value)}
                    value={day}
                  >
                    {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
                      <Option key={day} value={day}>
                        {day}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select month"
                    size="large"
                    className="form-select mb-3"
                    onChange={(value) => setMonth(value)}
                    value={month}
                  >
                    {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                      <Option key={month} value={month}>
                        {month}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select year"
                    size="large"
                    className="form-select mb-3"
                    onChange={(value) => setYear(value)}
                    value={year}
                  >
                    {Array.from({ length: 1 }, (_, index) => new Date().getFullYear() - index).map(
                      (year) => (
                        <Option key={year} value={year}>
                          {year}
                        </Option>
                      )
                    )}
                  </Select>
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={updatedSoldquantity}
                    placeholder="Enter Sale Quantity"
                    className="form-control"
                    onChange={(e) => setUpdatedSoldquantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary mehroonish-red-button" type="submit">
                    UPDATE SALE
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DisplaySales;
