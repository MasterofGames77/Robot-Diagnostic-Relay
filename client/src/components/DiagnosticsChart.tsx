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

  return (
    <div style={{ width: "100%", height: 300, marginTop: "40px" }}>
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
          <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU (%)" />
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
  );
};
