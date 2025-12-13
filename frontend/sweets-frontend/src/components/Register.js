import { useState } from "react";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({});

  const register = async () => {
    await API.post("/auth/register", form);
    alert("Registered successfully");
    window.location.href = "/";
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password:e.target.value})} />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
