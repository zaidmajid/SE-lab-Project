import React from "react";
import { NavLink } from "react-router-dom";

const ManagerMenu = () => {
  const menuStyle = {
    backgroundColor: "lightgray",
    color: "black",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  };

  const menuItemStyle = {
    color: "black",
    backgroundColor: "lightgray",
    textDecoration: "none",
    padding: "8px",
    borderRadius: "3px",
    fontWeight: "bold",
    margin: "5px 0",
    transition: "background-color 0.3s ease",
  };

  const activeStyle = {
    backgroundColor: "darkgray",
  };

  return (
    <div>
      <div className="text-center dashboard-menu" style={menuStyle}>
        <div className="list-group">
          <h4 style={{ color: "black", marginBottom: "15px", fontWeight: "bold" }}>Manager's Dashboard</h4>
          <NavLink
            to="/dashboard/Manager/profile"
            className="list-group-item list-group-item-action"
            style={menuItemStyle}
            activeStyle={activeStyle}
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/Manager/employees"
            className="list-group-item list-group-item-action"
            style={menuItemStyle}
            activeStyle={activeStyle}
          >
            Employees
          </NavLink>
          <NavLink
            to="/dashboard/Manager/inventory"
            className="list-group-item list-group-item-action"
            style={menuItemStyle}
            activeStyle={activeStyle}
          >
            Inventory
          </NavLink>
          <NavLink
            to="/dashboard/Manager/salary"
            className="list-group-item list-group-item-action"
            style={menuItemStyle}
            activeStyle={activeStyle}
          >
            Salaries
          </NavLink>
          <NavLink
            to="/dashboard/Manager/sale"
            className="list-group-item list-group-item-action"
            style={menuItemStyle}
            activeStyle={activeStyle}
          >
            Sales
          </NavLink>
          <NavLink
            to="/dashboard/Manager/transactions"
            className="list-group-item list-group-item-action"
            style={menuItemStyle}
            activeStyle={activeStyle}
          >
            Transactions
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ManagerMenu;
