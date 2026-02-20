import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import DynamicUpdateForm from "../components/DynamicUpdateForm";
import DynamicCreateForm from "../components/DynamicCreateForm";

function OrderItems({ backendURL }) {


    const itemsConfig = {
        entityName: "OrderItems",
        fields: [
            { name: "productID", label: "Product ID", type: "number"},
            { name: "quantity", label: "Quantity", type: "number"}
        ]     
    };
    // Set up a state variable `orderitems` to store and display the backend response
    const [orderitems, setcustomers] = useState([]);
    const [updateID, setUpdateID] = useState("");
    

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/OrderItems');
            
            // Convert the response into JSON format
            const {orderitems} = await response.json();
    
            // Update the orderitems state with the response data
            setcustomers(orderitems);
            
            
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
            <h1>Order Items</h1>

            <table>
                <thead>
                    <tr>
                        {orderitems.length > 0 && Object.keys(orderitems[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {orderitems.map((item, index) => (
                        <TableRow key={index} rowObject={item} backendURL={backendURL} refreshData={getData}/>
                    ))}

                </tbody>
            </table>
            
            <DynamicCreateForm
                config={itemsConfig}
                backendURL={backendURL}
                refreshData={getData}
            />

            <h2>Update Order Items</h2>
            <div>
                <label>Order ID: </label>
                <select value={updateID} onChange={(e) => setUpdateID(e.target.value)}>
                    <option value="">Select Order</option>
                    {orderitems.map((item) => (
                        <option key={item["Order ID"]} value={item["Order ID"]}>
                            {item["Order ID"]}
                        </option>
                    ))}
                </select>
            </div> 
            <DynamicUpdateForm
                id={updateID}
                config={itemsConfig}
                backendURL={backendURL}
                refreshData={getData}
            />             
        </>
    );

} export default OrderItems;