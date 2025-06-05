import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./App.css";

function App() {
  const [ip, setIp] = useState("");
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("60"); // default: Last hour
  const [customPeriod, setCustomPeriod] = useState(""); // additional numeric input

  const fetchData = async () => {
    const periodMinutes = customPeriod
      ? parseInt(customPeriod)
      : parseInt(selectedPeriod);

    const res = await fetch(
      `http://localhost:8000/metrics?ip=${ip}&period_minutes=${periodMinutes}&interval_seconds=60`
    );
    const data = await res.json();

    setLabels(data.map((d) => new Date(d.timestamp).toLocaleTimeString()));
    setValues(data.map((d) => d.value));
  };

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>CPU Usage Viewer</h1>

      {/* Time Period Dropdown */}
      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "10px" }}>Time Period:</label>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          style={{ marginRight: "20px", padding: "5px" }}
        >
          <option value="60">Last hour</option>
          <option value="360">Last 6 hours</option>
          <option value="720">Last 12 hours</option>
          <option value="1440">Last day</option>
        </select>
      </div>

      {/* Custom Period Input */}
      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "10px" }}>Period (minutes):</label>
        <input
          type="number"
          placeholder="Enter custom period"
          value={customPeriod}
          onChange={(e) => setCustomPeriod(e.target.value)}
          style={{ padding: "5px", width: "200px" }}
        />
      </div>

      {/* IP and Fetch Button */}
      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "10px" }}>IP Address:</label>
        <input
          placeholder="Enter AWS internal IP (e.g. 172.31.88.161)"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          style={{ marginRight: "20px", padding: "5px" }}
        />
        <button onClick={fetchData} style={{ padding: "5px 10px" }}>
          Fetch Data
        </button>
      </div>

      {/* Chart */}
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "CPU Usage (%)",
              data: values,
              borderColor: "pink",
              tension: 0.3,
            },
          ],
        }}
      />
    </div>
  );
}

export default App;
