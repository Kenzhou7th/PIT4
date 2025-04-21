import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, filter, onDelete, onToggle, onEdit }) => {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div> {/* Changed from <ul> or <ol> to <div> */}
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
