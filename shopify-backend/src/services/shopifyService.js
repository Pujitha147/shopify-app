const axios = require("axios");
require("dotenv").config();

const shopifyAPI = axios.create({
  baseURL: `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2025-01`,
  headers: {
    "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
});

async function fetchCustomers() {
  try {
    const res = await shopifyAPI.get("/customers.json");

    // Log the response to verify the customers data
    console.log("Fetched customers from Shopify:", res.data.customers);

    // If the data is not present or is empty, log it
    if (!res.data.customers || res.data.customers.length === 0) {
      console.warn("No customers returned from Shopify.");
    }

    return res.data.customers;
  } catch (error) {
    console.error("Error fetching customers from Shopify:", error.response?.data || error.message);
    throw error; // Rethrow the error for handling in the route
  }
}



async function fetchProducts() {
  const res = await shopifyAPI.get("/products.json");
  return res.data.products;
}
async function fetchOrders() {
  try {
    const res = await shopifyAPI.get("/orders.json");

    // Log the orders data and the response headers to check rate limits
    console.log("Fetched orders from Shopify:", res.data.orders);
    console.log("Shopify API response headers:", res.headers);
    console.log("Shopify API call limit:", res.headers['x-shopify-shop-api-call-limit']);

    // Check if no orders are returned
    if (!res.data.orders || res.data.orders.length === 0) {
      console.warn("No orders returned from Shopify.");
    }

    return res.data.orders;
  } catch (error) {
    console.error("Error fetching orders from Shopify:", error.response?.data || error.message);
    throw error; // This will stop the execution and pass the error to the handler in the route
  }
}





module.exports = { fetchCustomers, fetchProducts, fetchOrders };
