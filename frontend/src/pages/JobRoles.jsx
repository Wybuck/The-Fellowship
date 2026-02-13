import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreateCustomerForm from '../components/CreateCustomerForm';
import UpdateCustomerForm from '../components/UpdateCustomerForm';
import DynamicCreateForm from "../components/DynamicCreateForm";

function Roles({ backendURL }) {


    const roleConfig = {
        entityName: "Orders",
        fields: [
            { name: "JobName", label: "Job Name", type: "text" },
            { name: "pay", label: "Salary", type: "number"}
        ]     
    };
    // Set up a state variable `roles` to store and display the backend response
    const [roles, setcustomers] = useState([]);

    

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/Roles');
            
            // Convert the response into JSON format
            const {roles} = await response.json();
    
            // Update the roles state with the response data
            setcustomers(roles);
            
            
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
            <h1>Job Roles</h1>

            <table>
                <thead>
                    <tr>
                        {roles.length > 0 && Object.keys(roles[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {roles.map((jobRole, index) => (
                        <TableRow key={index} rowObject={jobRole} backendURL={backendURL} refreshcustomers={getData}/>
                    ))}

                </tbody>
            </table>
            <DynamicCreateForm
                config={roleConfig}
                backendURL={backendURL}
                refreshData={getData}
            />
                         
        </>
    );

} export default Roles;