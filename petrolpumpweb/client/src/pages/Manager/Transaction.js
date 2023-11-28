import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { saveLogs } from "../../components/utils/logs";
import ManagerMenu from "../../components/Layout/ManagerMenu";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import jsPDF from "jspdf";

const Transaction = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [selectedReport, setSelectedReport] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [profitData, setProfitData] = useState(0);
  const [employeeArray, setEmployeeArray] = useState([]);

  const dashboardStyle = {
    backgroundColor: "#001f3f", // Dark blue color
    color: "white",
    minHeight: "100vh",
  };

  const labelStyle = {
    color: "white",
    fontWeight: "bold",
  };

  const comboBoxStyle = {
    backgroundColor: "#222",
    color: "white",
  };

  const generateButtonStyle = {
    backgroundColor: "#28a745",
    color: "white",
    marginTop: "10px",
  };

  const getAllProducts2 = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/get-product`);
      setProducts(data.products);
    } catch (error) {
      saveLogs(error.message,"Manager/transactions","Manager") 
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

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
      saveLogs(error.message,"Manager/transactions","Manager") 
      console.log(error);
      toast.error("Something went wrong in getting sales");
    }
  };

  const getEmployees = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/employees`);
      setEmployeeArray(data);
    } catch (err) {
      saveLogs(err.message,"Manager/transactions","Manager") 
      console.log("Error", err);
    }
  };

  const calculateTotalSalary = () => {
    let totalSalary = 0;
    employeeArray.forEach((emp) => {
      totalSalary += parseInt(emp.salary);
      console.log(emp.salary);
    });
    console.log(totalSalary);
    return totalSalary;
  };

  const generateSalaryPDFReport = (totalSalary) => {
    const pdf = new jsPDF();
    pdf.text("Employee Salary Report", 20, 10);
    pdf.text(
      `This is the total amount of expense spent on employees' salary: Rs ${totalSalary}`,
      20,
      20
    );
    pdf.save("employee_salary_report.pdf");
  };

  const handleReportSelection = () => {
    if (selectedReport === "profitReport" && selectedMonth) {
      const profitForMonth = calculateProfitForMonth(selectedMonth);
      setProfitData(profitForMonth);
      generatePDFReport(profitForMonth, selectedMonth);
    } else if (selectedReport === "salaryReport") {
      const totalSalary = calculateTotalSalary();
      generateSalaryPDFReport(totalSalary);
    } else {
      toast.error("Please select a valid report and month");
    }
  };

  const calculateProfitForMonth = (selectedMonth) => {
    let totalProfit = 0;
    console.log(sales);

    sales.forEach((sale) => {
      const saleMonth = new Date(sale.date).getUTCMonth() + 1;
      console.log(saleMonth);
      console.log(selectedMonth);
      if(saleMonth==selectedMonth)
      {
        const product = products.find((p) => p._id === sale.product._id  );
        const profitForSale =
    
       ( sale.Salequantity * product.Saleprice) - (sale.Salequantity * product.price);
      totalProfit += profitForSale;
      console.log(totalProfit);
      }
     
    });

    return totalProfit;
  };

  const generatePDFReport = (profitData, selectedMonth) => {
    const pdf = new jsPDF();
    pdf.text("Profit Report", 20, 10);
    pdf.text(
      `Total Profit in the terms of sold products for month ${selectedMonth}: Rs ${profitData}`,
      20,
      20
    );
    pdf.save("profit_report.pdf");
  };

  useEffect(() => {
    getAllSales();
    getAllProducts2();
    getEmployees();
  }, []);

  return (
    <Layout title="Manager-Transactions">
      <div className="container-fluid m-3 p-3 dashboard" style={dashboardStyle}>
        <div className="row">
          <div className="col-md-3">
            <ManagerMenu />
          </div>
          <div className="col-md-9">
            <h1>Transaction</h1>
            <div className="col-md-12">
              <label style={labelStyle}>Select Report Type: </label>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                style={comboBoxStyle}
              >
                <option value="">Select Report</option>
                <option value="profitReport">Profit Report</option>
                <option value="salaryReport">Employees Salary Report</option>
              </select>
            </div>
            {selectedReport === "profitReport" && (
              <div className="col-md-12">
                <label style={labelStyle}>Select Month: </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  style={comboBoxStyle}
                >
                  <option value="">Select Month</option>
                  {[...Array(new Date().getMonth() + 1).keys()].map((month) => (
                    <option key={month + 1} value={month + 1}>
                      {month + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="col-md-9">
              <Button
                onClick={handleReportSelection}
                style={generateButtonStyle}
              >
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Transaction;
