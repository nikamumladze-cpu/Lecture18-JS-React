import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="form-card">
        <h1 style={{ textAlign: "center", color: "#1a1a1a" }}>რეგისტრაცია</h1>
        <RegistrationForm />
      </div>
    </div>
  );
}

export default App;
