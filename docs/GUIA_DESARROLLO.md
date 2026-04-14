# 🧠 Guía de Trabajo: Soporte Flow (Docker + Local)

Este documento es tu **hoja de trucos (cheatsheet)** para el flujo de trabajo diario en este proyecto. Dado que estamos usando contenedores mezclados con librerías personalizadas (`shared`), sigue estos pasos según lo que necesites hacer.

---

## 1. Modificar código en `@support-flow/shared`

Dado que `shared` es una "Librería Real", cambiar código en `shared/src` localmente no impactará mágicamente a los contenedores ni a tu entorno local hasta que se compile.

**Pasos:**
1. Haz tus cambios en `shared/src/...` (ej. nuevos schemas, alertas, tipos).
2. **Para que lo tome Docker:** 
   Simplemente reinicia el contenedor que depende de ello. 
   ```bash
   docker compose restart api
   docker compose restart web
   ```
   *(Al reiniciar, el contenedor automáticamente compila tu nuevo código dentro de Docker).*
3. **Para que lo tome tu VS Code (Local):**
   Debes compilar los tipos físicos en tu computadora para que tu editor sepa que existen.
   Haciendo esto actualizarás tu `shared/dist` local.
   ```bash
   # Si NO tienes NPM local instalado:
   docker run --rm -v $(pwd)/shared:/shared -w /shared node:20-alpine npm run build

   # Si SÍ tienes NPM en tu terminal nativa:
   cd shared && npm run build
   ```

---

## 2. Instalar Nuevas Librerías (NPM Install)

Cuando agregas una nueva dependencia en `package.json` o necesitas instalar algo nuevo.

**Pasos:**
1. Agrega el paquete en los `package.json` correspondientes.
2. **Para que lo tome Docker (Contenedores):** 
   Debes reconstruir tu imagen y forzar que ignore los volúmenes en caché.
   ```bash
   docker compose up -d --build --renew-anon-volumes
   ```
3. **Para que lo tome tu VS Code (Local):**
   Para que tu editor reciba autocompletado y desaparezcan las rayas rojas (`ts(2307)`), tu disco físico necesita descargar esos módulos.
   ```bash
   # Si NO tienes NPM nativo en tu computadora
   # (Reemplaza "api" por "web" según el entorno que estés instalando)
   docker run --rm -v $(pwd)/api:/app -v $(pwd)/shared:/shared -w /app node:20-alpine npm install
   
   # Si SÍ tienes NPM en tu terminal nativa:
   cd api && npm install
   ```

---

## 3. Flujo de Trabajo con Prisma (Base de Datos)

El servidor de base de datos vive dentro de Docker. Por ende, los comandos de Prisma cambian estructuralmente.

### A) Cuando modificas el `schema.prisma`
Si agregas una tabla o cambias relaciones en `api/prisma/schema.prisma` localmente.

**Para empujar a la BD en Docker:**
```bash
docker compose exec api npx prisma db push
```

**Para que tu VS Code (Local) reconozca los nuevos tipos en TypeScript:**
Debes generar el cliente físico en el disco de tu host.
```bash
# Si NO tienes NPM nativo en tu host:
docker run --rm -v $(pwd)/api:/app -w /app node:20-alpine npx prisma generate

# Si SÍ tienes NPM en tu host:
cd api && npx prisma generate
```

### B) Borrado o recreación total de DB de desarrollo
Si cambiaste de rama y tu Base de Datos en Docker está corrupta, reiníciala y repóblala:
```bash
docker compose exec api npx prisma db push --force-reset
docker compose exec api npx prisma db seed
```

### C) Prisma Studio
Para visualizar la base de datos de manera limpia, siempre córrelo atado a los binarios del contenedor:
```bash
docker compose exec api npx prisma studio
```
(Se abrirá en `http://localhost:5555`)
