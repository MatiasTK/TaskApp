import "./Switch.css";
import { useState } from "react";

export default function Settings(props) {
  const [newUser, setnewUser] = useState("");

  const handleUserInput = (user) => {
    setnewUser(user.target.value);
  };

  const changeUserName = () => {
    props.setUserName(newUser);
  };

  const toggleShowSettings = () => {
    props.setShowSettings(!props.showSettings);
  }

  if (props.showSettings) {
    return (
      <div className="absolute inset-0 backdrop-blur-sm">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl border rounded max-h-fit w-fit">
          <div className="bg-white border rounded"></div>
          <h2 className="text-center mt-5 uppercase font-sans text-xl">
            Settings
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x absolute right-5 top-6"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#3b86f2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={toggleShowSettings}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </h2>
          <div className="flex flex-col my-10 mx-5 gap-5">
            <div className="border-b-2 border-slate-300 pb-5 ">
              <input
                type="text"
                name=""
                id=""
                className="border border-black mr-5 text-center"
                placeholder="Change App Name"
                onChange={handleUserInput}
              />
              <button
                className="border border-blue-500 rounded bg-blue-500 text-white text-sm px-2 py-2"
                onClick={changeUserName}
              >
                Change
              </button>
            </div>
            <div className="flex flex-row justify-between">
              <span>Dark mode</span>
              <label className="switch">
                <input
                  type="checkbox"
                  defaultChecked={false}
                  onChange={(e) => {
                    if (e.target.checked) {
                      console.log("Cambiando a modo oscuro");
                    } else {
                      console.log("Cambiando a modo claro");
                    }
                  }}
                />
                <s className="slider round" />
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
