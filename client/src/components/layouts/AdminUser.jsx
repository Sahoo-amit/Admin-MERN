import { useEffect, useState } from "react";
import { useTokenContext } from "../../context/TokenContext";
import { Link } from "react-router-dom";

export const AdminUser = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authorization } = useTokenContext();

  const getUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:4000/api/admin`, {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }
      const result = await response.json();
      setUser(result.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:4000/api/admin/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorization,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }
      const result = await response.json();
      console.log(result);
      getUserData(); // Refresh the user list
    } catch (err) {
      console.error("Error deleting user:", err.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="px-10 py-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Management</h1>
      {loading ? (
        <p className="text-blue-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : user.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">UserName</th>
              <th className="border border-gray-300 p-2 text-left">Email</th>
              <th className="border border-gray-300 p-2 text-left">Phone</th>
              <th className="border border-gray-300 p-2 text-left">Update</th>
              <th className="border border-gray-300 p-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {user.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{item.username}</td>
                <td className="border border-gray-300 p-2">{item.email}</td>
                <td className="border border-gray-300 p-2">{item.phone}</td>
                <td className="border border-gray-300 p-2">
                  <Link
                    to={`/admin/user/${item._id}/update`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => removeUser(item._id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
