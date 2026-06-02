import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between">
      <Link
        to="/"
        className="text-2xl font-bold text-indigo-600"
      >
        BookVerse
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>

        <Link to="/about">About</Link>

        <Link to="/cart">Cart</Link>

        {user?.role === "admin" && (
          <Link to="/admin/dashboard">
            Dashboard
          </Link>
        )}

        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-xl"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}