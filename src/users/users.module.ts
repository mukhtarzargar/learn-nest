import { Module, Global } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { MulterModule } from '@nestjs/platform-express';

// @Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([User, Address]),
        MulterModule.register({
            dest: './files',
        })

    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
    // exports: [UsersService]
})
export class UsersModule {}