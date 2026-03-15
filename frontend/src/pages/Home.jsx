import { useState, useEffect } from 'react';  
import TableRow from '../components/TableRow';
import DynamicCreateForm from "../components/DynamicCreateForm";
import DynamicUpdateForm from "../components/DynamicUpdateForm";
import ResetForm from "../components/ResetForm"

function Roles({ backendURL }) {


    const roleConfig = {
        entityName: "JobRoles",
        fields: [
            { name: "jobName", label: "Job Name", type: "text" },
            { name: "pay", label: "Salary", type: "number"}
        ]     
    };
    
    const [jobroles, setRoles] = useState([]);

    

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/JobRoles');
            
            // Convert the response into JSON format
            const {jobroles} = await response.json();
            
            // Update the roles state with the response data
            setRoles(jobroles);
            console.log(jobroles);
            
        } catch (error) {
          // If the API call fails, print the error to the console
          console.log(error);
        }

    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

    const [updateID, setUpdateID] = useState("");

    return (
        <>
            <h1>Job Roles</h1>

            <table>
                <thead>
                    <tr>
                        {jobroles.length > 0 && Object.keys(jobroles[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {jobroles.map((jobRole) => (
                        <TableRow 
                            key={jobroles["Job ID"]} 
                            rowObject={jobRole} 
                            backendURL={backendURL} 
                            refreshData={getData} 
                            entityName="JobRoles" 
                            primaryKey={["Job ID"]}
                        />
                    ))}

                </tbody>
            </table>

            <DynamicCreateForm
                config={roleConfig}
                backendURL={backendURL}
                refreshData={getData}
            />

            <h2>Update Position</h2>
            <div>
                <label>Job ID: </label>
                <select value={updateID} onChange={(e) => setUpdateID(e.target.value)}>
                    <option value="">Select Position</option>
                    {jobroles.map((jobroles) => (
                        <option key={jobroles["Job ID"]} value={jobroles["Job ID"]}>
                            {jobroles["Job ID"]} - {jobroles["Job Name"]}
                        </option>
                    ))}
                </select>
            </div> 
            <DynamicUpdateForm
                id={updateID}
                config={roleConfig}
                backendURL={backendURL}
                refreshData={getData}
                primaryKey={["jobID"]}
            />

            <br/>
            <br/>
            <ResetForm 
                backendURL={backendURL}
                refreshData={getData}
                entityName="JobRoles" 
            />                 
        </>
    );

} export default Roles;