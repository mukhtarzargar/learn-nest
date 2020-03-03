import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { ProfileDto } from '../dto/profile.dto';


@Entity()
export class Address{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: null})
    street: string;

    @Column({default: null})
    locality: string

    @Column({default: null})
    city: string;
    
    @Column({default: null})
    state: string;

    @Column({default: null})
    pincode: string;

    constructor(address?: ProfileDto){
        if(address){
            this.street = address.street
            this.locality = address.locality
            this.city = address.city
            this.state = address.state
            this.street = address.pincode
        }
    }
    

}