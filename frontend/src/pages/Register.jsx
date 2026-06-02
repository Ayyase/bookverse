import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/auth/register",
        form
      );

      toast.success("Register berhasil");

      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 border rounded-xl mb-4"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-xl mb-4"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-xl mb-4"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
          Register
        </button>

        <p className="mt-4 text-center">
          Sudah punya akun?
          <Link
            to="/login"
            className="text-indigo-600 ml-1"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}