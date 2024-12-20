import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTokenContext } from "../../context/TokenContext";

const AdminUpdate = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authorization } = useTokenContext();
  const params = useParams();
  const navigate = useNavigate();

  const singleUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:4000/api/admin/user/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    singleUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:4000/api/admin/update/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization,
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Failed to update user data.");
      }
      alert("User data updated successfully!");
      navigate("/admin/user");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10 py-28">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Update User Data</h1>
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter name"
            value={user.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-gray-700">
            Phone
          </label>
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Enter Phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default AdminUpdate;
