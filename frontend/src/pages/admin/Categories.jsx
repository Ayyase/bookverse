import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import API from "../../services/api";
import toast from "react-hot-toast";

export default function Categories() {
  const [categories, setCategories] =
    useState([]);

  const [name, setName] = useState("");

  const getCategories = async () => {
    const res = await API.get(
      "/categories"
    );

    setCategories(res.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();

    await API.post("/categories", {
      name,
    });

    toast.success("Category added");

    setName("");

    getCategories();
  };

  const deleteCategory = async (id) => {
    if (confirm("Delete category?")) {
      await API.delete(
        `/categories/${id}`
      );

      toast.success("Category deleted");

      getCategories();
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-8 w-full">
        <h1 className="text-3xl font-bold mb-6">
          Categories
        </h1>

        <form
          onSubmit={addCategory}
          className="flex gap-4 mb-6"
        >
          <input
            type="text"
            placeholder="Category name"
            className="border p-3 rounded-xl w-full"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <button className="bg-indigo-600 text-white px-6 rounded-xl">
            Add
          </button>
        </form>

        <div className="space-y-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white p-4 rounded-xl flex justify-between"
            >
              <h2>{cat.name}</h2>

              <button
                onClick={() =>
                  deleteCategory(cat.id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}