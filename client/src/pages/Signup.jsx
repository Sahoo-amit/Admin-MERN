import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../context/TokenContext";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { toast } from "react-toastify";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [hide, setHide] = useState(false);
  const { storeToken } = useTokenContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      storeToken(result.token);
      if (response.status === 201) {
        toast.success(result.msg);
        setUser({
          username: "",
          email: "",
          password: "",
          phone: "",
        });
        navigate("/");
      }else{
        toast.error(result.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center px-6 py-10">
      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg p-8 mt-10">
        <h1 className="text-4xl text-red-500 font-bold text-center mb-6">
          Register Yourself
        </h1>
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center space-y-10 lg:space-y-0 lg:space-x-10">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="react.svg"
              alt="Registration Illustration"
              className="h-[250px] lg:h-[300px] object-contain"
            />
          </div>
          <form onSubmit={handleSubmit} className="w-full lg:w-1/2 space-y-6">
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="text-sm font-medium text-white mb-1"
              >
                Enter your name
              </label>
              <input
                className="border border-gray-600 bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                type="text"
                placeholder="Enter your name"
                name="username"
                value={user.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-white mb-1"
              >
                Enter your email
              </label>
              <input
                className="border border-gray-600 bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium text-white mb-1"
              >
                Enter your password
              </label>
              <div className="relative">
                <input
                  className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-red-500"
                  type={!hide ? "password" : "text"}
                  placeholder="Enter password"
                  name="password"
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
            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-white mb-1"
              >
                Enter your phone number
              </label>
              <input
                className="border border-gray-600 bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                type="number"
                placeholder="Enter your phone number"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full lg:w-auto bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg px-6 py-3 transition"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
