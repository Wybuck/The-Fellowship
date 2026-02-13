import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';

import UpdateCustomerForm from "../components/UpdateCustomerForm";
import DynamicCreateForm from "../components/DynamicCreateForm";

function Customers({ backendURL }) {

    // Set up a state variable `customers` to store and display the backend response
    const [customers, setcustomers] = useState([]);

    console.log(backendURL);

    const customerCreateConfig = {
        entityName: "Customers",
        fields: [
            { name: "firstName", label: "First Name", type: "text" },
            { name: "lastName", label: "Last Name", type: "text" },
            { name: "homeTown", label: "Home Town", type: "text" }
        ]
    };
    //Customer update
    const customerUpdateConfig = {
        entityName: "Customers",
        idField: "customerID",
        fields: [
            { name: "firstName", label: "First Name", type: "text" },
            { name: "lastName", label: "Last Name", type: "text" },
            { name: "homeTown", label: "Home Town", type: "text" }
        ]
    };


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
                    {customers.map((customer, index) => (
                        <TableRow key={index} rowObject={customer} backendURL={backendURL} refreshcustomers={getData}/>
                    ))}

                </tbody>
            </table>

            <DynamicCreateForm
                config={customerCreateConfig}
                backendURL={backendURL}
                refreshData={getData}
            />

            

            
            <UpdateCustomerForm customers={customers} backendURL={backendURL} refreshcustomers={getData} />               
        </>
    );

} export default Customers;