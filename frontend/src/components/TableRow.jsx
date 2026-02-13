import DeleteCustomerForm from './DeleteCustomerForm';

const TableRow = ({ rowObject, backendURL, refreshcustomers }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <DeleteCustomerForm rowObject={rowObject} backendURL={backendURL} refreshcustomers={refreshcustomers} />
        </tr>
    );
};

export default TableRow;