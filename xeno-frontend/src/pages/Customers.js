import { useEffect, useState } from "react";
import api from "../services/api";  // axios instance with baseURL + token
import Table from "../components/Table";

const Customers = () => {
  const columns = ["Name", "Email", "Shopify ID"];
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await api.get("/ingest/customers");
        console.log("Fetched customers:", res.data);

        const formatted = res.data.map((customer) => [
          customer.name,
          customer.email,
          customer.shopify_customer_id,
        ]);

        setData(formatted);
      } catch (err) {
        console.error(
          "Failed to fetch customers:",
          err.response?.data || err.message
        );
      }
    }

    fetchCustomers();
  }, []);

  return (
    <div className="customers-container container mt-4">
      <h1 className="h4 fw-bold mb-4">👥 Customers</h1>
      <div className="table-responsive customers-table">
        <Table columns={columns} data={data} />
      </div>

      {/* Embedded CSS */}
      <style>{`
        .customers-container {
          background: #fafafa;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0px 3px 6px rgba(0,0,0,0.08);
        }
        .customers-container h1 {
          color: #2c3e50;
        }
        .customers-table table {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .customers-table th {
          background: #42a5f5;
          color: white;
          text-align: left;
          padding: 12px 15px;
          font-size: 14px;
        }
        .customers-table td {
          padding: 12px 15px;
          border-bottom: 1px solid #eee;
          font-size: 14px;
          color: #333;
        }
        .customers-table tr:hover td {
          background: #f9f9f9;
        }
      `}</style>
    </div>
  );
};

export default Customers;
