

import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Request, Response} from 'express'
import { PrismaService } from 'prisma/prisma.service';
import { ProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


@Injectable()
export class ProfileService {
        constructor(private prisma: PrismaService){}




        async getProfileById(id: string) {
                try {
                        const foundUser = await this.prisma.profile.findUnique({where: {userId: id}})
                        if(!foundUser){
                                throw new BadRequestException('Id not exists!')
                        }
                        return { message: 'user profile', profile:foundUser};
                } catch (error) {
                        throw new BadRequestException(error)
                }
        }

        async createUserProfile(dto: ProfileDto, req: Request, res: Response){

                const { userId, email, gender, address, pincode, city, state, country  } = dto;
                const foundUserProfile = await this.prisma.user.findUnique({where: {id: userId}})
                if(!foundUserProfile){
                        throw new BadRequestException('User Not exists!')
                }
                try {
                        const foundUserEmail = await this.prisma.profile.findUnique({where: {email}})
                        if(foundUserEmail){
                                throw new BadRequestException('User Email is already exists!')
                        }

                        const newUser = await this.prisma.profile.create({
                                data: dto
                        })
                        return res.send({ message: 'user profile created', profile:newUser});
                } catch (error) {
                        if (error instanceof PrismaClientKnownRequestError ) {
                                if (error.code === 'P2002') {
                                  throw new BadRequestException('Email already exists.');
                                }
                              }
                        throw new BadRequestException(error)
                }
        }

        async updateUserProfile(id: string, dto: UpdateProfileDto){
                try {
                        const foundUser = await this.prisma.user.findUnique({where: { id }})
                        if(!foundUser){
                                throw new BadRequestException('User Id is invalid!')
                        }
                        const foundUserProfile = await this.prisma.profile.findUnique({where: {userId : id}})
                        if(!foundUserProfile){
                                throw new BadRequestException('User Profile does not exists with User Id!')
                        }
                        const updateUserProfile = await this.prisma.profile.update({
                                where:{ userId: id },
                                data: dto
                        })
                        return { message: 'user profile updated', profile:updateUserProfile};
                } catch (error) {
                        throw new BadRequestException(error)
                }
                }

        async deleteUserProfile(id: string){
                try {
                        const foundUser = await this.prisma.user.findUnique({where: { id }})
                        if(!foundUser){
                                throw new BadRequestException('User Id is invalid!')
                        }
                        const foundUserProfile = await this.prisma.profile.findUnique({where: {userId: id}})
                        if(!foundUserProfile){
                                throw new BadRequestException('Profile does not exits with Id!')
                        }
                        const deleteUserProfile = await this.prisma.profile.delete({ where:{ userId: id } })
                        return { message: 'user profile deleted', profile:deleteUserProfile};
                } catch (error) {
                        throw new BadRequestException(error)
                }
                }



}
















