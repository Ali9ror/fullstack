import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth";

export default function Header({ userEmail }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px", borderBottom: "1px solid #ccc" }}>
      <div onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
        {userEmail}
      </div>
      {open && (
        <div style={{ position: "absolute", right: "10px", top: "40px", border: "1px solid #ccc", background: "#fff" }}>
          <div onClick={() => navigate("/history")} style={{ padding: "5px", cursor: "pointer" }}>История</div>
          <div onClick={handleLogout} style={{ padding: "5px", cursor: "pointer" }}>Выйти</div>
        </div>
      )}
    </div>
  );
}
