import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Role } from "../enums/role.enum";


@Injectable()
export class RolesGuard implements CanActivate{

    constructor( private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) return true;

        const {user} = context.switchToHttp().getRequest();

        const hasRole = requiredRoles.includes(user.role);

        if (!hasRole){
            throw new Error("Method not implemented.");
        }

        return true;
    }
}