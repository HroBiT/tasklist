import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

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
    </div>
  );
}

export default App;