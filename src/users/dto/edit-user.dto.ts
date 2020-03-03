
import {IsString, Length, IsAlphanumeric, IsEmail, Matches, IsOptional, IsBoolean, IsInt} from 'class-validator';

export class EditUserDto{
    @IsString()
    token: string;

    @IsAlphanumeric()
    readonly username: string;

    @IsOptional()
    @IsString()
    readonly password: string;

    @IsOptional()
    @IsString()
    readonly first_name: string; 

    @IsOptional()
    @IsString()
    readonly last_name: string; 

    @IsOptional()
    @IsEmail()
    readonly email: string

    @IsOptional()
    @Matches(new RegExp('^[0-9]{10,12}$'))
    phone: string

    // is_superuser: boolean;

    // is_active: boolean;

}