import { Controller, UseGuards, Post, HttpCode, Request } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "@nestjs/passport";


@Controller()
export class AppController{
    constructor(private readonly authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    @HttpCode(200)
    async login(@Request() req){
        return this.authService.login(req.user)
    }
}