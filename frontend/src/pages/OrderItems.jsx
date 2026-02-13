import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreateCustomerForm from '../components/CreateCustomerForm';
import UpdateCustomerForm from '../components/UpdateCustomerForm';
import DynamicCreateForm from "../components/DynamicCreateForm";

function OrderItems({ backendURL }) {


    const itemsConfig = {
        entityName: "OrderItems",
        fields: [
            { name: "productID", label: "Product ID", type: "number"},
            { name: "quantity", label: "Quantity", type: "number"}
        ]     
    };
    // Set up a state variable `items` to store and display the backend response
    const [items, setcustomers] = useState([]);

    console.log(backendURL);

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/Items');
            
            // Convert the response into JSON format
            const {items, homeworlds} = await response.json();
    
            // Update the items state with the response data
            setcustomers(items);
            setHomeworlds(homeworlds);
            
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
                        {items.length > 0 && Object.keys(items[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item, index) => (
                        <TableRow key={index} rowObject={item} backendURL={backendURL} refreshcustomers={getData}/>
                    ))}

                </tbody>
            </table>
            
            <DynamicCreateForm
                config={itemsConfig}
                backendURL={backendURL}
                refreshData={getData}
            />             
        </>
    );

} export default OrderItems;