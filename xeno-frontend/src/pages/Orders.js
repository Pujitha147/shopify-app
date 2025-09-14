// src/pages/Orders.js
import React, { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await api.get("/ingest/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((o) => (
            <li key={o.id}>
              Order #{o.id} – Total: ₹{o.total_price}
            </li>
          ))}
        </ul>
      )}

      {/* Inline CSS */}
      <style>{`
        .orders-container {
          background: linear-gradient(135deg, #f9f7ff, #e3f2fd);
          min-height: 100vh;
          padding: 30px;
          font-family: "Segoe UI", sans-serif;
        }
        .orders-container h2 {
          font-size: 24px;
          font-weight: bold;
          color: #4a148c;
          margin-bottom: 20px;
          border-left: 6px solid #7b1fa2;
          padding-left: 10px;
        }
        .orders-container p {
          font-size: 16px;
          color: #555;
          background: #fff3e0;
          border: 1px solid #ffe0b2;
          padding: 12px;
          border-radius: 8px;
        }
        .orders-container ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .orders-container li {
          background: #ffffff;
          border: 1px solid #ddd;
          margin-bottom: 12px;
          padding: 14px 18px;
          border-radius: 10px;
          font-size: 16px;
          color: #333;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .orders-container li:hover {
          transform: translateY(-3px);
          box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.12);
          border-left: 6px solid #4caf50;
        }
      `}</style>
    </div>
  );
}

export default Orders;
