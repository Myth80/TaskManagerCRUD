import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // reusable fetch function (used after add / toggle)
  const fetchTasks = async () => {
    try {
      const res = await api.get("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await api.post("/api/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const toggleComplete = async (id) => {
    await api.put(`/api/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // ✅ FIXED useEffect
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
      return;
    }

    const loadTasks = async () => {
      try {
        const res = await api.get("/api/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadTasks();
  }, []);

  return (
    <div className="page-center">
      <div className="auth-card">
        {/* Header */}
        <div className="dashboard-header">
          <h2 className="title">My Tasks</h2>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        {/* Add Task */}
        <section className="auth-section">
          <input
            className="auth-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a new task"
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <div className="auth-actions">
            <button onClick={addTask}>Add Task</button>
          </div>
        </section>

        {/* Tasks */}
        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-text">No tasks yet 🚀</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className={`task-item ${task.completed ? "done" : ""}`}
              >
                <span>{task.title}</span>
                <button onClick={() => toggleComplete(task._id)}>
                  {task.completed ? "Undo" : "Done"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
