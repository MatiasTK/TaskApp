import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import googleLogo from "../images/google.png";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    setError(""); /* Para que se borre si no da error. */

    try {
      await login(user.email, user.password);
      navigate("/");
      /* Alerta de que se registro correctamente */
    } catch (error) {
      setError(error.code);
      /* Crear casos para cada tipo de error con alertas! */
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.code);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert message={error} />}

      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSumbit}
      >
        <button
          className="text-blue-600 border border-blue-600 rounded  py-2 px-4 w-full flex flex-row items-center font-bold hover:bg-blue-100 justify-center mb-2"
          onClick={handleGoogleLogin}
        >
          <img src={googleLogo} alt="google-logo" className="max-h-5"></img>
          <span className="ml-5">Login with Google</span>
        </button>

        <div className="flex flex-row items-center mt-2 mb-1">
          <div className="border-b-2 border-slate-300 w-full"></div>
          <span className="uppercase text-slate-500 text-sm">or</span>
          <div className="border-b-2 border-slate-300 w-full"></div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-
            700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            id="email"
            placeholder="Your Email Address"
            onChange={handleChange}
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
            className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-
            700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            onChange={handleChange}
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm w-full">
          Login
        </button>
        <div className="flex flex-row justify-center mt-2">
          <a className="text-sm text-sky-700 hover:text-sky-500" href="/RecoverPassword">
            Forgot Your Password?
          </a>
        </div>

        <div className="mt-3 border-b-2 border-slate-400 w-full" />
        <div className="mt-3 flex flex-row justify-center">
          <span className="text-gray-700 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-sky-700 hover:text-sky-500">
              Register
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}
