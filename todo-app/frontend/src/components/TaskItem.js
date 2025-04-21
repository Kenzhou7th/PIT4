import React, { useState, useRef, useEffect } from 'react';

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleSaveClick = () => {
    onEdit({ ...task, title: editedTitle }); // Call onEdit to update the task
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedTitle(task.title); // Reset to original title
    setIsEditing(false);
  };

  return (
    <div key={task.id} style={{
      marginBottom: '0.5rem',
      position: 'relative', // Make this a positioning context
      paddingRight: '70px'   // Add padding to prevent overlap
    }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={handleInputChange}
            onBlur={handleSaveClick} // Save when focus is lost
            ref={inputRef}
            style={{ width: '400px' }} // Adjust the width as needed
          />
          <div style={{
            position: 'absolute',
            right: '0',
            top: '50%',
            transform: 'translateY(-50%)'
          }}>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <div style={{
            position: 'absolute',
            right: '0',
            top: '50%',
            transform: 'translateY(-50%)'
          }}>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
