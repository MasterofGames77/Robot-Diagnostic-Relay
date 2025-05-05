import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DiagnosticData } from "../hooks/useDiagnostics";

interface DiagnosticsChartProps {
  data: DiagnosticData | null;
}

export const DiagnosticsChart: React.FC<DiagnosticsChartProps> = ({ data }) => {
  const [history, setHistory] = useState<DiagnosticData[]>([]);

  useEffect(() => {
    if (data) {
      setHistory((prev) => {
        const updated = [...prev, data];
        return updated.length > 30
          ? updated.slice(updated.length - 30)
          : updated;
      });
    }
  }, [data]);

  const average = (key: keyof DiagnosticData) => {
    if (history.length === 0) return 0;
    const sum = history.reduce(
      (acc, entry) => acc + parseFloat(entry[key] as string),
      0
    );
    return (sum / history.length).toFixed(1);
  };

  return (
    <div style={{ width: "100%", marginTop: "40px" }}>
      <div style={{ height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="cpu"
              stroke="#8884d8"
              name="CPU (%)"
            />
            <Line
              type="monotone"
              dataKey="battery"
              stroke="#82ca9d"
              name="Battery (%)"
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#ff7300"
              name="Temp (°C)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          marginTop: "20px",
          fontSize: "1rem",
          color: "#ffffff",
          paddingBottom: "40px",
        }}
      >
        <p>
          <strong style={{ color: "#ffcc00" }}>Avg CPU Load:</strong>{" "}
          {average("cpu")} %
        </p>
        <p>
          <strong style={{ color: "#ffcc00" }}>Avg Battery:</strong>{" "}
          {average("battery")} %
        </p>
        <p>
          <strong style={{ color: "#ffcc00" }}>Avg Temperature:</strong>{" "}
          {average("temperature")} °C
        </p>
      </div>
    </div>
  );
};
