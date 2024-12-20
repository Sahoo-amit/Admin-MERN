import React from "react";
import { NavLink } from "react-router-dom";
import { useTokenContext } from "../context/TokenContext";

const Header = () => {
  const { isLoggedOut } = useTokenContext();

  return (
    <div className="fixed top-0 w-full h-[5rem] flex justify-between items-center px-9 py-2 border-b-2 border-gray-800 bg-gray-900 z-50">
      <div>
        <h1 className="text-3xl text-white font-bold">Amit</h1>
      </div>

      <nav>
        <ul className="hidden md:flex items-center space-x-6 text-lg text-white font-semibold">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-orange-500 ${
                  isActive ? "text-orange-500 scale-125" : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:text-orange-500 ${
                  isActive ? "text-orange-500 scale-125" : ""
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/service"
              className={({ isActive }) =>
                `hover:text-orange-500 ${
                  isActive ? "text-orange-500 scale-125" : ""
                }`
              }
            >
              Service
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:text-orange-500 ${
                  isActive ? "text-orange-500 scale-125" : ""
                }`
              }
            >
              Contact
            </NavLink>
          </li>
          {isLoggedOut ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `hover:text-orange-500 ${
                      isActive ? "text-orange-500 scale-125" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `hover:text-orange-500 ${
                      isActive ? "text-orange-500 scale-125" : ""
                    }`
                  }
                >
                  Signup
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  `hover:text-orange-500 ${
                    isActive ? "text-orange-500 scale-125" : ""
                  }`
                }
              >
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
