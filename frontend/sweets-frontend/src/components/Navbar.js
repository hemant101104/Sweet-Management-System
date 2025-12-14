import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) return null;

  return (
    <div style={{ padding: "10px", background: "#2563eb" }}>
      <Link to="/dashboard" style={{ color: "white", marginRight: "15px" }}>
        Dashboard
      </Link>

      {/* Admin visible to everyone */}
      <Link to="/admin" style={{ color: "white", marginRight: "15px" }}>
        Admin
      </Link>

      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
