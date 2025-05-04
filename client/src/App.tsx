import React from "react";
import "./App.css";
import { useDiagnostics } from "./hooks/useDiagnostics";
import { DiagnosticsChart } from "./components/DiagnosticsChart";

function App() {
  const data = useDiagnostics();

  return (
    <div className="App">
      <h1>Robot Diagnostics</h1>
      {data ? (
        <>
          <ul>
            <li>
              <strong>Temperature:</strong> {data.temperature} °C
            </li>
            <li>
              <strong>Battery:</strong> {data.battery} %
            </li>
            <li>
              <strong>CPU:</strong> {data.cpu} %
            </li>
            <li>
              <strong>Timestamp:</strong>{" "}
              {new Date(data.timestamp).toLocaleTimeString()}
            </li>
          </ul>
          <DiagnosticsChart data={data} />
        </>
      ) : (
        <p>Waiting for diagnostics...</p>
      )}
    </div>
  );
}

export default App;
