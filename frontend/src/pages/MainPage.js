import { FaHistory, FaSignOutAlt, FaFileAlt, FaUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode"; 
import React, { useState, useEffect } from "react";
import { getToken } from "../auth";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";

export default function MainPage() {
  const token = getToken();
  const navigate = useNavigate();
  const [aiResult, setAiResult] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  let userEmail = "";
  if (token) {
    const decoded = jwtDecode(token);
    userEmail = decoded.sub;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #c3e0ff, #e6f2ff)",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "60px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
            borderRadius: "12px",
            backgroundColor: "#ffffffdd",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            transition: "all 0.2s",
            fontWeight: "bold",
            color: "#007acc",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f0f8ff";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#ffffffdd";
            e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#007acc",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            <FaUser />
          </div>
          {userEmail}
        </div>

        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "45px",
              right: "0",
              backgroundColor: "white",
              border: "1px solid #cce0ff",
              borderRadius: "8px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
              width: "180px",
              zIndex: 100,
            }}
          >
            <div
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                color: "#007acc",
                transition: "all 0.2s",
              }}
              onClick={() => navigate("/history")}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f8ff")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              <FaHistory /> История
            </div>
            <div
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                color: "#007acc",
                transition: "all 0.2s",
              }}
              onClick={handleLogout}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f8ff")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              <FaSignOutAlt /> Выйти
            </div>
          </div>
        )}
      </div>


      <div
        style={{
          backgroundColor: "#ffffffdd",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          width: "450px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <FileUpload setAiResult={setAiResult} />

        <div
          style={{
            width: "100%",
            border: "1px solid #cce0ff",
            borderRadius: "10px",
            padding: "15px",
            backgroundColor: "#f5faff",
            color: "#007acc",
            fontSize: "14px",
            boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
          }}
        >
          <h4 style={{ marginTop: 0, marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaFileAlt /> Информация
          </h4>
          <ul style={{ paddingLeft: "20px", margin: 0 }}>
            <li>Принимаются файлы форматов: <strong>.pdf, .doc, .docx</strong></li>
            <li>Файлы анализируются на соответствие структуре отчета</li>
            <li>Обрабатываются: титульный лист, введение, заключение, список литературы</li>
          </ul>
        </div>

        {aiResult && (
          <div
            style={{
              width: "100%",
              border: "1px solid #4facfe",
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "#e6f7ff",
              color: "#007acc",
              fontSize: "14px",
              boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
            }}
          >
            <h4 style={{ marginTop: 0, marginBottom: "10px" }}>Результат анализа</h4>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{JSON.stringify(aiResult, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
