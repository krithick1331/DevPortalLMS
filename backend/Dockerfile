# Lightweight Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies first
COPY package.json package-lock.json* ./
RUN npm install --omit=dev || npm install --omit=dev

# Copy application source
COPY . .

# Environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
