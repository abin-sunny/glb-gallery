# 3D Model Gallery

A full-stack web application for uploading, previewing, and managing 3D `.glb` models with real-time thumbnails and metadata storage. Built with **Next.js 15**, **Three.js**, **MongoDB**, and **TailwindCSS**.

## ✨ Features

- 🧱 Upload and store `.glb` models in MongoDB (as binary Blob)
- 🖼️ Generate and save thumbnails server-side using Three.js
- 📂 View models in an interactive gallery
- 🔍 View model metadata (e.g., size, upload date, etc.)
- 🗑️ Delete models with real-time feedback using `startTransition`
- 🌓 Light/dark mode support (ShadCN UI)
- 📦 Download `.glb` model files
- 🛡️ Uses REST APIs and server-side rendering for performance

---

---

## 🛠️ Tech Stack

| Category       | Technology     |
|----------------|----------------|
| Frontend       | Next.js 15, React, TypeScript |
| 3D Rendering   | Three.js, GLTFLoader, Canvas/WebGL |
| Backend        | Node.js, API Routes, Mongoose |
| Database       | MongoDB (Binary file storage in GridFS or Buffer) |
| Styling        | TailwindCSS, ShadCN UI, Lucide Icons |

