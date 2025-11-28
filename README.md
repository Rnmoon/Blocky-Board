# ⛏️ VoxelBoard: Real-Time Collaborative Whiteboard

![Project Banner]([https://via.placeholder.com/1000x400?text=Insert+Your+Demo+GIF+Here](https://drive.google.com/file/d/1LBrQvm0PWQHfpY0XLNduvNRVS1BlCSKp/view?usp=sharing))

> **A high-performance, WebSocket-powered drawing engine wrapped in a nostalgic Minecraft-inspired UI.**

[![Live Demo](https://img.shields.io/badge/🟢_Live_Demo-Click_Here-success?style=for-the-badge)](INSERT_YOUR_VERCEL_LINK_HERE)

## 📖 About The Project

I built VoxelBoard to challenge myself in **System Design** and **State Management**.

Most whiteboard apps are standard tutorials. I wanted to build something production-grade that handles **concurrency** (multiple users drawing at once) without lagging, while adhering to a strict "Voxel/8-bit" design system using advanced CSS.

**Key Technical Achievement:**
I implemented a **Dual-Layer Canvas System**. The bottom layer handles persistent pixel data, while the top layer handles transient data (like other users' moving cursors). This prevents the engine from re-rendering the entire drawing history every time a user moves their mouse 1 pixel, significantly boosting performance.

## 🚀 Key Features

* **⚡ Real-Time Latency:** Powered by **Socket.io** (v4) for instant stroke broadcasting.
* **🎮 Multiplayer Presence:** See other users' cursors (customized as Pickaxes) moving in real-time.
* **🧱 Voxel UI Engine:** A custom-built UI using **Tailwind CSS** to simulate "Hard Shadows" and 0px borders without using image assets.
* **💡 Redstone Glow Mode:** A custom canvas brush that uses `shadowBlur` to create a neon/glow effect.
* **🎒 Inventory System:** A "Stamp" tool allowing users to place pixel-art assets (TNT, Hearts) onto the canvas.
* **📸 Snapshot:** Export your creation instantly as a high-res PNG.

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, TypeScript, HTML5 Canvas API |
| **Styling** | Tailwind CSS (Custom Config for Voxel aesthetic) |
| **Backend** | Node.js, Express, Socket.io |
| **DevOps** | Vercel (Frontend), Render (Backend Service) |

## 🧠 Under the Hood: Engineering Challenges

### 1. The "Race Condition"
**Problem:** If User A and User B draw at the exact same millisecond, standard state updates cause flickering.
**Solution:** I bypassed React's `useState` for the drawing logic. Instead, I utilized `useRef` to directly manipulate the DOM and the Canvas Context. This ensures the drawing loop runs independently of the React Render Cycle.

### 2. Network Throttling
**Problem:** Sending coordinates on every `mousemove` event flooded the server with thousands of requests per second.
**Solution:** Implemented a **Throttle function** on the socket emission. Updates are batched and sent every 30ms, creating a smooth visual experience while reducing server load by ~80%.

## 🔧 Installation & Setup

1. **Clone the repo**
   ```sh
   git clone [https://github.com/yourusername/voxelboard.git](https://github.com/yourusername/voxelboard.git)
   Install Server Dependencies

Bash

cd server
npm install
Install Client Dependencies

Bash

cd client
npm install
Environment Variables Create a .env file in the client folder:

Code snippet

VITE_API_URL=http://localhost:5173
Run Locally

Bash

# Terminal 1 (Server)
cd server
npm run start

# Terminal 2 (Client)
cd client
npm run dev
🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

👤 Author
Aryan Moon

LinkedIn: https://linkedin.com/in/aryan-moon
