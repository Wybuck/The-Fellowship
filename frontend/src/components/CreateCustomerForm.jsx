const CreateCustomerForm = ({ homeworlds, backendURL, refreshcustomers }) => {

    return (
        <>
        <h2>Create a Customer</h2>

        <form className='cuForm'>
            <label htmlFor="create_customer_fname">First Name: </label>
            <input
                type="text"
                name="create_customer_fname"
                id="create_customer_fname"
            />

            <label htmlFor="create_customer_lname">Last Name: </label>
            <input
                type="text"
                name="create_customer_lname"
                id="create_customer_lname"
            />

            <label htmlFor="create_customer_homeTown">Home Town: </label>
            <input
                type="text"
                name="create_customer_homeTown"
                id="create_customer_homeTown"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateCustomerForm;