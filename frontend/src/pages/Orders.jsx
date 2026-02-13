import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreateCustomerForm from '../components/CreateCustomerForm';
import UpdateCustomerForm from '../components/UpdateCustomerForm';
import DynamicCreateForm from "../components/DynamicCreateForm";

function Orders({ backendURL }) {

    // Set up a state variable `orders` to store and display the backend response
    const [orders, setorders] = useState([]);

    const orderConfig = {
        entityName: "Orders",
        fields: [
            { name: "orderTotal", label: "Order Total", type: "float" },
            { name: "customerID", label: "Customer", type: "number"},
            { name: "employeeID", label: "Employee", type: "number"},
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
                    {orders.map((order, index) => (
                        <TableRow key={index} rowObject={order} backendURL={backendURL} refreshcustomers={getData}/>
                    ))}

                </tbody>
            </table>
            <DynamicCreateForm
                config={orderConfig}
                backendURL={backendURL}
                refreshData={getData}
            />
                           
        </>
    );

} export default Orders;