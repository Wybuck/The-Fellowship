import './App.css';
import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import Employees from "./pages/Employees";
import JobRoles from "./pages/JobRoles";
import OrderItems from "./pages/OrderItems";
import Orders from "./pages/Orders";
import Products from "./pages/Products";

// Components
import Navigation from './components/Navigation';

// Define the backend port and URL for API requests
const backendPort = 33018;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Customers" element={<Customers backendURL={backendURL} />} />
                <Route path="/Employees" element={<Employees backendURL={backendURL} />} />
                <Route path="/JobRoles" element={<JobRoles backendURL={backendURL} />} />
                <Route path="/Products" element={<Products backendURL={backendURL} />} />
                <Route path="/Orders" element={<Orders backendURL={backendURL} />} />
                <Route path="/OrderItems" element={<OrderItems backendURL={backendURL} />} />
                
            </Routes>
        </>
    );

} export default App;