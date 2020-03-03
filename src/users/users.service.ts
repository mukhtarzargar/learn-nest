import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/user.login.dto';
import bcrypt = require('bcrypt');
import uuidv4 = require('uuid/v4');
import { EditUserDto } from './dto/edit-user.dto';
import { UserDto } from './dto/user.dto';
import { EditProfileDto } from './dto/edit-profile.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class UsersService{
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  // private readonly users: User[] = [];
  private tokens = {}

  async create(userDetails){
    const userCheck = await this.userRepo.findOne({username: userDetails.username})
    const emailCheck = await this.userRepo.findOne({email: userDetails.email})

    const queryRunner = this.userRepo.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    if(!userCheck && !emailCheck) {
      try{
        const address = new Address(userDetails)
        const user = new User(userDetails)
        
        user.address = address;

        await queryRunner.manager.save(address);
        await queryRunner.manager.save(user);

        await queryRunner.commitTransaction();

        return {message: 'Success'}
      }catch(err){
        console.log(err)
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException('Something went wrong')
      }finally{
        await queryRunner.release();
      }
    }else{
      throw new BadRequestException('Already Exists');
    }
  }

  //used by passport to authenticate
  async findUser(username: string): Promise<User>{
    
    const result = await this.userRepo.findOne({username},{relations:['address']})
    return result;
  }

//jwt auth token based edit profile
  async editProfile(username: string, userDetails: EditProfileDto){

    if(!username)
      throw new BadRequestException('username to be modified is mandatory')

    if(Object.keys(userDetails).length === 0 )
      throw new BadRequestException('fields to be updated are mandatory')
    
    console.log(userDetails)
    const result = await this.userRepo.createQueryBuilder()
        .update(new UserDto())
        .set(userDetails)
        .where("username=:username", {username: username})
        .execute();

    if(result.affected >= 1){
      console.log(result)
      return {updated: true}
    }else{
      throw new BadRequestException('Check payload')
    }
  }




  //manual authentication -- issues uuidv4 token
  async login(user: UserLoginDto){
    const userCheck = await this.userRepo.findOne({username: user.username})

    let validated = false
    if(user)
        validated = await bcrypt.compare(user.password, userCheck.password);

    if(userCheck && validated){
      console.log('found')
      const token = uuidv4();
      // console.log(token)

      this.tokens[user.username] = token
      console.log(this.tokens)
      return {found: true, token: token};
    }else{
      return {found: false}
    }
  }

  //uuid4 token based edit profile
  async editUser(user: EditUserDto){

    if (this.tokens[user.username] == user.token){
      console.log(user)
      //update user
      delete user.token;

      this.userRepo.createQueryBuilder()
        .update(new UserDto())
        .set(user)
        .where("username=:username", {username: user.username})
        .execute();

      return {found: true, updated: true}
    }else{
      console.log('not valid token')
      return {found: false, updated: false}
    }
  }
  
  findAll(): Promise<User[]>{
    return this.userRepo.find({
      select: [
        'username',
        'first_name',
        'last_name',
        'email',
        'phone',
        'is_active',
        'is_superuser'
      ]
    });
  }

  find(id: string): Promise<User>{
    // id -=1;
    return this.userRepo.findOne(id, {
      select: [
        'username',
        'first_name',
        'last_name',
        'email',
        'phone',
        'is_active',
        'is_superuser'
      ]
    });
  }

  //used in route to get user-details by username

  async findByUsername(username: string): Promise<User>{
    // id -=1;
    const result = await this.userRepo.createQueryBuilder("user")
      .where("user.username = :username", {username: username})
      .select([
        'user.username',
        'user.first_name',
        'user.last_name',
        'user.email',
        'user.phone',
        'user.is_active',
        'user.is_superuser'
      ])
      .getOne();

      return result;
  }

  
    
  // async remove(id: string): Promise<void>{
  //   // id -= 1;
  //   await this.userRepo.delete(id);
  // }
}