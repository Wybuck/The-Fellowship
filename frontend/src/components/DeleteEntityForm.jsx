const DeleteEntityForm = ({ rowObject, backendURL, refreshData }) => {
    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await fetch(
                `${backendURL}/Customers/${rowObject.customerID}`,
                { method: "DELETE" }
            );

            refreshData();

        } catch (error) {
            console.log("Delete failed:", error);
        }
    };


    return (
        <td>
            <form onSubmit={handleDelete}>
                <button type='submit'>
                    Delete
                </button>
            </form>
        </td>

    );
};

export default DeleteEntityForm;