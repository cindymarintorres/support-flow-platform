import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.setGlobalPrefix('api');

  // En desarrollo permitimos todo por conveniencia. 
  // En producción, tomamos los dominios permitidos desde la variable FRONTEND_URL.
  // Si en producción no se define FRONTEND_URL, bloqueamos el acceso (seguridad por defecto).
  const allowedOrigins = process.env.NODE_ENV === 'production'
    ? (process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map(url => url.trim()) : [])
    : true;

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(port, '0.0.0.0')  // ← acepta conexiones desde fuera
  console.log(`Application is running on: http://localhost:${port}/api`);
}
bootstrap();
