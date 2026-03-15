const ResetForm = ({ backendURL, refreshData, entityName }) => {

    const handleResetDatabase = async (e) => {
        e.preventDefault();

        if (!window.confirm("Reset the ENTIRE database? This cannot be undone.")) {
            return;
        }

        try {
            const response = await fetch(`${backendURL}/Reset`, {
                method: "POST"
            });
            window.location.href = `/${entityName}`;

            if (!response.ok) {
                throw new Error(`Database reset failed: ${response.status}`);
            }

            refreshData();
        } catch (error) {
            console.log("Database reset failed:", error);
        }
    };

    return (
        <form onSubmit={handleResetDatabase}>
            <button type="submit">
                Reset Database
            </button>
        </form>
    );
};

export default ResetForm;