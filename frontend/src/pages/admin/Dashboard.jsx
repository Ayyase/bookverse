import Sidebar from "../../components/Sidebar";
import API from "../../services/api";
import { useEffect, useState } from "react";
import {
  FaBook,
  FaUsers,
  FaShoppingCart,
} from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Dashboard() {
  const [stats, setStats] = useState({
    books: 0,
    users: 0,
    orders: 0,
  });

  const getStats = async () => {
    try {
      const books = await API.get("/books");

      const users = await API.get("/users");

      const orders = await API.get("/orders");

      setStats({
        books: books.data.length,
        users: users.data.length,
        orders: orders.data.length,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getStats();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back admin 👋
            </p>
          </div>

          <Link
            to="/"
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl"
          >
            Back To Home
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-md">
            <FaBook className="text-4xl text-indigo-600 mb-5" />

            <h2 className="text-gray-500">
              Total Books
            </h2>

            <h1 className="text-5xl font-bold mt-2">
              {stats.books}
            </h1>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md">
            <FaUsers className="text-4xl text-indigo-600 mb-5" />

            <h2 className="text-gray-500">
              Total Users
            </h2>

            <h1 className="text-5xl font-bold mt-2">
              {stats.users}
            </h1>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md">
            <FaShoppingCart className="text-4xl text-indigo-600 mb-5" />

            <h2 className="text-gray-500">
              Total Orders
            </h2>

            <h1 className="text-5xl font-bold mt-2">
              {stats.orders}
            </h1>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-8 mt-10">
          <h2 className="text-3xl font-bold mb-5">
            BookVerse Admin Panel
          </h2>

          <p className="text-gray-500 leading-8">
            Manage your bookstore system
            easily with a modern
            minimalist dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}