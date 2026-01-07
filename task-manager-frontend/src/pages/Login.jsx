Login.jsx 
import api from "../api/axios";

export default function Login() {

  const login = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const register = async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registered successfully");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="page-center">
      <div className="auth-card">
        <h2 className="title">Task Manager</h2>

        <section className="auth-section" aria-labelledby="login-heading">
          <h3 id="login-heading">Login</h3>
          <input id="email" className="auth-input" placeholder="Email" />
          <input id="password" className="auth-input" type="password" placeholder="Password" />
          <div className="auth-actions">
            <button onClick={login}>Login</button>
          </div>
        </section>

        <section className="auth-section" aria-labelledby="register-heading">
          <h3 id="register-heading">Register</h3>
          <input id="name" className="auth-input" placeholder="Name" />
          <input id="regEmail" className="auth-input" placeholder="Email" />
          <input id="regPassword" className="auth-input" type="password" placeholder="Password" />
          <div className="auth-actions">
            <button onClick={register}>Register</button>
          </div>
        </section>
      </div>
    </div>
  );
}
