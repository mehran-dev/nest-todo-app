import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserInterceptor } from './interceptor/user.interceptor';
// import { UserInterceptor } from './interceptors/user.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new UserInterceptor()); // Register the interceptor globally

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
