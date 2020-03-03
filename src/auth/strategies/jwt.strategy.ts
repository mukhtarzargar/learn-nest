import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from 'src/config/config.service'

import dotenv = require('dotenv'); 

dotenv.config()

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy){
    constructor(
        private readonly configService: AppConfigService,
        private readonly usersService: UsersService,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.secretOrKey,
        });
    }

    async validate(payload: any){
        console.log('JWT')
        console.log(payload.username)
        // return {id: payload.sub, username: payload.username}
        const user = await this.usersService.findUser(payload.username)
        const {password, ...result} = user;

        return result;
    }
}