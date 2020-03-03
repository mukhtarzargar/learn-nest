import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { Address } from './address.entity';
import { ProfileDto } from '../dto/profile.dto';
import { type } from 'os';


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true})
    email: string;

    @Column({nullable: true})
    phone: string;

    @Column({default: false})
    is_superuser: boolean;

    @Column({default: false})
    is_active: boolean

    @OneToOne(type => Address)
    @JoinColumn()
    address: Address

    @ManyToOne(type => User, user => user.underlings, {nullable:true})
    supervisor: User

    @OneToMany(type => User, user => user.supervisor, {nullable:true})
    underlings: User[]

    constructor(userDetails?: ProfileDto){
        if(userDetails){
            this.username = userDetails.username;
            this.password = userDetails.password;
            this.email = userDetails.email;
            this.first_name = userDetails.first_name;
            this.last_name = userDetails.last_name;
        }
    }
}