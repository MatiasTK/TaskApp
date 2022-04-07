import React from "react";

export default function LoadingPage() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-blue-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-rotate-clockwise animate-spin"
        width="100"
        height="100"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#ffffff"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
      </svg>
    </div>
  );
}
