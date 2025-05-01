const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  const sendDiagnostics = setInterval(() => {
    const diagnostics = {
      temperature: (20 + Math.random() * 10).toFixed(1), // °C
      battery: (50 + Math.random() * 50).toFixed(0),     // %
      cpu: (10 + Math.random() * 70).toFixed(0),         // %
      timestamp: new Date().toISOString()
    };

    ws.send(JSON.stringify(diagnostics));
  }, 1000); // Send every second

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(sendDiagnostics);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});