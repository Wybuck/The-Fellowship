import DeleteEntityForm from './DeleteEntityForm';

const TableRow = ({ rowObject, backendURL, refreshData, entityName, primaryKey }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}

            {/* Pass entityName and primaryKey to DeleteEntityForm */}
            <DeleteEntityForm 
                rowObject={rowObject} 
                backendURL={backendURL} 
                refreshData={refreshData} 
                entityName={entityName} 
                primaryKey={primaryKey} 
            />
        </tr>
    );
};

export default TableRow;