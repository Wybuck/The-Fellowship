import { useState, useEffect } from "react";

const DynamicUpdateForm = ({
  id,
  config,
  backendURL,
  refreshData,
  primaryKey
}) => {
  const [formData, setFormData] = useState({});

  // Build URL for single OR composite key
  const buildURL = () => {
    if (!id) return "";

    // Composite key (id must be object)
    if (primaryKey && primaryKey.length > 1) {
      if (typeof id !== "object") {
        console.error("Composite key requires id to be an object");
        return "";
      }

      const keyPath = primaryKey.map((key) => id[key]).join("/");
      return `${backendURL}/${config.entityName}/${keyPath}`;
    }

    // Single key
    return `${backendURL}/${config.entityName}/${id}`;
  };

  // Fetch existing record to prefill form
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(buildURL());
        const data = await response.json();

        const mappedData = {};
        config.fields.forEach((field) => {
          mappedData[field.name] = data[field.name] ?? "";
        });

        setFormData(mappedData);
      } catch (error) {
        console.error("Failed to fetch record:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(buildURL(), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      refreshData();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (!id) return null;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update {config.entityName}</h2>

      {config.fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}: </label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <button type="submit">Update</button>
    </form>
  );
};

export default DynamicUpdateForm;

//Citation for AI use of tools
//Date: 2/18/26
// A brief description of prompts: I asked for an updated version of the DynamicCreateForm that would instead update a row and could potentially use a composite key to properly update.
// This was a long chain of prompts, as i was trying to understand why it was making the changes it made and it led to a deeper understanding of JavaScript objects.
//AI Source URL: https://chatgpt.com/