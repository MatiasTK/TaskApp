import { useState } from "react";

export default function CompletedTasks(props) {
  const [showCompleted, setShowCompleted] = useState(true);

  const countCompleted = () => {
    let completed = 0;
    props.tasks.map((t) => (t.done ? completed++ : t));

    return completed;
  };

  const renderIcons = () => {
    if (!showCompleted) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-arrow-down mr-5 cursor-pointer"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#9e9e9e"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="18" y1="13" x2="12" y2="19" />
          <line x1="6" y1="13" x2="12" y2="19" />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-arrow-up mr-5 cursor-pointer"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#9e9e9e"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="18" y1="11" x2="12" y2="5" />
          <line x1="6" y1="11" x2="12" y2="5" />
        </svg>
      );
    }
  };

  return (
    <div>
      <div className="mt-5 border-t border-slate-300 pt-5 flex flex-row justify-between">
        <div>
          <span>Completed</span>
          <span className="ml-2">({countCompleted()})</span>
        </div>
        {renderIcons()}
      </div>
      <div className="completed line-through">
        {showCompleted && props.taskTableRows(true)}
      </div>
    </div>
  );
}
