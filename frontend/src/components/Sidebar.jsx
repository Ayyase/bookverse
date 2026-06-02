import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    if (confirm("Yakin logout?")) {
      localStorage.clear();

      navigate("/login");
    }
  };

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold text-indigo-600 mb-10">
          BookVerse
        </h1>

        <div className="flex flex-col gap-4">
          <Link
            to="/admin/dashboard"
            className="hover:text-indigo-600"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/books"
            className="hover:text-indigo-600"
          >
            Books
          </Link>

          <Link
            to="/admin/categories"
            className="hover:text-indigo-600"
          >
            Categories
          </Link>

          <Link
            to="/admin/users"
            className="hover:text-indigo-600"
          >
            Users
          </Link>
        </div>
      </div>

      <button
        onClick={logout}
        className="bg-red-500 text-white py-3 rounded-xl mt-10"
      >
        Logout
      </button>
    </div>
  );
}