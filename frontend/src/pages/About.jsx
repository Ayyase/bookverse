import Navbar from "../components/Navbar";
import {
  FaBook,
  FaUsers,
  FaShippingFast,
} from "react-icons/fa";

export default function About() {
  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 text-center px-6">
        <h1 className="text-5xl font-bold mb-6">
          About BookVerse
        </h1>

        <p className="max-w-3xl mx-auto text-lg opacity-90">
          BookVerse is a modern online
          bookstore platform providing
          high-quality books with a fast,
          easy, and enjoyable shopping
          experience.
        </p>
      </div>

      <div className="max-w-6xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-md text-center hover:shadow-xl duration-300">
            <FaBook className="text-5xl text-indigo-600 mx-auto mb-5" />

            <h2 className="text-2xl font-bold mb-4">
              Thousands of Books
            </h2>

            <p className="text-gray-500">
              Explore books from various
              categories and authors.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md text-center hover:shadow-xl duration-300">
            <FaUsers className="text-5xl text-indigo-600 mx-auto mb-5" />

            <h2 className="text-2xl font-bold mb-4">
              Trusted Community
            </h2>

            <p className="text-gray-500">
              Thousands of readers trust
              BookVerse every day.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md text-center hover:shadow-xl duration-300">
            <FaShippingFast className="text-5xl text-indigo-600 mx-auto mb-5" />

            <h2 className="text-2xl font-bold mb-4">
              Fast Experience
            </h2>

            <p className="text-gray-500">
              Minimalist and responsive
              design for better shopping.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}