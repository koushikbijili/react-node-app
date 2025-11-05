import React from "react";

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <p>
        Full-stack demo: React + Vite frontend, Express + Socket.IO backend.
        Frontend connects to backend through a Vite proxy so you can switch to
        your EC2 IP later without code changes.
      </p>
    </div>
  );
}
