import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Admin1234!', 10);
  const agentPassword = await bcrypt.hash('Agent1234!', 10);
  const requesterPassword = await bcrypt.hash('Requester1234!', 10);

  // Crear Usuarios
  const admin = await prisma.user.upsert({
    where: { email: 'admin@supportflow.dev' },
    update: {},
    create: {
      email: 'admin@supportflow.dev',
      name: 'Admin User',
      password,
      role: UserRole.ADMIN,
    },
  });

  const agent = await prisma.user.upsert({
    where: { email: 'agent@supportflow.dev' },
    update: {},
    create: {
      email: 'agent@supportflow.dev',
      name: 'Agent User',
      password: agentPassword,
      role: UserRole.AGENT,
    },
  });

  const requester = await prisma.user.upsert({
    where: { email: 'requester@supportflow.dev' },
    update: {},
    create: {
      email: 'requester@supportflow.dev',
      name: 'Requester User',
      password: requesterPassword,
      role: UserRole.REQUESTER,
    },
  });

  // Crear Categorías
  const categories = [
    { name: 'Infrastructure', description: 'Problemas de servidores, redes, accesos' },
    { name: 'Software', description: 'Bugs, errores de aplicación, actualizaciones' },
    { name: 'Security', description: 'Incidentes de seguridad, accesos no autorizados' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
