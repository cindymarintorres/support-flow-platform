# Dockerfile — Backend (NestJS)
# docker/api/Dockerfile
FROM cemarin/nest-base:20-alpine

RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY api/package*.json ./
COPY api/prisma ./prisma/

RUN npm install --legacy-peer-deps

COPY api/ .

# Generación de Prisma movida al flujo de ejecución posterior para soportar variables de entorno dinámicas.

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
