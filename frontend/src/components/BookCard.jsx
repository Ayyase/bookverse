import API from "../services/api";
import toast from "react-hot-toast";

export default function BookCard({
  book,
}) {
  const addToCart = async () => {
    try {
      if (book.stock <= 0) {
        return toast.error(
          "Out of stock"
        );
      }

      await API.post("/cart", {
        book_id: book.id,
        quantity: 1,
      });

      toast.success("Added to cart");
    } catch (err) {
      toast.error(
        err.response?.data?.message
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl duration-300">
      <img
        src={`http://localhost:5000/uploads/${book.image}`}
        className="w-full h-72 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold">
          {book.title}
        </h2>

        <p className="text-gray-500">
          {book.author}
        </p>

        <p className="text-indigo-600 font-bold mt-3 text-lg">
          Rp {book.price}
        </p>

        <div className="mt-2">
          {book.stock > 0 ? (
            <span className="text-green-600 font-semibold">
              Stock:
              {book.stock}
            </span>
          ) : (
            <span className="text-red-500 font-semibold">
              Out Of Stock
            </span>
          )}
        </div>

        <button
          onClick={addToCart}
          disabled={book.stock <= 0}
          className={`w-full mt-5 py-3 rounded-2xl text-white ${
            book.stock > 0
              ? "bg-indigo-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {book.stock > 0
            ? "Add To Cart"
            : "Out Of Stock"}
        </button>
      </div>
    </div>
  );
}