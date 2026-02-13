import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreateCustomerForm from '../components/CreateCustomerForm';
import UpdateCustomerForm from '../components/UpdateCustomerForm';
import DynamicCreateForm from "../components/DynamicCreateForm";

function Products({ backendURL }) {
    //
    const productConfig = {
        entityName: "Products",
        fields: [
            { name: "productName", label: "Product Name", type: "text" },
            { name: "productPrice", label: "Price", type: "number" },
            { name: "sale", label: "Sale", type: "number"}
        ]     
    };

    // Set up a state variable `products` to store and display the backend response
    const [products, setcustomers] = useState([]);

    

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/Products');
            
            // Convert the response into JSON format
            const {products, homeworlds} = await response.json();
    
            // Update the products state with the response data
            setcustomers(products);
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
                    {products.map((product, index) => (
                        <TableRow key={index} rowObject={product} backendURL={backendURL} refreshcustomers={getData}/>
                    ))}

                </tbody>
            </table>
            <DynamicCreateForm
                config={productConfig}
                backendURL={backendURL}
                refreshData={getData}
            />
                         
        </>
    );

} export default Products;