// src/App.js
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes (with sidebar + main content) */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="d-flex">
                  {/* Sidebar */}
                  <aside
                    className="bg-dark text-white vh-100 p-4"
                    style={{ width: "16rem" }}
                  >
                    <h1 className="h4 fw-bold mb-4">Shopify Analytics</h1>
                    <nav className="nav flex-column">
                      <Link to="/" className="nav-link text-white">
                        Dashboard
                      </Link>
                      <Link to="/products" className="nav-link text-white">
                        Products
                      </Link>
                      <Link to="/orders" className="nav-link text-white">
                        Orders
                      </Link>
                      <Link to="/customers" className="nav-link text-white">
                        Customers
                      </Link>
                    </nav>
                  </aside>

                  {/* Main Content */}
                  <main
                    className="flex-grow-1 bg-light p-4"
                    style={{ minHeight: "100vh" }}
                  >
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/customers" element={<Customers />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/orders" element={<Orders />} />
                    </Routes>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
