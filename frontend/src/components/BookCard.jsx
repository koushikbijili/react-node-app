import React from "react";

export default function BookCard({ book, onFav }) {
  return (
    <div className="book-card">
      <img
        src={
          book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://via.placeholder.com/100x150?text=No+Cover"
        }
        alt={book.title}
      />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.first_publish_year}</p>
      <button onClick={() => onFav(book)}>❤️ Add Favorite</button>
    </div>
  );
}
