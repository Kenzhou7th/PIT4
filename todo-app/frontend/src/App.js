import React, { useEffect, useState } from 'react';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import TaskList from './components/TaskList';
import './App.css'; // You can style dark mode here

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

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
    setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
    setEditingTask(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark-mode app-container' : 'light-mode app-container'}>
      <h1>To-Do List</h1>
      <button onClick={toggleDarkMode}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>

      {editingTask ? (
        <EditTask
          task={editingTask}
          onUpdate={updateTask}
          onCancel={() => setEditingTask(null)}
        />
      ) : (
        <AddTask onAdd={addTask} />
      )}

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <TaskList
        tasks={tasks}
        filter={filter}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={setEditingTask}
      />
    </div>
  );
};

export default App;
