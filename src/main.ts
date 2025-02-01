import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserInterceptor } from './interceptor/user.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new UserInterceptor());

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('My API Docs') // Title of the API
    .setDescription('API documentation for my Nest.js project') // Description
    .setVersion('1.0') // Version
    .addBearerAuth() // Adds JWT authentication support
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI will be available at /api

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
