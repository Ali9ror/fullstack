  import React from "react";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import LoginPage from "./pages/LoginPage";
  import RegisterPage from "./pages/RegisterPage";
  import HomePage from "./pages/MainPage";
  import HistoryPage from "./pages/HistoryPage";

  function App() {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/main" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    );
  }

  export default App;
