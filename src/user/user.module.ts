import { Module } from '@nestjs/common';
import {  UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Module({

  controllers: [UserController], //here we define the api routes
  providers: [UserService, PrismaService] //here we executes the logic for the api's
})
export class UserModule {}
