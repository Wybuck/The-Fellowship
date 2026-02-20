import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';


import DynamicCreateForm from "../components/DynamicCreateForm";
import DynamicUpdateForm from "../components/DynamicUpdateForm";


function Customers({ backendURL }) {

    // Set up a state variable `customers` to store and display the backend response
    const [customers, setcustomers] = useState([]);
    const [updateID, setUpdateID] = useState("");
    

    const customerCreateConfig = {
        entityName: "Customers",
        fields: [
            { name: "firstName", label: "First Name", type: "text" },
            { name: "lastName", label: "Last Name", type: "text" },
            { name: "homeTown", label: "Home Town", type: "text" }
        ]
    };
    //Customer update
    


    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/Customers');
            
            // Convert the response into JSON format
            const {customers} = await response.json();
            
    
            // Update the customers state with the response data
            setcustomers(customers);
            
            
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
            <h1>Customers</h1>

            <table>
                <thead>
                    <tr>
                        {customers.length > 0 && Object.keys(customers[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((customer) => (
                        <TableRow key={customer["Customer ID"]} rowObject={customer} backendURL={backendURL} refreshData={getData}/>
                    ))}

                </tbody>
            </table>

            <DynamicCreateForm
                config={customerCreateConfig}
                backendURL={backendURL}
                refreshData={getData}
            />
            
            <h2>Update Customer</h2>
            <div>
                <label>Customer ID: </label>
                <select value={updateID} onChange={(e) => setUpdateID(e.target.value)}>
                    <option value="">Select Customer</option>
                    {customers.map((customer) => (
                        <option key={customer["Customer ID"]} value={customer["Customer ID"]}>
                            {customer["Customer ID"]} - {customer["First Name"]} {customer["Last Name"]}
                        </option>
                    ))}
                </select>
            </div> 
            <DynamicUpdateForm
                id={updateID}
                config={customerCreateConfig}
                backendURL={backendURL}
                refreshData={getData}
            />
            

                    
        </>
    );

} export default Customers;