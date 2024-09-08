import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist:true }));
  app.use(cookieParser());
   // Enable CORS with default options
   app.enableCors();

   // Custom CORS configuration
   app.enableCors({
     origin: process.env.FRONT_END_URL, // Replace with your client URL
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
     allowedHeaders: 'Authorization,Content-Type',
     credentials: true,
   });
  await app.listen(4000);
  console.log(`Server is running on Port:${4000}`)

} 
bootstrap();
