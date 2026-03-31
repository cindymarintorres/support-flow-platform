# Dockerfile — Backend (NestJS)
# docker/api/Dockerfile
FROM cemarin/nest-base:20-alpine

RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY api/package*.json ./
COPY api/prisma ./prisma/

RUN npm install --legacy-peer-deps

COPY api/ .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
