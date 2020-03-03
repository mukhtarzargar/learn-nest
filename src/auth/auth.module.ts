import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
import { JwtStategy } from './strategies/jwt.strategy';

// import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    UsersModule,
    AppConfigModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRETKEY, // should come from environment variables , use DOTENV
      signOptions: {expiresIn: process.env.TOKEN_TTL},
    }),
    
  ],
  providers: [AuthService, LocalStrategy, JwtStategy],
  exports: [AuthService]
})
export class AuthModule {}
