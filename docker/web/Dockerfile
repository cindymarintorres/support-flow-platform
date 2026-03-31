# Dockerfile — Frontend (React + Vite)
# docker/web/Dockerfile
FROM cemarin/react-vite-base:20-alpine

WORKDIR /app

COPY web/package*.json ./

RUN npm install

COPY web/ .

EXPOSE 3001

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
