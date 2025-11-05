import express from "express";
import fetch from "node-fetch";

const router = express.Router();

let favorites = [];
let ioRef = null;
export function setIo(io) { ioRef = io; }

// helper to emit search terms to all clients
function broadcastSearch(term) {
  if (ioRef && typeof term === "string" && term.trim()) {
    ioRef.emit("stats_search", { term: term.trim(), ts: Date.now() });
  }
}

// GET /api/books/search?q=harry
router.get("/search", async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.status(400).json({ error: "Missing query" });
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=12`;
    const r = await fetch(url, { headers: { "User-Agent": "book-finder-realtime/1.0" } });
    if (!r.ok) return res.status(r.status).json({ error: "OpenLibrary error" });
    const data = await r.json();
    const docs = (data.docs || []).map(b => ({
      key: b.key,
      title: b.title,
      author: Array.isArray(b.author_name) ? b.author_name.join(", ") : b.author_name,
      first_publish_year: b.first_publish_year,
      cover_i: b.cover_i
    }));
    broadcastSearch(q);
    return res.json(docs);
  } catch (e) {
    return res.status(500).json({ error: e.message || "Server error" });
  }
});

// favorites (in-memory for demo)
router.get("/favorites", (req, res) => res.json(favorites));

router.post("/favorites", (req, res) => {
  const { key, title } = req.body || {};
  if (!key || !title) return res.status(400).json({ error: "Missing data" });
  if (favorites.some(f => f.key === key)) return res.status(400).json({ error: "Already exists" });
  favorites.push(req.body);
  return res.json({ success: true, favorites });
});

router.delete("/favorites/:key", (req, res) => {
  const { key } = req.params;
  favorites = favorites.filter(f => f.key !== key);
  return res.json({ success: true, favorites });
});

export default router;
