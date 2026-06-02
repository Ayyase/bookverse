import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] =
    useState("");

  const getBooks = async () => {
    const res = await API.get("/books");

    setBooks(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Welcome To BookVerse
        </h1>

        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Discover thousands of books
          from various categories with
          modern shopping experience.
        </p>

        <div className="max-w-xl mx-auto mt-10">
          <input
            type="text"
            placeholder="Search your favorite book..."
            className="w-full p-4 rounded-2xl text-black outline-none bg-white"
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Popular Books
          </h2>

          <p className="text-gray-500">
            {filteredBooks.length} Books
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}
        </div>
      </div>
    </>
  );
}