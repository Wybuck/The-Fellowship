const DeleteEntityForm = ({ rowObject, backendURL, refreshData, primaryKey, entityName }) => {

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            // Build URL using route params for composite keys
            let deleteURL = `${backendURL}/${entityName}`;

            if (Array.isArray(primaryKey)) {
                // join the values in the order of primaryKey array
                const keyValues = primaryKey.map(key => rowObject[key]).join("/");
                deleteURL += `/${keyValues}`;
            } else {
                deleteURL += `/${rowObject[primaryKey]}`;
            }

            const response = await fetch(deleteURL, { method: "DELETE" });

            if (!response.ok) {
                throw new Error(`Failed to delete: ${response.status}`);
            }

            refreshData();
        } catch (error) {
            console.log("Delete failed:", error);
        }
    };

    return (
        <td>
            <form onSubmit={handleDelete}>
                <button class='delete' type="submit">Delete</button>
            </form>
        </td>
    );
};

export default DeleteEntityForm;

