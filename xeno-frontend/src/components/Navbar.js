import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-dark text-white p-4" style={{ width: "250px", minHeight: "100vh" }}>
      <h2 className="h5 fw-bold mb-4">Shopify Dashboard</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/customers" className="nav-link text-white">Customers</Link>
        </li>
        <li className="nav-item">
          <Link to="/orders" className="nav-link text-white">Orders</Link>
        </li>
        <li className="nav-item">
          <Link to="/products" className="nav-link text-white">Products</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link text-white">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
