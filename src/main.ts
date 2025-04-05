import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from "dotenv";

config();

async function bootstrap() {
  const port = Number(process.env.port);
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Chat Message Service")
    .setDescription("API documentation for Chat Message Service")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(port);
  console.log(`🚀 User Analysis Service running on http://localhost:${port}`);
  console.log(`📄 Swagger UI available at http://localhost:${port}/swagger`);
}

bootstrap();
