import { Injectable, PipeTransform } from "@nestjs/common";
import { validate } from "class-validator";

@Injectable()
export class ExtractUserAddressPipe implements PipeTransform{
    transform(details, metadata){
        const profile = {
            username: details.username,
            email: details.email,
            password: details.password,
            first_name: details.first_name,
            last_name: details.last_name
        }

        const address = {
            street: details.street,
            locality: details.locality,
            city: details.city,
            state: details.state,
            pincode: details.pincode
        }

        return {profile, address}

    }
}