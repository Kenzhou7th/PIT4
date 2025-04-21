import React, { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title,
      completed: false
    };

    const response = await fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    });

    const data = await response.json();
    onAdd(data); // Add to list in parent component
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add a task"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTask;
