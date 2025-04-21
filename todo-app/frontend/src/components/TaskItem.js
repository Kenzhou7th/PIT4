import React from 'react';

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  const handleToggle = async () => {
    const updatedTask = { ...task, completed: !task.completed };

    const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask)
    });

    const data = await response.json();
    onToggle(data);
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:8000/todos/${task.id}`, {
      method: "DELETE"
    });

    onDelete(task.id);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
      />
      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.title}
      </span>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
