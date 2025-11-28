# Deployment Guide

## 1. Deploying the Client (Frontend) to Vercel

1.  Push your code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com) and "Add New Project".
3.  Import your repository.
4.  **Build Settings**:
    *   Framework Preset: `Vite`
    *   Root Directory: `client` (Important! Your frontend is in the `client` folder)
5.  **Environment Variables**:
    *   Add `VITE_SERVER_URL` and set it to your deployed server URL (see below).
    *   *Note: For the first deployment, you can leave this blank or set it to `http://localhost:3001` temporarily, but the app won't connect to the backend until you update it.*
6.  Click **Deploy**.

## 2. Deploying the Server (Backend) to Render

Since Vercel Serverless Functions don't support persistent WebSockets, we'll use Render (or Railway).

1.  Go to [Render](https://render.com) and create a "New Web Service".
2.  Connect your GitHub repository.
3.  **Settings**:
    *   **Root Directory**: `server`
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm start`
4.  Click **Create Web Service**.
5.  Once deployed, copy the **Service URL** (e.g., `https://your-app.onrender.com`).

## 3. Connecting Them

1.  Go back to your **Vercel Project Settings** -> **Environment Variables**.
2.  Add/Edit `VITE_SERVER_URL` with your Render Service URL (e.g., `https://your-app.onrender.com`).
3.  **Redeploy** your Vercel project (Go to Deployments -> Redeploy) for the changes to take effect.
