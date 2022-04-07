/* eslint-disable react/jsx-no-duplicate-props */
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

export default function Register() {
  const [user, setUser] = useState({
    email: "",
  });

  const { resetPassword } = useAuth();

  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = (e) => {
    setUser({ email: e.target.value });
  };

  const handleResetPassword = async () => {
    if (!user.email) {
      return setError("Please enter your email");
    }

    try {
        await resetPassword(user.email);
        navigate("/");
    } catch (error) {
        setError(error.code);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}

      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onClick={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email Address"
            onChange={handleChange}
            className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-
            700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm w-full"
          onClick={handleResetPassword}
        >
          Recover Password
        </button>
      </form>
    </div>
  );
}
