import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/auth/users/users.service';

@Injectable()
export class CategoryService {

    constructor(
        private userservice: UsersService
    ){}

    // async 
}
