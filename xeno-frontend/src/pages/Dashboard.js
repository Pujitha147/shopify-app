import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "../components/Card";
import Button from "../components/Button";
import {
  Users,
  Package,
  ShoppingCart,
  RefreshCcw,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { AuthContext } from "../AuthContext"; // ✅ import context
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");

  const { logout } = useContext(AuthContext); // ✅ get logout from context
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const axiosAuth = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: { Authorization: `Bearer ${token}` },
  });

  const fetchAllData = async () => {
    try {
      const [customers, products, orders] = await Promise.all([
        axiosAuth.get("/ingest/customers"),
        axiosAuth.get("/ingest/products"),
        axiosAuth.get("/ingest/orders"),
      ]);

      setCustomerCount(customers.data.length);
      setProductCount(products.data.length);
      setOrderCount(orders.data.length);

      const totalRevenue = orders.data.reduce(
        (sum, order) => sum + parseFloat(order.total_price || 0),
        0
      );
      setRevenue(totalRevenue.toFixed(2));

      const now = new Date();
      setLastUpdated(now.toLocaleTimeString());
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };
  


  const handleIngest = async (type) => {
    try {
      const res = await axiosAuth.get(`/ingest/${type}`);
      alert(`✅ ${type} ingested: ${res.data.count || res.data.length}`);
      fetchAllData();
    } catch (err) {
      alert(`❌ Failed to ingest ${type}`);
      console.error(`Error ingesting ${type}:`, err);
    }
  };

  const handleLogout = () => {
  logout(); // clear context
  localStorage.removeItem("token"); // clear localStorage
  navigate("/login", { replace: true }); // ✅ force redirect to /login
};
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>📊 Shopify Analytics</h1>
        <div className="header-actions">
          <span className="last-updated">Last updated: {lastUpdated}</span>
          <Button className="btn btn-refresh" onClick={fetchAllData}>
            <RefreshCcw size={16} /> Refresh
          </Button>
          <Button
            className="btn btn-shopify"
            onClick={() =>
              window.open(
                "https://admin.shopify.com/store/pujitha-dev-store",
                "_blank"
              )
            }
          >
            <ExternalLink size={16} /> Shopify Admin
          </Button>
          <Button className="btn btn-logout" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </Button>
        </div>
      </div>

      {/* Overview Section */}
      <h2 className="section-title">Overview</h2>
      <div className="card-grid">
        <Card className="card customers">
          <p className="label">Total Customers</p>
          <p className="value">{customerCount}</p>
        </Card>
        <Card className="card products">
          <p className="label">Products</p>
          <p className="value">{productCount}</p>
        </Card>
        <Card className="card orders">
          <p className="label">Orders</p>
          <p className="value">{orderCount}</p>
        </Card>
        <Card className="card revenue">
          <p className="label">Revenue</p>
          <p className="value">₹{revenue}</p>
        </Card>
      </div>

      {/* Data Ingestion */}
      <h2 className="section-title">Data Ingestion</h2>
      <div className="ingest-grid">
        <Button
          className="btn-ingest"
          onClick={() => handleIngest("customers")}
        >
          <Users size={20} /> Ingest Customers
        </Button>
        <Button className="btn-ingest" onClick={() => handleIngest("products")}>
          <Package size={20} /> Ingest Products
        </Button>
        <Button className="btn-ingest" onClick={() => handleIngest("orders")}>
          <ShoppingCart size={20} /> Ingest Orders
        </Button>
      </div>

      {/* Embedded CSS */}
      <style>{`
        .dashboard-container {
          background: linear-gradient(135deg, #fdfbfb, #ebedee);
          min-height: 100vh;
          padding: 30px;
          font-family: "Segoe UI", sans-serif;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .dashboard-header h1 {
          font-size: 28px;
          font-weight: bold;
          color: #2c3e50;
        }
        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .last-updated {
          font-size: 14px;
          color: #555;
        }
        .btn-refresh {
          background: #e3f2fd;
          border: none;
          color: #1565c0;
          font-weight: 500;
        }
        .btn-refresh:hover {
          background: #bbdefb;
        }
        .btn-shopify {
          background: #2e7d32;
          border: none;
          color: #fff;
          font-weight: 500;
        }
        .btn-shopify:hover {
          background: #1b5e20;
        }
        .btn-logout {
          background: #ef5350;
          border: none;
          color: #fff;
          font-weight: 500;
        }
        .btn-logout:hover {
          background: #c62828;
        }
        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #34495e;
          margin-bottom: 15px;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .card {
          padding: 20px;
          border-radius: 12px;
          color: #fff;
          box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
        }
        .card .label {
          font-size: 14px;
          opacity: 0.9;
        }
        .card .value {
          font-size: 26px;
          font-weight: bold;
        }
        .card.customers {
          background: #42a5f5;
        }
        .card.products {
          background: #66bb6a;
        }
        .card.orders {
          background: #ffa726;
        }
        .card.revenue {
          background: #ef5350;
        }
        .ingest-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 15px;
        }
        .btn-ingest {
          background: #ffffff;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 12px;
          font-weight: 500;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          transition: all 0.2s ease;
        }
        .btn-ingest:hover {
          background: #f5f5f5;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
