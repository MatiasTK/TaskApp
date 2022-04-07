import React, { useState } from "react";

export default function TaskCreator(props) {
  const [taskName, setTaskName] = useState();

  const toggleTaskInput = (e) => {
    document.getElementsByClassName("addTask")[0].classList.toggle("hidden");
    document.getElementsByClassName("taskInput")[0].classList.toggle("hidden");
  };

  const inputHandler = (e) => {
    setTaskName(e.target.value);
  };

  const checkHandler = () => {
    props.createTask(taskName);
  };

  return (
    <div>
      <div
        className="flex flex-row gap-2 items-center cursor-pointer hover:text-blue-500 addTask"
        onClick={toggleTaskInput}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-plus pointer-events-none"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#3b86f2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span className="pointer-events-none">Add a task</span>
      </div>

      <div className="flex flex-row gap-2 items-center cursor-pointer text-black hidden taskInput">
        <input
          placeholder="New task"
          onChange={inputHandler}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              toggleTaskInput();
              checkHandler();
            }
          }}
          onBlur={(e) => e.target.value=''}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-plus"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#3b86f2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => {
            toggleTaskInput();
            checkHandler();
          }}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </div>
    </div>
  );
}
