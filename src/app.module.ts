import { Module, NestModule, NestMiddleware, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import configuration from './config/configuration';
// import { LoggerMiddleware } from './common/middleware/logger.middleware';
// import { UsersController } from './users/users.controller';
// import { logger } from './common/middleware/logger.middleware';
// import { APP_FILTER } from '@nestjs/core';
// import { HttpExceptionFilter } from './common/exception_filters/http-exception.filter';


@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(),
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
    })
  ],
  controllers: [AppController]
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: HttpExceptionFilter
  //   }
  // ]
})
export class AppModule{
  constructor(private readonly connection: Connection){}
}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer){
//     consumer
//       // .apply(LoggerMiddleware)
//       .apply(logger)
//       .exclude(
//         { path: 'accounts/get', method: RequestMethod.GET}
//       )
//       .forRoutes(UsersController);
//   }
// }

