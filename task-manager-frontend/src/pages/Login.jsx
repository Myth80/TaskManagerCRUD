import api from "../api/axios";

export default function Login() {
  const login = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert(res.data?.message || "Login successful");
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="page-center">
      <div className="auth-card">
        <h2 className="title">Task Manager</h2>

        <section className="auth-section" aria-labelledby="login-heading">
          <h3 id="login-heading">Login</h3>

          <input
            id="email"
            className="auth-input"
            placeholder="Email"
          />

          <input
            id="password"
            className="auth-input"
            type="password"
            placeholder="Password"
          />

          <div className="auth-actions">
            <button onClick={login}>Login</button>
          </div>
        </section>

        <p style={{ textAlign: "center" }}>
          Don&apos;t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}
