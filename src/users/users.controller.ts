import { Controller, Get, Post, HttpCode, Req, Ip, Res, Body, Redirect, Query, Param, HttpException, HttpStatus, NotFoundException, UseFilters, ForbiddenException, UsePipes, BadRequestException, ConflictException, ValidationPipe, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
// import { Request, Response } from 'express';
import { User } from './entities/user.entity';
// import { validationPipe } from './user.validation.pipe';
// import { JoiValidationPipe } from './user_validation';
import { HttpExceptionFilter } from 'src/common/exception_filters/http-exception.filter';
import { UserDto } from './dto/user.dto';
import { UserLoginDto } from './dto/user.login.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { PasswordHashPipe } from './pipes/password-hash.pipe';
import { ParseIntPipe } from './pipes/parse-int.pipe';
import { AuthGuard } from '@nestjs/passport';
import { EditProfileDto } from './dto/edit-profile.dto';
import { Roles } from './guards/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ProfileDto } from './dto/profile.dto';

// const userSchema = require('./user.schema')

@Controller('accounts')
// @UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ) {}

  @Post('create')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({transform:true, whitelist: true}), PasswordHashPipe)
  async create(@Body() userDetails: ProfileDto) {
    return await this.userService.create(userDetails);
  }

  //jwt based profile return
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req){
    console.log('LoggedIn')
    return req.user
  }

  //jwt based passport authentication
  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}), PasswordHashPipe)
  async editProfile(@Request() req, @Body() user: EditProfileDto){
    console.log('Edit')

    const result = await this.userService.editProfile(req.user.username, user)

    return result
  }


  //fileupload-example
  @Post('upload-file')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file, @Body() body){
    console.log(file.orginalname)
    const response = {
      orginalname: file.orginalname,
      filename: file.filename,
      name: body.name
    }

    console.log(response)
    return response
  }

  

  //manual token based authentication
  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({transform:true, whitelist: true}))
  async loginUser(@Body() loginDetails: UserLoginDto){
    // const result = await this.userService.login(loginDetails)

    const arr = [1, 2, 3, 5]

    const arr2 = []

    arr.forEach((el) => {
      arr2.push(el)
    })

    console.log(arr2)

    return true;
    // if(result.found){
    //   return {token: result.token}
    // }else{
    //   throw new NotFoundException('username/password incorrect')
    // }
  }

  
  //manual authentication
  @Post('edit-profile')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({transform:true, whitelist: true}), PasswordHashPipe)
  async edit(@Body() editUserDto: EditUserDto){
    const result = await this.userService.editUser(editUserDto);
    if(result.found && result.updated){
      return {updated: true}
    }else{
      throw new BadRequestException('username/ token incorrect')
    }
  }

  @Get('get/:id')
  async getHello(@Param('id', new ParseIntPipe()) id) {
    console.log(id);
    let result = await this.userService.find(id);
    if (result)
      return result
    else
      throw new NotFoundException()
      // throw new HttpException({
      //   error: 'Not Found',
      //   status: HttpStatus.NOT_FOUND
      // }, HttpStatus.NOT_FOUND)
  }

  @Get('get')
  async findAll(): Promise<User[]> {
    return  this.userService.findAll();
    // throw new HttpException({
    //   error: 'Forbidden',
    //   status: HttpStatus.FORBIDDEN,
    // }, HttpStatus.FORBIDDEN);
  }

  @UseInterceptors(LoggingInterceptor)
  @Get('get-by-username/:username')
  async getByUsername(@Param() username){
    
    console.log(username)
    let result = await this.userService.findByUsername(username.username);
    if(result)
      return result
    else
      throw new NotFoundException()
  }



  //jwt admin

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post('admin/edit-user/:username')
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}), PasswordHashPipe)
  async editAll(@Body() userDetails: EditProfileDto, @Param() param) {
    console.log('this end-point belongs to admin only')
    const result = await this.userService.editProfile(param.username, userDetails)

    return result
  }
}
 




//body
// let username = body['username']
    // let pass = body['pass']

    // console.log('Account Created: ', username, pass)

    // res.json({message: 'Successful'})
    // // return res


//redirect
 // @Get('docs')
  // @Redirect('https://docs.nestjs.com', 302)
  // getDocs(@Query('version') version){
  //   console.log('Redirecting...///')

  //   if (version && version === '5'){
  //     return {url: 'https://docs.nestjs.com/v5'};
  //   }

  // }
