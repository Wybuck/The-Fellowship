import DeleteEntityForm from './DeleteEntityForm';

const TableRow = ({ rowObject, backendURL, refreshData }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <DeleteEntityForm rowObject={rowObject} backendURL={backendURL} refreshData={refreshData} />
        </tr>
    );
};

export default TableRow;