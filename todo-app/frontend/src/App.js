import React, { useEffect, useState } from 'react';
import EditTask from './components/EditTask';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [newTask, setNewTask] = useState(''); // State for the new task input

  // Fetch tasks from FastAPI
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("http://localhost:8000/todos");
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  // Handlers
  const addTask = (task) => setTasks([...tasks, task]);

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const toggleTask = (updatedTask) => {
    // Update the task's completed status
    const updatedTasks = tasks.map(t => {
      if (t.id === updatedTask.id) {
        return { ...t, completed: !t.completed }; // Toggle completed status
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    setEditingTask(null);
  };

  // Handler for the new task input
  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  // Handler to add the new task
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      // Create a new task object (you might need to adjust this based on your API)
      const newTaskObject = {
        id: Date.now(), // Generate a unique ID
        title: newTask,
        completed: false,
      };

      addTask(newTaskObject); // Add the task to the list
      setNewTask(''); // Clear the input field
    }
  };

  return (
    <div className='app-container'>
      <h1 style={{ textAlign: 'center' }}>To-Do List</h1>

      {editingTask ? (
        <EditTask
          task={editingTask}
          onUpdate={updateTask}
          onCancel={() => setEditingTask(null)}
        />
      ) : null}

      {/* New task input and add button - MOVED TO ABOVE THE FILTER BUTTONS */}
      <div style={{
        marginTop: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Add new task"
          value={newTask}
          onChange={handleNewTaskChange}
          style={{ marginBottom: '0.5rem' }} // Add margin below the input
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div style={{
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'center' // Center the buttons horizontally
      }}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <TaskList
        tasks={tasks}
        filter={filter}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={updateTask}
      />
    </div>
  );
};

export default App;
