import {IsString, Length, IsAlphanumeric, IsEmail, Matches, IsOptional} from 'class-validator';


export class ProfileDto{
    @Length(3, 20)
    @IsAlphanumeric()
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsOptional()
    @IsString()
    readonly first_name: string; 

    @IsOptional()
    @IsString()
    readonly last_name: string; 

    @IsEmail()
    readonly email: string

    @IsOptional()
    @Matches(new RegExp('^[0-9]{10,12}$'))
    phone: string

    // is_superuser: boolean;
    // is_active: boolean;

    @IsOptional()
    @IsString()
    street: string;

    @IsOptional()
    @IsString()
    locality: string

    @IsOptional()
    @IsString()
    city: string;
    
    @IsOptional()
    @IsString()
    state: string;

    @IsOptional()
    @IsString()
    country: string;

    @IsOptional()
    @IsString()
    pincode: string;

}