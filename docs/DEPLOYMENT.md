## Backend Deployment (Render)

- Overview: Deploy the Express backend in `backend` to Render using a Blueprint.

- Prerequisites: A MongoDB connection string and your frontend URL.

- Files:
	- [render.yaml](render.yaml): Render blueprint pointing to `backend`.
	- [backend/.env.example](backend/.env.example): Copy to `.env` and fill values.

- Steps:
	1. Push the repo to GitHub (public or private).
	2. In Render, click New → Blueprint and select the repo.
	3. Set environment variables:
		 - `MONGODB_URI`: your MongoDB URI.
		 - `FRONTEND_URL`: your frontend domain (for CORS).
	4. Deploy. Health check: `/api/health`.

- Note: `render.yaml` uses `rootDir: backend` and commands `npm install` / `node server.js`.

## Backend Deployment (Docker/Railway)

- Files:
	- [backend/Dockerfile](backend/Dockerfile): Container image for the Express app.

- Steps (Railway example):
	1. Create a new service from repo; select Dockerfile in `backend`.
	2. Add environment variables `MONGODB_URI`, `FRONTEND_URL`.
	3. Deploy; expose port `3000`.

## Frontend Deployment (Vercel)

- Use [vercel.json](vercel.json) at repo root.
- Ensure project links and scope are set; builds run in `frontend`.

