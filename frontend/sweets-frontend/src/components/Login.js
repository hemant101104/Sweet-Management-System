import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      // store auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role); // IMPORTANT
      localStorage.setItem("email", email);

      // go to dashboard
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

      <p onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
        New user? Register
      </p>
    </div>
  );
}

export default Login;
