# Deployment Guide for Startup Perkins

This guide covers how to deploy the full stack application:
- **Frontend**: Next.js (Vercel)
- **Backend**: Node.js/Express (Render/Railway)
- **Database**: MongoDB Atlas

---

## 1. Database Setup (MongoDB Atlas)

*You likely already have this, but for production:*
1.  Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a new Cluster (Free Tier is fine).
3.  In "Database Access", create a production user (strong password).
4.  In "Network Access", allow access from anywhere (`0.0.0.0/0`) or specific IPs of your hosting provider.
5.  Get the Connection String: `mongodb+srv://<user>:<password>@cluster0.mongodb.net/startup-perks-prod`.

---

## 2. Backend Deployment (Render.com)

We recommend [Render](https://render.com) for the Node.js backend as it has a generous free tier.

1.  Push your code to GitHub (already done).
2.  Log in to Render and click **"New +" -> "Web Service"**.
3.  Connect your GitHub repository.
4.  **Settings**:
    -   **Root Directory**: `.` (leave empty or use `./` if asked, the server is in the root).
    -   **Build Command**: `npm install` (Installs backend dependencies).
    -   **Start Command**: `node server.js`.
5.  **Environment Variables**:
    -   Add `MONGO_URI`: Your production MongoDB connection string.
    -   Add `JWT_SECRET`: A long, random string (e.g., generated with `openssl rand -base64 32`).
    -   Add `PORT`: `10000` (Render usually sets this automatically, but good to ensure).
6.  Click **Create Web Service**.
7.  **Copy the URL**: Once deployed, Render will give you a URL like `https://startup-perks-api.onrender.com`. **Save this.**

---

## 3. Frontend Deployment (Vercel)

Vercel is the creators of Next.js and the best place to host it.

1.  Log in to [Vercel](https://vercel.com).
2.  Click **"Add New..." -> "Project"**.
3.  Import your GitHub repository.
4.  **Configure Project**:
    -   **Framework Preset**: Next.js (Auto-detected).
    -   **Root Directory**: Click "Edit" and select `frontend`. **(Important! The Next.js app is in the `frontend` folder).**
5.  **Environment Variables**:
    -   You need to point the frontend to your *production* backend URL, not localhost.
    -   In your frontend code (`app/deals/page.tsx`, `app/dashboard/page.tsx`, etc.), you likely have hardcoded `http://localhost:5000`.
    -   **Action Item**: Before deploying, update your frontend code to use an environment variable:
        1.  Create `frontend/.env.local` (local) and set `NEXT_PUBLIC_API_URL=http://localhost:5000`.
        2.  Replace all instances of `'http://localhost:5000'` with `process.env.NEXT_PUBLIC_API_URL` in your code.
        3.  Push these changes to GitHub.
    -   **In Vercel Dashboard**: Add `NEXT_PUBLIC_API_URL` = `https://startup-perks-api.onrender.com` (Your Render Backend URL).
6.  Click **Deploy**.

---

## 4. Final Integration Check

1.  Open your Vercel App URL.
2.  Try to **Register** a new user.
3.  If it fails, check:
    -   Did you update the API URL in the frontend code?
    -   Is the Backend running on Render?
    -   Are the Environment Variables set correctly on both Vercel and Render?
4.  If it works, congratulations! Your app is live.

---

## 5. Domain Configuration (Optional)

-   **Vercel**: Go to Settings -> Domains to add `yourstartup.com`.
-   **Render**: Go to Settings -> Custom Domains (Note: Backend usually doesn't need a custom domain if only consumed by the frontend).
