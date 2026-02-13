import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreateCustomerForm from '../components/CreateCustomerForm';
import UpdateCustomerForm from '../components/UpdateCustomerForm';
import DynamicCreateForm from "../components/DynamicCreateForm";


function Employees({ backendURL }) {
    //Setting up class to hand to form
    const employeeConfig = {
        entityName: "Employees",
        idField: "employeeID",
        fields: [
            { name: "firstName", label: "First Name", type: "text" },
            { name: "lastName", label: "Last Name", type: "text" },
            { name: "startDate", label: "Start Date", type: "date" },
            { name: 'jobRole', label: 'Job Role', type:'number'}
        ]
    };
    // Set up a state variable `employees` to store and display the backend response
    const [employees, setemployees] = useState([]);


    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/Employees');
            
            // Convert the response into JSON format
            const {employees} = await response.json();
            
            
            // Update the employees state with the response data
            setemployees(employees);
            
            
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
            <h1>Employees</h1>

            <table>
                <thead>
                    <tr>
                        {employees.length > 0 && Object.keys(employees[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((employee, index) => (
                        <TableRow key={index} rowObject={employee} backendURL={backendURL} refreshemployees={getData}/>
                    ))}

                </tbody>
            </table>
            <DynamicCreateForm
                config={employeeConfig}
                backendURL={backendURL}
                refreshData={getData}
            />
                        
        </>
    );

} export default Employees;