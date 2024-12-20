import React, { useState } from "react";
import { useTokenContext } from "../context/TokenContext";
import { toast } from "react-toastify";

const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    const result = await response.json();
    console.log(result)
    toast.success(result.message);
    setContact((prevMsg)=>({
      ...prevMsg,
      message: "",
    }));
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };
  const [userdata, setUserdata] = useState(true);
  const { user } = useTokenContext();

  if (userdata && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserdata(false);
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center px-6 py-10">
      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl text-red-500 font-bold text-center mb-6">
          Contact Page
        </h1>
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-10 lg:space-y-0 lg:space-x-10">
          <form onSubmit={handleSubmit} className="space-y-6 w-full lg:w-1/2">
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
                name="username"
                id="username"
                placeholder="Enter Name"
                value={contact.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-white mb-1"
              >
                Enter your Email
              </label>
              <input
                className="border border-gray-600 bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                value={contact.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="text-sm font-medium text-white mb-1"
              >
                Enter your message
              </label>
              <textarea
                className="border border-gray-600 bg-gray-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                name="message"
                id="message"
                rows="4"
                placeholder="Enter message"
                value={contact.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full lg:w-auto bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg px-6 py-3 transition"
            >
              Send
            </button>
          </form>
          <div className="w-full lg:w-1/2 flex justify-center">
            <img src="react.svg" alt="Contact Illustration" className="h-[300px] lg:h-[400px] object-contain" />
          </div>
        </div>
      </div>
    </div>
  );  
};

export default Contact;
