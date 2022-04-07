import React, { useEffect, useState } from "react";
import TaskCreator from "./TaskCreator";
import "./CheckButton.css";
import CompletedTasks from "./CompletedTasks";
import TasksSettings from "./TasksSettings";
import { useAuth } from "../context/authContext";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskListName, setTaskListName] = useState("My tasks");

  const { saveFirestore, getFirestore } = useAuth();

  const setTaskDone = (e) => {
    setTasks(
      tasks.map((task) =>
        task.name === e.target.name ? { ...task, done: !task.done } : task
      )
    );
  };

  const createTask = (taskName) => {
    if (!tasks.find((t) => t.name === taskName) && taskName.trim() !== "") {
      setTasks([...tasks, { name: taskName, done: false }]);
    }
  };

  const deleteTask = (taskName) => {
    console.log(taskName);
    setTasks(
      tasks.filter(t => t.name !== taskName),
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFirestore("tasks");

      if (data !== undefined) {
        setTasks(data);
      }
    };

    fetchData();
  }, [getFirestore]);

  useEffect(() => {
    const saveData = async () => {
      if (tasks.length !== 0) {
        await saveFirestore({ tasks: tasks });
      }
    };
    saveData();
  }, [saveFirestore, tasks]);

  const taskTableRows = (doneValue) => {
    return tasks
      .filter((task) => task.done === doneValue)
      .map((task) => (
        <div className="flex flex-row items-center mt-5 justify-between mr-5" key={task.name}>
          <div>
            <input
              type="checkbox"
              id={task.name}
              name={task.name}
              value=""
              onClick={(e) => setTaskDone(e)}
            />
            <label htmlFor={task.name}>
              <span className="pl-2"></span>
            </label>
            <span>{task.name}</span>
          </div>
          <div onClick={() => deleteTask(task.name)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-trash cursor-pointer pointer-events-none"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#808080"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </div>
        </div>
      ));
  };

  const deleteCompletedTasks = () => {
    const newTasks = [...tasks].filter((task) => task.done === false);

    setTasks(newTasks);
  };

  return (
    <div className="tasks">
      <div className="h-fit rounded-lg border mt-5 bg-white text-black mx-5 md:border-none md:rounded-none md:mx-0 md:mt-0">
        <div className="grid grid-cols-1 gap-2 ml-5 p-5 text-gray-500">
          <div className="mb-5 border-b border-slate-300 pb-5 flex justify-between items-center">
            <span>{taskListName}</span>
            <TasksSettings
              setTaskListName={setTaskListName}
              deleteCompletedTasks={deleteCompletedTasks}
              taskListName={taskListName}
            />
          </div>
          <TaskCreator createTask={(e) => createTask(e)} />
          <div>{taskTableRows(false)}</div>
          <CompletedTasks tasks={tasks} taskTableRows={taskTableRows} />
        </div>
      </div>
    </div>
  );
}
