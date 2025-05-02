import { useEffect, useState } from "react";

export interface DiagnosticData {
  temperature: string;
  battery: string;
  cpu: string;
  timestamp: string;
}

export const useDiagnostics = () => {
  const [data, setData] = useState<DiagnosticData | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");

    socket.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      setData(parsed);
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      socket.close();
    };
  }, []);

  return data;
};
