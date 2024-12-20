import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../context/TokenContext";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { toast } from "react-toastify";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [hide, setHide] = useState(false);
  const { storeToken } = useTokenContext();
  const navigate = useNavigate();

  const togglebtn = () => {
    setHide(!hide);
  };
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      storeToken(result.token);
      if (response.status === 201) {
        setUser({
          username: "",
          email: "",
          password: "",
          phone: "",
        });
        toast.success("Login successful")
        navigate("/");
      }else{
        toast.error(result.msg)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center px-6 py-10">
      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl text-red-500 font-bold text-center mb-6">
          Login Page
        </h1>
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-10 lg:space-y-0 lg:space-x-10">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="react.svg"
              alt="Login illustration"
              className="h-[250px] lg:h-[300px] object-contain"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6 text-white">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium mb-1">
                  Enter your email
                </label>
                <input
                  className="border border-gray-600 bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="text-sm font-medium mb-1">
                  Enter your password
                </label>
                <div className="relative">
                  <input
                    className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-red-500"
                    type={!hide ? "password" : "text"}
                    placeholder="Enter your password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    onClick={togglebtn}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
                    type="button"
                  >
                    {hide ? <BiSolidShow /> : <BiSolidHide />}
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full lg:w-auto bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg px-6 py-3 transition"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login
