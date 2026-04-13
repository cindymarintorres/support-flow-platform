# 🎯 SupportFlow Platform

**Plataforma moderna de gestión de soporte técnico** inspirada en herramientas empresariales como ServiceNow y Jira Service Management.

<!-- Proyecto de portafolio diseñado para demostrar prácticas reales de ingeniería de software: arquitectura modular, diseño orientado a eventos, procesamiento asíncrono con colas, comunicación en tiempo real e infraestructura containerizada. -->

---

## 🧠 Por qué este stack

Cada decisión tecnológica tiene una razón de ser concreta dentro del dominio del problema.

| Tecnología         | Rol en el sistema           | Justificación                                                                                                                              |
| ------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **NestJS**         | Framework del API backend   | Arquitectura modular basada en módulos, decoradores y DI nativa. Refleja patrones de sistemas enterprise reales.                           |
| **PostgreSQL**     | Base de datos principal     | ACID compliance crítico para tickets de soporte. Soporte a relaciones complejas y transacciones.                                           |
| **Prisma ORM**     | Capa de acceso a datos      | Type-safety end-to-end, migraciones versionadas, schema como fuente de verdad.                                                             |
| **Redis**          | Caché + broker de colas     | Doble rol: reducción de carga a la DB en lecturas frecuentes y almacenamiento de jobs para BullMQ.                                         |
| **BullMQ**         | Sistema de colas            | Procesamiento asíncrono desacoplado de la request HTTP. Esencial para notificaciones, emails y eventos de dominio sin bloquear al cliente. |
| **Socket.io**      | Comunicación en tiempo real | Actualizaciones de estado de tickets y comentarios sin polling. Arquitectura push desde el servidor.                                       |
| **React + Vite**   | Frontend SPA                | Vite sobre CRA/Next por velocidad de build y simplicidad. Sin SSR innecesario para este dominio interno.                                   |
| **TailwindCSS**    | Estilos                     | Utility-first para mantener consistencia visual sin overhead de CSS custom.                                                                |
| **Docker Compose** | Orquestación local          | Entorno reproducible. Elimina el "funciona en mi máquina". Simula topología de producción.                                                 |
| **Mailpit**        | Testing de emails           | Servidor SMTP local con UI. Permite verificar el flujo BullMQ → Worker → Email sin servicios externos.                                     |
| **MockServer**     | Simulación de APIs externas | Desacopla el desarrollo de integraciones reales. Permite inyectar respuestas controladas.                                                  |

---

## 📦 Paquete compartido (`shared/`)

El proyecto incluye un paquete npm local `@support-flow/shared` que actúa como **única fuente de verdad** para schemas y tipos compartidos entre el backend y el frontend.

### ¿Por qué existe?

`api/` y `web/` necesitan validar los mismos datos — pero en momentos distintos y con responsabilidades distintas:

- **React** valida lo que el usuario escribe en el formulario, antes de enviar el request. Es para mostrar errores en pantalla.
- **NestJS** valida el body del HTTP request cuando llega al servidor, sin importar el origen. Es la última línea de defensa.

Sin un paquete compartido, las reglas de validación (longitud mínima de campos, formato de email, roles válidos) se duplican manualmente en ambos lados y pueden desincronizarse.

### ¿Qué contiene?

```
shared/src/schemas/
  user-role.schema.ts   # UserRoleSchema, USER_ROLES, UserRole type
  user.schema.ts        # BaseUserSchema, BaseUpdateUserSchema, UserEntitySchema
  auth.schema.ts        # LoginSchema, ForgotPasswordSchema, ResetPasswordSchema
```

### ¿Cómo se usa?

Cada lado importa los schemas base y los extiende según sus necesidades:

```typescript
// NestJS — omite email del update, tiene su propio endpoint para eso
import { BaseUpdateUserSchema } from "@support-flow/shared";
export const UpdateUserSchema = BaseUpdateUserSchema.omit({ email: true });

// React — agrega mensajes de UX y omite token (viene por URL, no del form)
import { ResetPasswordSchema } from "@support-flow/shared";
export const ResetPasswordFormSchema = ResetPasswordSchema.omit({
  token: true,
});
```

### Resolución en Docker

El shared se monta como volumen en ambos contenedores y se copia durante el build:

```
/shared   ← disponible en api y web como ../shared
```

Esto permite hot-reload del shared durante desarrollo — un cambio en `shared/` se refleja sin reconstruir los contenedores.

---

## 🗂️ Estructura del proyecto

```
supportflow/
├── shared/                     # Paquete npm local compartido
│   ├── package.json            # name: @support-flow/shared
│   └── src/
│       ├── index.ts
│       └── schemas/            # Schemas Zod base (sin mensajes de UX)
│           ├── user-role.schema.ts
│           ├── user.schema.ts
│           └── auth.schema.ts
│
├── api/                        # Backend NestJS
│   ├── src/
│   │   ├── modules/            # Módulos de dominio (tickets, users, auth, …)
│   │   ├── common/             # Guards, interceptors, pipes, decorators compartidos
│   │   ├── config/             # Configuración por ambiente
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma       # Fuente de verdad del modelo de datos
│   └── └── migrations/
│
├── web/                        # Frontend React
│   ├── src/
│   │   ├── features/           # Módulos de UI por dominio
│   │   ├── components/         # Componentes compartidos
│   │   ├── hooks/              # Custom hooks (React Query, WebSocket)
│   └── └── main.tsx
│
├── docker/                     # Configuraciones adicionales de contenedores
│   ├── api/                    # Dockerfile del API
│   ├── web/                    # Dockerfile del Frontend
│   └── postgres/               # Dockerfile de PostgreSQL
│       └── init.sql            # Setup inicial de la DB (si aplica)
│
├── mockserver/                 # Definición de expectativas para MockServer
│   └── expectations/
│
├── scripts/                    # Utilidades de desarrollo
│   └── seed.ts                 # Seed de datos iniciales (usuarios, categorías)
│
├── .env.example                # Plantilla de variables de entorno
├── docker-compose.yml          # Orquestación de todos los servicios
└── README.md
```

