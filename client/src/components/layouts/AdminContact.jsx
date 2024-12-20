import { useEffect, useState } from "react";
import { useTokenContext } from "../../context/TokenContext";

export const AdminContact = () => {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authorization } = useTokenContext();

  const getContact = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:4000/api/admin_contact`, {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const result = await response.json();
      setContact(result.contact || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  const deleteContact = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this contact?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:4000/api/admin_contact/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorization,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }
      const result = await response.json();
      console.log(result);
      getContact();
    } catch (error) {
      console.error("Error deleting contact:", error.message);
    }
  };

  return (
    <div className="w-[75%] px-10 py-24 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Contact Details</h1>
      {loading ? (
        <p className="text-blue-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : contact.length === 0 ? (
        <p className="text-gray-600">No contacts available.</p>
      ) : (
        <ul className="space-y-6">
          {contact.map((item) => (
            <li
              key={item._id}
              className="p-6 bg-white shadow rounded-lg space-y-3"
            >
              <h2 className="text-lg font-medium">
                <span className="text-gray-700">UserName:</span> {item.username}
              </h2>
              <h3 className="text-gray-700">
                <span className="font-medium">Email Address:</span> {item.email}
              </h3>
              <p className="text-gray-600">
                <span className="font-medium">Message:</span> {item.message}
              </p>
              <button
                onClick={() => deleteContact(item._id)}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

