import { useState, useEffect } from "react";

const DynamicUpdateForm = ({
  config,
  data,
  backendURL,
  refreshData
}) => {
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({});

  // When user selects an item, auto-fill form
  useEffect(() => {
    if (!selectedId) return;

    const selectedItem = data.find(
      (item) => item[config.idField] == selectedId
    );

    if (selectedItem) {
      setFormData(selectedItem);
    }
  }, [selectedId, data, config.idField]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${backendURL}/${config.entityName}/${selectedId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    refreshData();
    setSelectedId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update {config.entityName}</h2>

      {/* Dropdown */}
      <label>Select Record: </label>
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        <option value="">Select one</option>
        {data.map((item) => (
          <option
            key={item[config.idField]}
            value={item[config.idField]}
          >
            {config.displayField(item)}
          </option>
        ))}
      </select>

      {/* Dynamic Fields */}
      {selectedId &&
        config.fields.map((field) => (
          <div key={field.name}>
            <label>{field.label}: </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          </div>
        ))}

      {selectedId && <button type="submit">Update</button>}
    </form>
  );
};

export default DynamicUpdateForm;