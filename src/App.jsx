import { useState } from "react";
import "./App.css";

function App() {
  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function checkInput(value, name) {
    if (value.trim() === "") {
      return name + " is required.";
    }
    const num = Number(value);
    if (isNaN(num)) {
      return name + " must be a number.";
    }
    if (num < 0) {
      return name + " cannot be negative.";
    }
    if (num === 0) {
      return name + " must be greater than 0.";
    }
    return "";
  }

  const weightError = submitted ? checkInput(weight, "Weight") : "";
  const heightError = submitted ? checkInput(height, "Height") : "";

  let bmi = null;
  if (submitted && weightError === "" && heightError === "") {
    const w = Number(weight);
    const h = Number(height);
    if (unit === "metric") {
      bmi = w / ((h / 100) * (h / 100));
    } else {
      bmi = (703 * w) / (h * h);
    }
  }

  let category = "";
  if (bmi !== null) {
    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi < 25) {
      category = "Normal weight";
    } else if (bmi < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleReset() {
    setWeight("");
    setHeight("");
    setSubmitted(false);
  }

  function changeUnit(newUnit) {
    setUnit(newUnit);
    handleReset();
  }

  return (
    <div className="container">
      <h1>BMI Calculator</h1>

      <div className="units">
        <button
          className={unit === "metric" ? "selected" : ""}
          onClick={() => changeUnit("metric")}
        >
          Metric (kg, cm)
        </button>
        <button
          className={unit === "imperial" ? "selected" : ""}
          onClick={() => changeUnit("imperial")}
        >
          Imperial (lb, in)
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Weight ({unit === "metric" ? "kg" : "lb"})</label>
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        {weightError && <p className="error">{weightError}</p>}

        <label>Height ({unit === "metric" ? "cm" : "in"})</label>
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        {heightError && <p className="error">{heightError}</p>}

        <div className="buttons">
          <button type="submit">Calculate</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {bmi !== null && (
        <div className="result">
          <p>Your BMI: {bmi.toFixed(1)}</p>
          <p>Category: {category}</p>
        </div>
      )}
    </div>
  );
}

export default App;
