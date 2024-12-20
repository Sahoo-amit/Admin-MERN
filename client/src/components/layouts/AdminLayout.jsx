import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useTokenContext } from "../../context/TokenContext";

export const AdminLayout = () => {
  const {user, isLoading} = useTokenContext()
  console.log(user)
  console.log(isLoading)
  if(isLoading){
    return <h1 className="py-24 text-4xl text-red-600 font-semibold">Loading...</h1>
  }
  if(!user.isAdmin){
    return <Navigate to='/' />
  }
  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className="fixed w-1/4 h-screen bg-gray-800 px-6 py-24 text-white">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin/user"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500" : "hover:bg-gray-700"
                }`
              }
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/contact"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500" : "hover:bg-gray-700"
                }`
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/service"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500" : "hover:bg-gray-700"
                }`
              }
            >
              Service
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${
                  isActive ? "bg-blue-500" : "hover:bg-gray-700"
                }`
              }
            >
              Home
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="ml-[25%] w-[75%] min-h-screen bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

