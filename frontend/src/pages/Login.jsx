import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Login success");

      if (
        res.data.user.role === "admin"
      ) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-4 rounded-2xl mb-5"
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
          className="w-full border p-4 rounded-2xl mb-5"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl">
          Login
        </button>

        <p className="text-center mt-5">
          Don't have account?
          <Link
            to="/register"
            className="text-indigo-600 ml-2"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}