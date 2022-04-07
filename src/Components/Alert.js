import React from "react";

export default function Alert({ message }) {
  return (
    <div className="text-red-700 bg-red-200 py-2 rounded mb-2 px-2 text-center border border-red-400">
      <span>ERROR: {message}</span>
    </div>
  );
}
