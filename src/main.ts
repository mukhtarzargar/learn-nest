import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.middleware';
// import { AllExceptionFilter } from './common/exception_filters/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger)
  //global pipe -- whitelisting--strict--only specified fields will be allowed

  const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionFilter(httpAdapter))
  await app.listen(3000);
  
}
bootstrap();
