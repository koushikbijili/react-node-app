# Book Finder Realtime (React + Vite + Express + Socket.IO)

## Run locally

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Open
- Frontend: http://52.66.16.153:3000
- Backend:  http://52.66.16.153:5000

Vite proxy forwards `/api/*` and `/socket.io` to backend, so the frontend code uses relative paths and websocket just works.

## Deploying to EC2 (quick notes)
- Run backend on port 5000 (PM2 recommended).
- Build frontend (`npm run build`) then serve static build via nginx or Vite preview.
- Update Vite proxy or set frontend to call `http://YOUR_EC2:5000` in production if not using a reverse proxy.
