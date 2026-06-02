import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import API from "../services/api";

import toast from "react-hot-toast";

export default function Cart() {
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    try {
      const res = await API.get("/cart");

      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCart();
  }, []);

  const removeCart = async (id) => {
    try {
      await API.delete(`/cart/${id}`);

      toast.success("Item removed");

      getCart();
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const hasOutOfStock = cart.some(
    (item) => item.stock <= 0
  );

  const checkout = async () => {
    try {
      if (hasOutOfStock) {
        return toast.error(
          "Ada buku yang stocknya habis"
        );
      }

      const res = await API.post(
        "/orders/checkout"
      );

      toast.success(
        res.data.message
      );

      getCart();
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
          "Checkout gagal"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-10">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center shadow-md">
            <h2 className="text-3xl font-bold mb-4">
              Cart Empty
            </h2>

            <p className="text-gray-500">
              Add some books first
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-md p-5 flex items-center gap-5"
                >
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    className="w-32 h-40 object-cover rounded-2xl"
                  />

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">
                      {item.title}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Quantity:
                      {item.quantity}
                    </p>

                    <p className="text-indigo-600 font-bold mt-4 text-xl">
                      Rp {item.price}
                    </p>

                    {item.stock <= 0 ? (
                      <p className="text-red-500 font-bold mt-2">
                        Out Of Stock
                      </p>
                    ) : (
                      <p className="text-green-600 font-bold mt-2">
                        Stock:
                        {item.stock}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      removeCart(item.id)
                    }
                    className="bg-red-500 text-white px-5 py-3 rounded-2xl"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl shadow-md p-8 h-fit">
              <h2 className="text-3xl font-bold mb-6">
                Summary
              </h2>

              <div className="flex justify-between mb-4">
                <span>Total Items</span>

                <span>
                  {cart.length}
                </span>
              </div>

              <div className="flex justify-between text-2xl font-bold mb-8">
                <span>Total</span>

                <span>
                  Rp {total}
                </span>
              </div>

              {hasOutOfStock && (
                <div className="bg-red-100 text-red-600 p-4 rounded-2xl mb-5">
                  Ada buku yang stocknya
                  habis
                </div>
              )}

              <button
                onClick={checkout}
                disabled={
                  hasOutOfStock
                }
                className={`w-full py-4 rounded-2xl text-lg text-white ${
                  hasOutOfStock
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600"
                }`}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}