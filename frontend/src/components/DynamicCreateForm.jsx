import { useState } from "react";

const DynamicForm = ({ config, backendURL, refreshData }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${backendURL}/${config.entityName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    refreshData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create {config.entityName}</h2>

      {config.fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}: </label>
          <input
            type={field.type}
            name={field.name}
            onChange={handleChange}
          />
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;