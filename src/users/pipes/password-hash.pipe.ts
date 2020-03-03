import { Injectable, PipeTransform } from "@nestjs/common";
// import {bcrypt} from 'bcrypt';
import bcrypt = require('bcrypt');

const saltRounds = 10;

@Injectable()
export class PasswordHashPipe implements PipeTransform<any>{
    async transform(value, metadata){
        
        if (value.password){
            const hashedPassword = await bcrypt.hash(value.password, saltRounds);
            value.password = hashedPassword;
        }
        return value;
    }
}