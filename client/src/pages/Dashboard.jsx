import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");       
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({});
  const [sortBy, setSortBy] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const navigate = useNavigate();

  const fetchStats = async () => {
    const res = await API.get("/tasks/stats");
    setStats(res.data);
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      alert("Please login again");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  
  const filteredTasks = tasks
  .filter((task) => {
    const matchSearch =
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    (task.description || "")
    .toLowerCase()
    .includes(search.toLowerCase());

    const matchFilter =
      filter === "All"
        ? true
        : filter === "Completed"
        ? task.status === "Completed"
        : task.status === "Pending";

    return matchSearch && matchFilter;
  })
  .sort((a, b) => {
    if (sortBy === "Newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    if (sortBy === "Oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    if (sortBy === "Priority") {
      const priorityOrder = {
        High: 3,
        Medium: 2,
        Low: 1,
      };

      return (
        priorityOrder[b.priority] -
        priorityOrder[a.priority]
      );
    }

    if (sortBy === "DueDate") {
      return (
        new Date(a.dueDate || 0) -
        new Date(b.dueDate || 0)
      );
    }

    return 0;
  });


  const addTask = async () => {
  if (!title.trim()) return;

  if (!priority) {
    alert("Please select priority");
    return;
  }

  await API.post("/tasks", {
    title,
    description,
    dueDate,
    priority,
  });

  setTitle("");
  setDescription("");
  setDueDate("");
  setPriority("");

  fetchTasks();
  fetchStats();
};
  const toggleTask = async (id) => {
    await API.put(`/tasks/${id}/toggle`);
    fetchTasks();
    fetchStats();
  };

  const deleteTask = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmDelete) return;

  await API.delete(`/tasks/${id}`);

  fetchTasks();
  fetchStats();
};

  const saveEditTask = async () => {
  await API.put(
    `/tasks/${editingTask._id}`,
    editingTask
  );

  setEditingTask(null);

  fetchTasks();
  fetchStats();
};


  const handleDeleteCompleted = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete all completed tasks?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete("/tasks/completed/all");

    // UI update (remove completed tasks locally)
    setTasks((prev) =>
      prev.filter((task) => task.status !== "Completed")
    );

    alert("Completed tasks deleted successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to delete completed tasks");
  }
};

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6E6FA] via-[#D8B4FE] to-[#C4B5FD] p-6">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold" style={{ color: "#6B4FA1" }}>
            My Tasks
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">

          <div className="bg-gray-100 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-xl font-bold">{stats.total || 0}</p>
          </div>

          <div className="bg-green-100 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-xl font-bold text-green-600">
              {stats.completed || 0}
            </p>
          </div>

          <div className="bg-yellow-100 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-xl font-bold text-yellow-600">
              {stats.pending || 0}
            </p>
          </div>

          <div className="bg-red-100 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-500">Overdue</p>
            <p className="text-xl font-bold text-red-600">
              {stats.overdue || 0}
            </p>
          </div>

        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 border border-gray-300 rounded-lg px-4 py-2"
        />

        <p className="text-sm text-gray-500 mb-3">
  Showing {filteredTasks.length} task(s)
</p>


        <div className="flex gap-2 mb-4">
          <button
          onClick={() => setFilter("All")}
          className={`px-4 py-2 rounded-lg ${
          filter === "All"
          ? "bg-indigo-600 text-white"
          : "bg-gray-200"
          }`}
          >
          All
          </button>

        <button
          onClick={() => setFilter("Pending")}
          className={`px-4 py-2 rounded-lg ${
            filter === "Pending"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Pending
        </button>

        <button
          onClick={() => setFilter("Completed")}
          className={`px-4 py-2 rounded-lg ${
            filter === "Completed"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Completed
        </button>
      </div>


      <button
  onClick={handleDeleteCompleted}
  className="mb-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
>
  Delete Completed
</button> 

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-6">

          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
          />

          <textarea
            placeholder="Task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="md:col-span-2 border border-gray-300 rounded-lg px-4 py-2"
          ></textarea>

          <input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  className="w-33 border border-gray-300 rounded-lg px-2 py-2"
/>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-28 ml-3 border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="" disabled>
              Priority
            </option>

            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>         


          <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-26 ml-2 border border-gray-300 rounded-lg px-4 py-2"
        >
           <option value="" disabled>
            Filter
           </option>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="Priority">Priority</option>
          <option value="DueDate">Due Date</option>
</select>

          <button
            onClick={addTask}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg font-medium"
          >
            Add
          </button>

        </div>


        {editingTask && (
  <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg mb-4">

    <h2 className="font-bold mb-3">
      Edit Task
    </h2>

    <input
      type="text"
      value={editingTask.title}
      onChange={(e) =>
        setEditingTask({
          ...editingTask,
          title: e.target.value,
        })
      }
      className="w-full border rounded-lg px-3 py-2 mb-2"
    />

    <textarea
      value={editingTask.description}
      onChange={(e) =>
        setEditingTask({
          ...editingTask,
          description: e.target.value,
        })
      }
      className="w-full border rounded-lg px-3 py-2 mb-2"
    />

    <input
      type="date"
      value={
        editingTask.dueDate
          ? editingTask.dueDate.split("T")[0]
          : ""
      }
      onChange={(e) =>
        setEditingTask({
          ...editingTask,
          dueDate: e.target.value,
        })
      }
      className="w-full border rounded-lg px-3 py-2 mb-2"
    />

    <select
      value={editingTask.priority}
      onChange={(e) =>
        setEditingTask({
          ...editingTask,
          priority: e.target.value,
        })
      }
      className="w-full border rounded-lg px-3 py-2 mb-3"
    >
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>

    <div className="flex gap-2">

      <button
        onClick={saveEditTask}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>

      <button
        onClick={() => setEditingTask(null)}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>

    </div>

  </div>
)}


        {/* Tasks */}
        <div className="space-y-3">

          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks found.</p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow"
              >

                <div>
                 <p
                  className={`font-medium ${
                  task.status === "Completed"
                  ? "line-through text-gray-500"
                  : "text-gray-800"
                  }`}
              >
                  {task.title}
                </p>

                {task.description && (
                  <p className="text-sm text-gray-600">
                    {task.description}
                  </p>
                )}  

                  {task.dueDate && (
                    <p className="text-sm text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}

                  <p className="text-sm text-gray-500">
                    Status: {task.status}
                  </p>

                  <p
  className={`inline-block ml-8 mt-1 px-2 py-0.5 text-xs font-semibold rounded-full ${
    task.priority === "High"
      ? "bg-red-100 text-red-700"
      : task.priority === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700"
  }`}
>
  {task.priority}
</p>
                </div>

                <div className="flex gap-2">


                  <button
                    onClick={() => setEditingTask(task)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>                                 

                  <button
                    onClick={() => toggleTask(task._id)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded"
                  >
                    Toggle
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}
