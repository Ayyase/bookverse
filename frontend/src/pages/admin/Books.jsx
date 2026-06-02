import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import API from "../../services/api";
import toast from "react-hot-toast";


export default function Books() {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [form, setForm] = useState({
        title: "",
        author: "",
        price: "",
        stock: "",
        description: "",
        category_id: "",
    });

    const [image, setImage] = useState(null);

    const getBooks = async () => {
        const res = await API.get("/books");

        setBooks(res.data);
    };

    const getCategories = async () => {
        const res = await API.get(
            "/categories"
        );

        setCategories(res.data);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getBooks();
        getCategories();
    }, []);

    const resetForm = () => {
        setForm({
            title: "",
            author: "",
            price: "",
            stock: "",
            description: "",
            category_id: "",
            oldImage: "",
        });

        setImage(null);

        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(form).forEach((key) => {
            formData.append(key, form[key]);
        });

        if (image) {
            formData.append("image", image);
        }

        try {
            if (editingId) {
                await API.put(
                    `/books/${editingId}`,
                    formData
                );

                toast.success("Book updated");
            } else {
                await API.post(
                    "/books",
                    formData
                );

                toast.success("Book added");
            }

            resetForm();

            getBooks();
        } catch {
            toast.error("Error");
        }
    };

    const editBook = (book) => {
        setEditingId(book.id);

        setForm({
            title: book.title,
            author: book.author,
            price: book.price,
            stock: book.stock,
            description: book.description,
            category_id: book.category_id,
            oldImage: book.image,
        });
    };

    const deleteBook = async (id) => {
        if (confirm("Delete book?")) {
            await API.delete(`/books/${id}`);

            toast.success("Book deleted");

            getBooks();
        }
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="p-8 w-full">
                <h1 className="text-4xl font-bold mb-6">
                    Books Management
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-2 gap-4 mb-8"
                >
                    <input
                        type="text"
                        placeholder="Title"
                        className="border p-3 rounded-xl"
                        value={form.title}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                title: e.target.value,
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Author"
                        className="border p-3 rounded-xl"
                        value={form.author}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                author: e.target.value,
                            })
                        }f
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        className="border p-3 rounded-xl"
                        value={form.price}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                price: e.target.value,
                            })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Stock"
                        className="border p-3 rounded-xl"
                        value={form.stock}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                stock: e.target.value,
                            })
                        }
                    />

                    <select
                        className="border p-3 rounded-xl"
                        value={form.category_id}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                category_id:
                                    e.target.value,
                            })
                        }
                    >
                        <option value="">
                            Select Category
                        </option>

                        {categories.map((cat) => (
                            <option
                                key={cat.id}
                                value={cat.id}
                            >
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="file"
                        className="border p-3 rounded-xl"
                        onChange={(e) =>
                            setImage(e.target.files[0])
                        }
                    />

                    <textarea
                        placeholder="Description"
                        className="border p-3 rounded-xl col-span-2"
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description:
                                    e.target.value,
                            })
                        }
                    />

                    <button className="bg-indigo-600 text-white py-3 rounded-xl col-span-2">
                        {editingId
                            ? "Update Book"
                            : "Add Book"}
                    </button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden"
                        >
                            <img
                                src={`http://localhost:5000/uploads/${book.image}`}
                                className="w-full h-60 object-cover"
                            />

                            <div className="p-4">
                                <h2 className="font-bold text-lg">
                                    {book.title}
                                </h2>

                                <p className="text-gray-500">
                                    {book.author}
                                </p>

                                <p className="text-indigo-600 font-bold mt-2">
                                    Rp {Number(book.price).toLocaleString("id-ID")}
                                </p>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() =>
                                            editBook(book)
                                        }
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-xl w-full"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteBook(book.id)
                                        }
                                        className="bg-red-500 text-white px-4 py-2 rounded-xl w-full"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}