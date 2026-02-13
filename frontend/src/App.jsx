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

// Define the backend port and URL for API requests
const backendPort = 21301;  // Use the port you assigned to the backend server, this would normally go in .env file
const backendURL = `http://classwork.engr.oregonstate.edu:21301/`;

function App() {

    // Set up a state variable `message` to store and display the backend response
    const [message, setMessage] = useState([]);

    // Get the data from the database
    const getData = async function () {
        if (message.length > 0) return; // Skip if data is already fetched
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL);
            
            // Convert the response into JSON format
            const rows = await response.json();
            
            // Update the message state with the response data
            setMessage(JSON.stringify(rows));
            
        } catch (error) {
          // If the API call fails, print the error to the console
          console.log(error);
        }
    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

  return (
      <BrowserRouter>
          <h1>The FellowShip</h1>
          <p>Blacksmith and Bar</p>
          <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/products">Products</Link> |{" "}
            <Link to="/customers">Customers</Link> |{" "}
            <Link to="/employees">Employees</Link> |{" "}
            <Link to="/orders">Orders</Link> |{" "}
            <Link to="/orderitems">OrderItems</Link> |{" "}
            <Link to="/JobRoles">JobRoles</Link> 
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/products" element={<Products />}/>
              <Route path="/customers" element={<Customers />}/>
              <Route path="/employees" element={<Employees />}/>
              <Route path="/orders" element={<Orders />}/>
              <Route path="/orderitems" element={<OrderItems />}/>
              <Route path="/JobRoles" element={<JobRoles />}/>
            </Routes>
          </main>
          <footer>
            <p>© 2026 The Fellowship. All rights reserved.</p>
          </footer>
    </BrowserRouter>
  );

} export default App;