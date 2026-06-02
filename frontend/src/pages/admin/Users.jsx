import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import API from "../../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUsers();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-8 w-full">
        <h1 className="text-3xl font-bold mb-6">
          Users
        </h1>

        <div className="bg-white rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-4">
                  Name
                </th>

                <th className="p-4">
                  Email
                </th>

                <th className="p-4">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="text-center border-b"
                >
                  <td className="p-4">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}