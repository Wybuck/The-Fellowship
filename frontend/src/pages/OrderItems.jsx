import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';
import DynamicUpdateForm from "../components/DynamicUpdateForm";
import DynamicCreateForm from "../components/DynamicCreateForm";

function OrderItems({ backendURL }) {
    const itemsConfig = {
        entityName: "OrderItems",
        fields: [
            { name: "orderID", label: "Order ID", type: "number"},
            { name: "productID", label: "Product ID", type: "number"},
            { name: "quantity", label: "Quantity", type: "number"}
        ]     
    };

    const [orderitems, setOrderItems] = useState([]);
    const [updateKeys, setUpdateKeys] = useState({ orderID: "", productID: "" });

    const getData = async function () {
        try {
            const response = await fetch(`${backendURL}/OrderItems`);
            const { orderitems } = await response.json();
            setOrderItems(orderitems);
        } catch (error) {
            console.log(error);
        }
    };

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
                    {orderitems.map((item) => (
                        <TableRow 
                            key={`${item["Order ID"]}-${item["Product ID"]}`} 
                            rowObject={item} 
                            backendURL={backendURL} 
                            refreshData={getData} 
                            entityName="OrderItems" 
                            primaryKey={["Order ID", "Product ID"]}
                        />
                    ))}
                </tbody>
            </table>
            <p> You Cannot update the Order ID or product ID, only the Quantity</p>
            
            <DynamicCreateForm
                config={itemsConfig}
                backendURL={backendURL}
                refreshData={getData}
            />

            <h2>Update Order Item</h2>
            <div>
                <label>Order Item: </label>
                <select
                    value={`${updateKeys.orderID}-${updateKeys.productID}`}
                    onChange={(e) => {
                        const [orderID, productID] = e.target.value.split("-");
                        setUpdateKeys({ orderID, productID });
                    }}
                >
                    <option value="">Select Order Item</option>
                    {orderitems.map((item) => (
                        <option
                            key={`${item["Order ID"]}-${item["Product ID"]}`}
                            value={`${item["Order ID"]}-${item["Product ID"]}`}
                        >
                            {item["Order ID"]} - {item["Product ID"]}
                        </option>
                    ))}
                </select>
            </div> 

            
                <DynamicUpdateForm
                    id={updateKeys} 
                    config={itemsConfig}
                    backendURL={backendURL}
                    refreshData={getData}
                    primaryKey={["orderID", "productID"]} 
                />
                        
        </>
    );
}

export default OrderItems;