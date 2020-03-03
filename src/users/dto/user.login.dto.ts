import { IsAlphanumeric, IsString } from "class-validator";

export class UserLoginDto{
    @IsAlphanumeric()
    username: string;

    @IsString()
    password: string

}