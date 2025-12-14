import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AddSweet() {
  const [sweet, setSweet] = useState({
    name: "",
    category: "",
    price: "",
    quantity: ""
  });

  const navigate = useNavigate();

  const addSweet = async () => {
    await API.post("/sweets", sweet);
    alert("Sweet added successfully");

    // 👇 go back to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="card">
      <h3>Add Sweet</h3>

      <input placeholder="Name"
        onChange={e => setSweet({ ...sweet, name: e.target.value })} />

      <input placeholder="Category"
        onChange={e => setSweet({ ...sweet, category: e.target.value })} />

      <input placeholder="Price"
        onChange={e => setSweet({ ...sweet, price: e.target.value })} />

      <input placeholder="Quantity"
        onChange={e => setSweet({ ...sweet, quantity: e.target.value })} />

      <button onClick={addSweet}>Add</button>
    </div>
  );
}

export default AddSweet;
