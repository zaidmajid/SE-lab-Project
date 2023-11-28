import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import ManagerMenu from '../../components/Layout/ManagerMenu';
import Layout from '../../components/Layout/Layout';
import { saveLogs } from "../../components/utils/logs";

const { Option } = Select;

const CreateSale = () => {
  const dashboardStyle = {
    backgroundColor: '#001f3f', // Dark blue color
    color: 'white',
    minHeight: '100vh', // Set a minimum height to cover the entire viewport
  };

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [Salequantity, setSaleQuantity] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-product`);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      saveLogs(error.message,"Manager/sales","Manager") 
      console.log(error);
      toast.error('Something went wrong in getting products');
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // generate options for days in a month
  const getDaysInMonth = (month, year) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, index) => index + 1);
  };

  // generate options for months
  const getMonths = () => {
    const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
    return Array.from({ length: currentMonth }, (_, index) => index + 1);
  };

  // generate options for years (only current year)
  const getYears = () => {
    const currentYear = new Date().getFullYear();
    return [currentYear];
  };

  // handle sales creation
  const handleCreateSale = async (e) => {
    e.preventDefault();
    try {
      const saleData = {
        product: selectedProduct,
        Salequantity,
        date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
      };
  
      console.log(saleData);
  
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/create-sale`, saleData);
  
      if (data?.success) {
        toast.success('Sale Created Successfully');
  
        // Update product quantity
        const selectedProductIndex = products.findIndex((product) => product._id === selectedProduct);
        const updatedProducts = [...products];
        const updatedProduct = { ...updatedProducts[selectedProductIndex] };
        updatedProduct.quantity -= parseInt(Salequantity, 10);
        updatedProducts[selectedProductIndex] = updatedProduct;
        setProducts(updatedProducts);
  
        // Update quantity on the server
        const updatedquantity = updatedProduct.quantity;
        const updateQuantityResponse = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/update-productquantity/${selectedProduct}`,
          { quantity: updatedquantity },
        );
  
        if (updateQuantityResponse.data?.success) {
          toast.success('Product quantity updated successfully');
        } else {
          toast.error(updateQuantityResponse.data?.message);
        }
  
        navigate('/dashboard/Manager/sales');
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      saveLogs(error.message,"Manager/sales","Manager") 
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  


  return (
    <Layout title="Manager-Sales">
      <div className="container-fluid m-3 p-3 dashboard" style={dashboardStyle}>
        <div className="row">
          <div className="col-md-3">
            <ManagerMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Sale</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a product"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setSelectedProduct(value);
                }}
              >
                {products?.map((product) => (
                  <Option key={product._id} value={product._id}>
                    {product.Brandname}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select day"
                  size="large"
                  className="form-select mb-3"
                  onChange={(value) => {
                    setDay(value);
                  }}
                >
                  {getDaysInMonth(month, year).map((day) => (
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
                  onChange={(value) => {
                    setMonth(value);
                  }}
                >
                  {getMonths().map((month) => (
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
                  onChange={(value) => {
                    setYear(value);
                  }}
                >
                  {getYears().map((year) => (
                    <Option key={year} value={year}>
                      {year}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={Salequantity}
                  placeholder="Enter Sale Quantity"
                  className="form-control"
                  onChange={(e) => setSaleQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary mehroonish-red-button"
                  onClick={handleCreateSale}
                >
                  CREATE SALE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateSale;
