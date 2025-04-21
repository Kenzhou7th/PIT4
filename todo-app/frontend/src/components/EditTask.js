import React, { useState } from 'react';

const EditTask = ({ task, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(task.title);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      title,
    };

    const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    });

    const data = await response.json();
    onUpdate(data);
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditTask;
