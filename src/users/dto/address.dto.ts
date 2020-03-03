import { IsString, IsOptional } from "class-validator";

export class AddressDto{
    @IsOptional()
    @IsString()
    id: number;

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
    pincode: string;
}