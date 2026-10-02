# 1. Base Image le rahe hain (Linux + Node.js 20)
FROM node:20-alpine

# 2. Container ke andar /app folder bana rahe hain
WORKDIR /app

# 3. Pehle package.json copy kar rahe hain (Caching ke liye)
COPY package*.json ./

# 4. Dependencies install kar rahe hain
RUN npm install

# 5. Baaki saara backend code copy kar rahe hain
COPY . .

# 6. Document kar rahe hain ki backend port 5000 pe sunega
EXPOSE 5000

# 7. Backend ko start karne ki command
CMD ["node", "server.js"]