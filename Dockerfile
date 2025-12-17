FROM node:18-alpine

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++

WORKDIR /src

# Copy package files first for better caching
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install root dependencies
RUN npm install

# Install backend dependencies (including devDependencies for babel)
WORKDIR /src/backend
RUN npm install
# Add missing @babel/runtime
RUN npm install @babel/runtime

# Install frontend dependencies
WORKDIR /src/frontend
RUN npm install

# Copy the rest of the source code
WORKDIR /src
COPY . .

# Fix for OpenSSL 3.0 compatibility with older webpack
ENV NODE_OPTIONS=--openssl-legacy-provider

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
