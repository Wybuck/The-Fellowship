const UpdateCustomerForm = ({ customers, backendURL, refreshcustomers }) => {

    return (
        <>
        <h2>Update a Customer</h2>
        <form className='cuForm'>
            <label htmlFor="update_customer_id">Customer to Update: </label>
            <select
                name="update_customer_id"
                id="update_customer_id"
            >
                <option value="">Select a Customer</option>
                {customers.map((customer) => (
                    <option key={customer.customerID} value={customer.customerID}>
                        {customer.customerID} - {customer.fname} {customer.lname}
                    </option>
                ))}
            </select>

            

            <label htmlFor="update_customer_fname">First Name: </label>
            <input
                type="number"
                name="update_customer_fname"
                id="update_customer_fname"
            />

            <label htmlFor="update_customer_lname">Last Name: </label>
            <input
                type="number"
                name="update_customer_lname"
                id="update_customer_lname"
            />

            <label htmlFor="update_customer_homeTown">Home Town: </label>
            <input
                type="number"
                name="update_customer_homeTown"
                id="update_customer_homeTown"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateCustomerForm;