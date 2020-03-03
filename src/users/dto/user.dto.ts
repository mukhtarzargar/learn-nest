
import {IsString, Length, IsAlphanumeric, IsEmail, Matches, IsOptional, IsBoolean, IsInt, IsNumber, ValidateNested} from 'class-validator';
import { AddressDto } from './address.dto';


export class UserDto{
    @IsOptional()
    @IsInt()
    readonly id: number;

    @Length(3, 20)
    @IsAlphanumeric()
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsString()
    readonly first_name: string; 

    @IsString()
    readonly last_name: string; 

    @IsEmail()
    readonly email: string

    @IsOptional()
    @Matches(new RegExp('^[0-9]{10,12}$'))
    phone: string

    @IsOptional()
    @ValidateNested()
    readonly address: AddressDto

    is_superuser: boolean;
    is_active: boolean;
    

}