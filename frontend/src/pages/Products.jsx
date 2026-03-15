import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import DynamicUpdateForm from "../components/DynamicUpdateForm";
import DynamicCreateForm from "../components/DynamicCreateForm";
import ResetForm from "../components/ResetForm"

function Products({ backendURL }) {
    //
    const productConfig = {
        entityName: "Products",
        fields: [
            { name: "productName", label: "Product Name", type: "text" },
            { name: "productPrice", label: "Price", type: "number" },
            { name: "sale", label: "Sale", type: "number"},
            { name: "categoryName", label: "Category", type: "text"}
        ]     
    };

    // Set up a state variable `products` to store and display the backend response
    const [products, setcustomers] = useState([]);
    const [updateID, setUpdateID] = useState("");
    

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/Products');
            
            // Convert the response into JSON format
            const {products, homeworlds} = await response.json();
    
            // Update the products state with the response data
            setcustomers(products);
            
            
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
            <h1>Products</h1>

            <table>
                <thead>
                    <tr>
                        {products.length > 0 && Object.keys(products[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <TableRow 
                            key={product["Product ID"]} 
                            rowObject={product} 
                            backendURL={backendURL} 
                            refreshData={getData} 
                            entityName="Products" 
                            primaryKey={["Product ID"]}
                        />
                    ))}

                </tbody>
            </table>
            <DynamicCreateForm
                config={productConfig}
                backendURL={backendURL}
                refreshData={getData}
            />

            <h2>Update Product</h2>
            <div>
                <label>Product ID: </label>
                <select value={updateID} onChange={(e) => setUpdateID(e.target.value)}>
                    <option value="">Select Product</option>
                    {products.map((product) => (
                        <option key={product["Product ID"]} value={product["Product ID"]}>
                            {product["Product ID"]} - {product["Product Name"]}
                        </option>
                    ))}
                </select>
            </div> 
            <DynamicUpdateForm
                id={updateID}
                config={productConfig}
                backendURL={backendURL}
                refreshData={getData}
                primaryKey={["productID"]}
            />   
            <br/>
            <br/>
            <ResetForm 
                backendURL={backendURL}
                refreshData={getData}
                entityName="Products" 
            />      
        </>
    );

} export default Products;