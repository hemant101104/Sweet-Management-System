import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");

  const fetchSweets = async () => {
    const res = await API.get("/sweets");
    setSweets(res.data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const purchase = async (id) => {
    await API.post(`/sweets/${id}/purchase`);
    fetchSweets();
  };

  return (
    <div>
      <h2>Sweets Dashboard</h2>

      <input
        placeholder="Search by name or category"
        onChange={e => setSearch(e.target.value)}
      />

      <div className="grid">
        {sweets
          .filter(
            s =>
              s.name.toLowerCase().includes(search.toLowerCase()) ||
              s.category.toLowerCase().includes(search.toLowerCase())
          )
          .map(s => (
            <div className="card" key={s.id}>
              <h3>{s.name}</h3>
              <p>{s.category}</p>
              <p>₹{s.price}</p>
              <p>Stock: {s.quantity}</p>
              <button
                disabled={s.quantity === 0}
                onClick={() => purchase(s.id)}
              >
                Purchase
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