> **Nota sobre la estructura de módulos:** tanto `api/src/modules/` como `web/src/features/` siguen una organización **por dominio**, no por tipo de archivo. Esto refleja una arquitectura orientada al negocio y facilita la navegación en proyectos que escalan.

---

## ✅ Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (incluye Docker Compose v2)
- Node.js 20+ — solo necesario si deseas correr servicios fuera de Docker

Verificar instalaciones:

```bash
docker --version        # Docker version 24+
docker compose version  # Docker Compose version v2+
node --version          # v20+
```

---

## 🚀 Levantar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/cindymarintorres/support-flow-platform.git
cd support-flow-platform
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

El archivo `.env.example` contiene todos los valores necesarios para desarrollo local. En producción, estas variables se inyectan desde el sistema de secretos del proveedor de nube.

### 3. Levantar la infraestructura completa

```bash
docker compose up --build
```

Este comando:

1. Construye las imágenes de `api` y `web`
2. Levanta PostgreSQL, Redis, Mailpit y MockServer
3. Ejecuta las migraciones de Prisma automáticamente
4. Inicia el API y el frontend

> En la primera ejecución, Docker descargará las imágenes base. Las ejecuciones posteriores usan caché y son significativamente más rápidas.

### 4. Cargar datos iniciales (seed)

```bash
docker compose exec api npx ts-node scripts/seed.ts
```

El seed crea usuarios de prueba y categorías base. La gestión de usuarios en el MVP es exclusivamente a través de seed — no existe UI de administración de usuarios en esta fase.

---

## 🔍 Verificar que todo funciona

Una vez levantado el stack, verifica cada servicio:

### Servicios expuestos

| Servicio       | URL                                        | Qué verificar                          |
| -------------- | ------------------------------------------ | -------------------------------------- |
| **Frontend**   | http://localhost:3001                      | Pantalla de login de SupportFlow       |
| **API REST**   | http://localhost:3000/api                  | Health check del backend               |
| **API Docs**   | http://localhost:3000/api/docs             | Swagger UI con todos los endpoints     |
| **Mailpit UI** | http://localhost:3004                      | Bandeja de entrada de emails de prueba |
| **MockServer** | http://localhost:1080/mockserver/dashboard | Estado de las expectativas definidas   |

### Health check del API

```bash
curl http://localhost:3000/api/health
# Respuesta esperada: {"status":"ok","timestamp":"..."}
```

### Verificar flujo de emails (BullMQ → Mailpit)

1. Crear un ticket desde el frontend o via API
2. Abrir http://localhost:3004
3. Verificar que llegó el email de notificación

Este flujo demuestra la integración completa: **HTTP request → job encolado en Redis → Worker procesa → SMTP a Mailpit**.

### Verificar WebSockets

1. Abrir dos pestañas del frontend con sesiones distintas
2. Cambiar el estado de un ticket en una pestaña
3. Verificar que la otra pestaña se actualiza sin recargar

---

## 🐳 Arquitectura de red (Docker)

Los servicios se comunican a través de una red interna de Docker (`sf_network`). Desde dentro de los contenedores, los servicios se referencian por **nombre de servicio**, no por `localhost`:

```
api → postgres:5432      (NO localhost:5432)
api → redis:6379         (NO localhost:6379)
api → mailpit:1025       (SMTP interno)
```

Los puertos expuestos en `localhost` son exclusivamente para acceso del desarrollador desde el host (browser, curl, clientes SQL).

---

## 🛠️ Comandos útiles durante desarrollo

```bash
# Ver logs de un servicio específico
docker compose logs -f api

# Ejecutar migraciones manualmente
docker compose exec api npx prisma migrate dev

# Abrir Prisma Studio (explorador visual de la DB)
docker compose exec api npx prisma studio

# Reiniciar solo el backend sin reconstruir
docker compose restart api

# Detener todo y limpiar volúmenes
docker compose down -v
```

---

## 🗺️ Modelo de dominio (resumen)

```
User ──────────┐
               ▼
Category ──► Ticket ──► TicketComment
               │
               └──► (asignado a) User (agente)
```

Los tickets transitan por estados definidos: `OPEN → IN_PROGRESS → RESOLVED → CLOSED`. Cada transición puede disparar eventos de dominio que alimentan las colas de BullMQ.

---

## 📋 Estado del proyecto

Este proyecto está en desarrollo activo como parte de un portafolio de ingeniería de software. La arquitectura, decisiones de diseño y progreso de implementación están documentados en el historial de commits.
