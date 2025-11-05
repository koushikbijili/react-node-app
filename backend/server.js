import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import booksRouter, { setIo } from "./routes/books.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: { origin: "*" }
});

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// give router access to io
setIo(io);

// realtime stats
let onlineUsers = 0;
let lastSearchTerms = [];

io.on("connection", (socket) => {
  onlineUsers++;
  io.emit("stats", { onlineUsers, lastSearchTerms });

  socket.on("search_term", (term) => {
    if (typeof term === "string" && term.trim()) {
      lastSearchTerms = [term.trim(), ...lastSearchTerms].slice(0, 10);
      io.emit("stats", { onlineUsers, lastSearchTerms });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = Math.max(0, onlineUsers - 1);
    io.emit("stats", { onlineUsers, lastSearchTerms });
  });
});

// routes
app.get("/api/health", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));
app.use("/api/books", booksRouter);

// ports
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Backend running on http:/52.66.16.153:${PORT}`);
});

