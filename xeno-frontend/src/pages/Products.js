// src/pages/Products.js
import React, { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/ingest/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              <div className="product-title">{p.title}</div>
              <div className="product-price">₹{p.price}</div>
            </li>
          ))}
        </ul>
      )}

      {/* Inline CSS */}
      <style>{`
        .products-container {
          background: linear-gradient(135deg, #e8f5e9, #f1f8e9);
          min-height: 100vh;
          padding: 30px;
          font-family: "Segoe UI", sans-serif;
        }
        .products-container h2 {
          font-size: 24px;
          font-weight: bold;
          color: #1b5e20;
          margin-bottom: 20px;
          border-left: 6px solid #43a047;
          padding-left: 10px;
        }
        .products-container p {
          font-size: 16px;
          color: #555;
          background: #f9fbe7;
          border: 1px solid #dce775;
          padding: 12px;
          border-radius: 8px;
        }
        .products-container ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .products-container li {
          background: #ffffff;
          border: 1px solid #ddd;
          margin-bottom: 15px;
          padding: 16px 20px;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .products-container li:hover {
          transform: translateY(-3px);
          box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.12);
          border-left: 6px solid #2e7d32;
        }
        .product-title {
          font-weight: 600;
          color: #2e7d32;
        }
        .product-price {
          font-size: 16px;
          font-weight: bold;
          color: #d84315;
        }
      `}</style>
    </div>
  );
}

export default Products;
