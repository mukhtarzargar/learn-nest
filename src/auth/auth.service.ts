import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt = require('bcrypt')
import { JwtService } from '@nestjs/jwt' 
import { AppConfigService } from 'src/config/config.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: AppConfigService
    ){}

    //passport local strategy -- username/password -- returns a found user if authenticated
    async validateUser(username: string, password: string): Promise<any>{
        const user =  await this.usersService.findUser(username);
        // if(user && user.password)
        
        let validated = false
        if(user)
            validated = await bcrypt.compare(password, user.password);

        if(validated){
            const {password, ...result} = user
            return result
        }
        return null;
    }

    //authenticate user and return access-token

    async login(user: any){
        const payload = {username: user.username, sub: user.id};
        return {
            ttl: this.configService.ttl,
            access_token: this.jwtService.sign(payload)
        }
    }
}
