import React, { useState } from "react";
import { loginUser } from "../api";
import { setToken } from "../auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      if (res.access_token) {
        setToken(res.access_token);
        navigate("/main");
      } else {
        alert("Ошибка входа! Проверьте данные.");
      }
    } catch (err) {
      alert("Ошибка подключения к серверу или неверные данные.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #c3e0ff, #e6f2ff)", 
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffffdd", 
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          width: "350px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#007acc" }}>Вход</h2>
        <form onSubmit={handleLogin}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "10px",
              padding: "8px",       
              borderRadius: "6px",
              border: "1px solid #cce0ff",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              fontSize: "14px",
            }}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "15px", 
              padding: "8px",       
              borderRadius: "6px",
              border: "1px solid #cce0ff",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              fontSize: "14px",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "6px",
              border: "none",
              background: "linear-gradient(90deg, #4facfe, #00f2fe)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
        <button
          onClick={() => navigate("/register")}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #007acc",
            backgroundColor: "white",
            color: "#007acc",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#007acc";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.color = "#007acc";
          }}
        >
          Регистрация
        </button>
      </div>
    </div>
  );
}
