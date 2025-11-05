import React, { useState } from "react";
import { io } from "socket.io-client";

// singleton socket for this module (used only to broadcast search term quickly)
let socketInstance = null;
function getSocket() {
  if (!socketInstance) socketInstance = io({ path: "/socket.io" });
  return socketInstance;
}

export default function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    onSearch(q);
    // also broadcast the term
    try { getSocket().emit("search_term", q); } catch {}
  };

  return (
    <form onSubmit={handleSubmit} className="searchbar">
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
