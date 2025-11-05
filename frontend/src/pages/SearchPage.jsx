import React, { useState } from "react";
import Search from "../components/Search";
import BookCard from "../components/BookCard";

export default function SearchPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`/api/books/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`Search failed (${res.status})`);
      const data = await res.json();
      setBooks(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const addToFav = async (book) => {
    try {
      await fetch("/api/books/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
      alert("Added to favorites!");
    } catch (e) {
      alert("Failed to add favorite");
    }
  };

  return (
    <div>
      <h1>Search Books</h1>
      <Search onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <div className="grid">
        {books.map((b) => (
          <BookCard key={b.key} book={b} onFav={addToFav} />
        ))}
      </div>
    </div>
  );
}
