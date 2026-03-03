import { useState, useEffect } from 'react';  
import TableRow from '../components/TableRow';
import DynamicUpdateForm from "../components/DynamicUpdateForm";
import DynamicCreateForm from "../components/DynamicCreateForm";
import ResetForm from "../components/ResetForm"

function Orders({ backendURL }) {

    
    const [orders, setorders] = useState([]);
    const [updateID, setUpdateID] = useState("");
    const orderConfig = {
        entityName: "Orders",
        fields: [
            { name: "orderTotal", label: "Order Total", type: "float" },
            { name: "employeeID", label: "Employee ID", type: "number"},
            { name: "customerID", label: "Customer ID", type: "number"},
            { name: "orderDate", label: "Order Date", type: "date" }
        ]     
    };

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/Orders');
            
            // Convert the response into JSON format
            const {orders} = await response.json();
    
            // Update the orders state with the response data
            setorders(orders);
            
            
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
        <>
            <h1>Orders</h1>

            <table>
                <thead>
                    <tr>
                        {orders.length > 0 && Object.keys(orders[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <TableRow 
                            key={order["Order ID"]} 
                            rowObject={order} 
                            backendURL={backendURL} 
                            refreshData={getData} 
                            entityName="Orders" 
                            primaryKey={["Order ID"]}
                        />
                    ))}

                </tbody>
            </table>
            <DynamicCreateForm
                config={orderConfig}
                backendURL={backendURL}
                refreshData={getData}
            />

            <h2>Update Order</h2>
            <div>
                <label>Order ID: </label>
                <select value={updateID} onChange={(e) => setUpdateID(e.target.value)}>
                    <option value="">Select Order</option>
                    {orders.map((order) => (
                        <option key={order["Order ID"]} value={order["Order ID"]}>
                            {order["Order ID"]} - ({order["Employee Name"]})
                        </option>
                    ))}
                </select>
            </div> 
            <DynamicUpdateForm
                id={updateID}
                config={orderConfig}
                backendURL={backendURL}
                refreshData={getData}
                primaryKey={["orderID"]}
            />
            <br/>
            <br/>
            <ResetForm 
                backendURL={backendURL}
                refreshData={getData}
                entityName="Orders" 
            />
            
                           
        </>
    );

} export default Orders;