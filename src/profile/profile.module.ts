import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({

  controllers: [ProfileController], //here we define the api routes
  providers: [ProfileService, PrismaService] //here we executes the logic for the api's
})
export class ProfileModule {}
