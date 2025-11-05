import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import SearchPage from "./pages/SearchPage";
import Favorites from "./pages/Favorites";
import { io } from "socket.io-client";

export default function App() {
  const [stats, setStats] = useState({ onlineUsers: 0, lastSearchTerms: [] });

  useEffect(() => {
    // connect via vite proxy
    const socket = io({ path: "/socket.io" });
    socket.on("stats", (payload) => setStats(payload));
    return () => socket.close();
  }, []);

  return (
    <>
      <Navbar stats={stats} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </>
  );
}
