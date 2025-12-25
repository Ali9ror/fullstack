import React, { useEffect, useState } from "react";
import { getHistory } from "../api";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await getHistory();
        setHistory(res);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      }
    }
    fetchHistory();
  }, []);

  const filteredHistory = history.filter((item) => {
    const fileDate = new Date(item.timestamp);

    const matchesType = typeFilter
      ? item.filename.toLowerCase().endsWith(typeFilter)
      : true;

    const matchesSection = sectionFilter
      ? item.result.found_sections.includes(sectionFilter)
      : true;

    const matchesDateFrom = dateFrom ? fileDate >= new Date(dateFrom) : true;
    const matchesDateTo = dateTo
      ? fileDate <= new Date(dateTo + "T23:59:59")
      : true;

    return matchesType && matchesSection && matchesDateFrom && matchesDateTo;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #c3e0ff, #e6f2ff)",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      {/* Кнопка назад */}
      <button
        onClick={() => navigate("/main")}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "10px 18px",
          borderRadius: "8px",
          border: "none",
          background: "linear-gradient(90deg, #4facfe, #00f2fe)",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <FaArrowLeft /> Назад
      </button>

      <h2 style={{ color: "#007acc", textAlign: "center" }}>
        История анализов
      </h2>

      {/* Фильтры */}
      <div
        style={{
          maxWidth: "900px",
          margin: "20px auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          backgroundColor: "#ffffffdd",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #cce0ff",
            backgroundColor: "#f5faff",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <option value="">Все типы</option>
          <option value=".pdf">PDF</option>
          <option value=".doc">DOC</option>
          <option value=".docx">DOCX</option>
        </select>

        <select
          value={sectionFilter}
          onChange={(e) => setSectionFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #cce0ff",
            backgroundColor: "#f5faff",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <option value="">Все разделы</option>
          <option value="введение">Введение</option>
          <option value="заключение">Заключение</option>
          <option value="список литературы">Список литературы</option>
          <option value="титульный лист">Титульный лист</option>
        </select>

        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #cce0ff",
            backgroundColor: "#f5faff",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #cce0ff",
            backgroundColor: "#f5faff",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        />
      </div>

      {filteredHistory.length === 0 ? (
        <p style={{ textAlign: "center", color: "#007acc", marginTop: "40px" }}>
          Ничего не найдено
        </p>
      ) : (
        filteredHistory.map((item, index) => (
          <div
            key={index}
            style={{
              maxWidth: "800px",
              margin: "15px auto",
              backgroundColor: "#ffffffdd",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
            }}
          >
            <p>
              <strong>Файл:</strong> {item.filename}
            </p>
            <p>
              <strong>Дата:</strong> {new Date(item.timestamp).toLocaleString()}
            </p>

            <p>
              <strong>Найдено:</strong>{" "}
              {item.result.found_sections.map((s, i) => (
                <span
                  key={i}
                  style={{
                    background: "linear-gradient(135deg, #c0f0ff, #007acc)",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "12px",
                    marginRight: "6px",
                    fontSize: "13px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  {s}
                </span>
              ))}
            </p>

            <p>
              <strong>Отсутствует:</strong>{" "}
              {item.result.missing_sections.map((s, i) => (
                <span
                  key={i}
                  style={{
                    background: "linear-gradient(135deg, #ffbebe, #cc0000)",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "12px",
                    marginRight: "6px",
                    fontSize: "13px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  {s}
                </span>
              ))}
            </p>

            <div
              style={{
                marginTop: "10px",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#f5faff",
                fontWeight: "bold",
                color: "#007acc",
              }}
            >
              {item.result.summary}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
