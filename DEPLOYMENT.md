# 🚀 Deployment Guide for LearnHub

This guide details the step-by-step process of deploying the full-stack LearnHub application to the web for free using MongoDB Atlas, Render, and Vercel.

---

## 1. Cloud Database Setup (MongoDB Atlas)

Since the local MongoDB database is only accessible on your computer, you need a cloud database for the online website.

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up or log in.
2. Click **Create** to set up a new cluster:
   - Select the **M0 (Free)** tier.
   - Choose a cloud provider and region close to you (e.g., AWS / N. Virginia or Mumbai).
   - Click **Create Deployment**.
3. Under **Security Quickstart**:
   - Create a database user (username and a secure password). **Save these credentials!**
   - Under "Where would you like to connect from?", choose **My Local Environment** and add `0.0.0.0/0` to the IP Access List (this allows Render to connect to your database).
4. Once the cluster is deployed, click **Connect**:
   - Select **Drivers** (Node.js).
   - Copy the connection string. It will look like this:
     ```text
     mongodb+srv://<username>:<password>@cluster0.xxxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     ```
   - Replace `<username>` and `<password>` with the credentials you created. Save this connection string for the backend deployment.

---

## 2. Deploying the Backend (Render)

1. Go to [Render](https://render.com/) and sign up or log in.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub account and select your **LEARN-HUB** repository.
4. Set the following configuration:
   - **Name:** `learnhub-backend` (or similar)
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`
5. Click **Advanced** and add the following **Environment Variables**:
   - `PORT` = `10000`
   - `MONGO_URI` = `your_mongodb_atlas_connection_string` (from Step 1)
   - `JWT_SECRET` = `choose_a_secure_random_string` (e.g., `learnhub_super_secret_jwt_key_2026`)
6. Click **Create Web Service**.
7. Once the deployment finishes, copy the URL of your deployed backend service (e.g., `https://learnhub-backend.onrender.com`).

---

## 3. Deploying the Frontend (Vercel)

1. Go to [Vercel](https://vercel.com/) and sign up or log in.
2. Click **Add New** and select **Project**.
3. Import your **LEARN-HUB** repository.
4. Configure the project:
   - **Framework Preset:** Select **Vite** (it should detect this automatically).
   - **Root Directory:** Click **Edit** next to it and select the `client` directory.
5. Expand the **Environment Variables** section and add:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://learnhub-backend.onrender.com` (use the backend URL copied from Render in Step 2)
6. Click **Deploy**.
7. Once finished, Vercel will give you a live website link (e.g., `https://learn-hub-five.vercel.app`).

---

## 4. Linking the Website to your GitHub Repository

To showcase the live site on your GitHub profile and repository homepage:

1. Open your repository on GitHub: `https://github.com/sathvikov/LEARN-HUB`
2. On the right-hand sidebar, next to **About**, click the **Gear icon (settings)**.
3. In the **Website** field, paste your Vercel deployment link (e.g., `https://learn-hub-five.vercel.app`).
4. (Optional) Check the boxes for "Release", "Packages", and "Environments" if you'd like.
5. Click **Save changes**.

Your repository will now display the website link beautifully right on its homepage!
