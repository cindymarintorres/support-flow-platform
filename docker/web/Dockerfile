# Dockerfile — Frontend (React + Vite)
# docker/web/Dockerfile
FROM cemarin/react-vite-base:20-alpine

WORKDIR /app

# Copiamos shared primero, paquetes compartidos de schemas
COPY shared/ /shared/
RUN cd /shared && npm install

COPY web/package*.json ./

RUN npm install --legacy-peer-deps

COPY web/ .

EXPOSE 3001

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
