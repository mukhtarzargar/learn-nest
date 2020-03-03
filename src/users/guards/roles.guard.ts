import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean{
        const roles = this.reflector.get<string[]>('roles', context.getHandler())

        if(!roles){
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        // console.log(user)
        if (user && user.is_superuser){
            return true
        }
        return false
        // return matchRoles(roles, user.Roles)
    } 

}

// const matchRoles = (roles: string[], userRoles: string[]): boolean => {
//     userRoles.forEach((role) =>{
//         if(roles.includes(role))
//             return true;
//     })
//     return false;
// }
