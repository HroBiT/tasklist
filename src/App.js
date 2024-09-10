import './App.css';
import React, { useState } from "react";
import { saveAs } from 'file-saver';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [task, setTask] = useState(""); // bieżący task 
  const [taskList, setTaskList] = useState([]); // lista tasków 
  const [selectedDate, setSelectedDate] = useState(new Date()); // wybrana data
  const [tasksByDate, setTasksByDate] = useState({}); // zadania przypisane do dat

  const handletaskAdd = () => {
    const newTaskList = [...taskList, task];
    setTaskList(newTaskList);
    setTask("");
    const dateKey = selectedDate.toDateString();
    const newTasksByDate = { ...tasksByDate, [dateKey]: [...(tasksByDate[dateKey] || []), task] };
    setTasksByDate(newTasksByDate);
  }

  const handledeltask = (dateKey, index) => {
    const newTasksByDate = { ...tasksByDate };
    newTasksByDate[dateKey] = newTasksByDate[dateKey].filter((task, i) => i !== index);
    setTasksByDate(newTasksByDate);
  };

  const handleSaveTasks = () => {
    const tasksData = JSON.stringify(tasksByDate, null, 2);
    const blob = new Blob([tasksData], { type: 'application/json;charset=utf-8' });
    saveAs(blob, 'tasksByDate.json');
  };

  const handleLoadTasks = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        const loadedTasksByDate = JSON.parse(contents);
        setTasksByDate(loadedTasksByDate);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">Task List</h1>
      <div className="flex mb-4">
        <input
          className="p-2 rounded-l bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setTask(e.target.value)}
          value={task}
          name='task'
          type='text'
          placeholder='Enter a task'
        />
        <button
          className="p-2 rounded-r bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handletaskAdd}
        >
          Add Task
        </button>
      </div>
      <div className="flex mb-4">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="bg-gray-800 text-white rounded"
        />
      </div>
      <ul className="w-full max-w-md">
        {Object.keys(tasksByDate).map(dateKey => (
          <div key={dateKey}>
            <h2 className="text-xl font-bold mb-2">{dateKey}</h2>
            {tasksByDate[dateKey].map((task, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-800 p-2 mb-2 rounded text-white">
                <span>{task}</span>
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => handledeltask(dateKey, index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </div>
        ))}
      </ul>
      <div className="flex mt-4 space-x-4">
        <button
          className="p-2 bg-green-600 hover:bg-green-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={handleSaveTasks}
        >
          Save Tasks
        </button>
        <input
          type="file"
          accept=".json"
          className="hidden"
          id="load-tasks"
          onChange={handleLoadTasks}
        />
        <label
          htmlFor="load-tasks"
          className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Load Tasks
        </label>
      </div>
    </div>
  );
}

export default App;
