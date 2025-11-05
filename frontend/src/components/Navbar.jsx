import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ stats }) {
  return (
    <nav className="navbar">
      <h2>📚 Book Finder (Realtime)</h2>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="stats">
        👥 {stats.onlineUsers || 0} · 🔎 {Array.isArray(stats.lastSearchTerms) ? stats.lastSearchTerms.slice(0,3).join(" | ") : ""}
      </div>
    </nav>
  );
}
