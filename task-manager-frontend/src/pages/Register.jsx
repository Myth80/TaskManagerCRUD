import api from "../api/axios";

export default function Register() {
  const register = async () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      alert(res.data?.message || "Registered successfully");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page-center">
      <div className="auth-card">
        <h2 className="title">Task Manager</h2>

        <section className="auth-section">
          <h3>Register</h3>

          <input
            id="username"
            className="auth-input"
            placeholder="Username"
          />

          <input
            id="regEmail"
            className="auth-input"
            placeholder="Email"
          />

          <input
            id="regPassword"
            className="auth-input"
            type="password"
            placeholder="Password"
          />

          <div className="auth-actions">
            <button onClick={register}>Register</button>
          </div>
        </section>
      </div>
    </div>
  );
}
