# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy application code
COPY . .

RUN npm run prisma:p
RUN npm run build

# Expose port
EXPOSE 4003

# Start application
CMD ["npm", "run", "dev"]
