import React from "react";
import { NavLink } from "react-router-dom";

const OwnerMenu = () => {
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

  return (
    <div>
      <div className="text-center dashboard-menu" style={menuStyle}>
        <div className="list-group">
          <h4 style={{ color: "black" }}>Manager's Dashboard</h4>
          <NavLink
            to="/dashboard/Owner/profile"
            className="list-group-item list-group-item-action"
            style={menuItemStyle}
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/Owner/manager"
            className="list-group-item list-group-item-action"
            style={menuItemStyle}
          >
            Manager
          </NavLink>
          <NavLink
            to="/dashboard/Owner/inventoryreport"
            className="list-group-item list-group-item-action"
            style={menuItemStyle}
          >
            Inventory
          </NavLink>
       
          <NavLink
            to="/dashboard/Owner/transactions"
            className="list-group-item list-group-item-action"
            style={menuItemStyle}
          >
            Transactions
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default OwnerMenu;
