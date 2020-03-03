import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConfigService{
    constructor(private configService: ConfigService){}

    get secretOrKey(): string{
        return this.configService.get<string>('secret')
    }
    get ttl(): string{
        return this.configService.get<string>('token_ttl')
    }
}