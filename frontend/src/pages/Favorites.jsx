import React, { useEffect, useState } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/api/books/favorites")
      .then((res) => res.json())
      .then(setFavorites);
  }, []);

  const remove = async (key) => {
    await fetch(`/api/books/favorites/${encodeURIComponent(key)}`, { method: "DELETE" });
    setFavorites((prev) => prev.filter((f) => f.key !== key));
  };

  return (
    <div>
      <h1>Favorites ❤️</h1>
      <div className="grid">
        {favorites.map((b) => (
          <div key={b.key} className="book-card">
            <h3>{b.title}</h3>
            <button onClick={() => remove(b.key)}>❌ Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
