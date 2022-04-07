/* eslint-disable react/jsx-no-duplicate-props */
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

export default function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setError(""); /* Para que se borre si no da error. */

    try {
      await signup(user.email, user.password);
      navigate("/");
      /* Alerta de que se registro correctamente */
    } catch (error) {
      setError(error.code);
      /* Crear casos para cada tipo de error con alertas! */
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSumbit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
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

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            onChange={handleChange}
            className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-
            700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm w-full">
          Register
        </button>
      </form>
    </div>
  );
}
