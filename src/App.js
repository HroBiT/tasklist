import './App.css';
import React, { useState } from "react";
import { saveAs } from 'file-saver';

function App() {
  const [task, setTask] = useState(""); // bierzacy task 
  const [taskList, setTaskList] = useState([]); // lista taskow 

  const handletaskAdd = () => {
    setTaskList([...taskList, task]);
    setTask("");
  }

  const handledeltask = (index) => {
    setTaskList(taskList.filter((task, i) => i !== index));
  };

  const handleSaveTasks = () => {
    const blob = new Blob([taskList.join('\n')], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'taskList.txt');
  };

  const handleLoadTasks = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        const loadedTasks = contents.split('\n').filter(task => task.trim() !== "");
        setTaskList(loadedTasks);
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
      <ul className="w-full max-w-md">
        {taskList.map((task, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-800 p-2 mb-2 rounded text-white">
            <span>{task}</span>
            <button
              className="text-red-500 hover:text-red-700 focus:outline-none"
              onClick={() => handledeltask(index)}
            >
              Delete
            </button>
          </li>
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
          accept=".txt"
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