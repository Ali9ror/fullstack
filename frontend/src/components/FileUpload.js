import React, { useState } from "react";
import { uploadFile } from "../api";
import { getToken } from "../auth";
import { FaFileUpload } from "react-icons/fa";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null); 
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) {
      alert("Выберите файл!");
      return;
    }

    setLoading(true);
    try {
      const token = getToken();
      const res = await uploadFile(file, token);
      setResult(res); 
    } catch (e) {
      alert("Ошибка анализа файла");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
        style={{
          marginBottom: "20px",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #cce0ff",
          backgroundColor: "#f5faff",
          cursor: "pointer"
        }}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 25px",
          borderRadius: "8px",
          border: "none",
          background: "linear-gradient(90deg, #4facfe, #00f2fe)",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          transition: "all 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <FaFileUpload /> {loading ? "Анализируем..." : "Анализировать"}
      </button>

      {result && (
        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            border: "1px solid #cce0ff",
            fontSize: "14px",
            width: "100%",
            maxWidth: "500px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
          }}
        >
          <h4 style={{ color: "#007acc", marginBottom: "15px" }}>Результат анализа</h4>

          <p>
            <strong>Найдено:</strong>{" "}
            {result.found_sections.length
              ? result.found_sections.join(", ")
              : "—"}
          </p>

          <p>
            <strong>Отсутствует:</strong>{" "}
            {result.missing_sections.length
              ? result.missing_sections.join(", ")
              : "—"}
          </p>

          <p style={{ marginTop: "15px", fontWeight: "bold", color: "#007acc" }}>
            {result.summary}
          </p>
        </div>
      )}
    </div>
  );
}
