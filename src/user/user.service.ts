import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Request, Response} from 'express'
import { UpdateUserDto, UserDto } from './dto/user.dto';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class UserService {
        constructor(private prisma: PrismaService){}




       async getUserById(id: string) {
                try {
                        const foundUser = await this.prisma.user.findUnique({where: {id}})
                        if(!foundUser){
                                throw new BadRequestException('Id not exists!')
                        }
                        return { message: 'user', user:foundUser};
                } catch (error) {
                        throw new BadRequestException(error)
                }
       }

       async getAllUsers(req: Request, res: Response) {
                try {
                        const allUsers = await this.prisma.user.findMany();
                        return { message: 'All Users', users:allUsers};
                } catch (error) {
                        throw new BadRequestException(error)
                }
        }
       

       async createUser(dto: UserDto, req: Request, res: Response){

                const { username, phone } = dto;
                const foundUser = await this.prisma.user.findUnique({where: {username}})
                if(foundUser){
                        throw new BadRequestException('Username already exists!')
                }
                try {
                        const newUser = await this.prisma.user.create({
                                data: {
                                username,
                                phone
                                }
                        })
                        return res.send({ message: 'user created', user:newUser});
                } catch (error) {
                        throw new BadRequestException(error)
                }
        }

        async updateUser(id: string, dto: UpdateUserDto){
                try {
                        const foundUser = await this.prisma.user.findUnique({ where: { id } })
                        if(!foundUser){
                                throw new BadRequestException('Id not exists!')
                        }
                        const updateUser = await this.prisma.user.update({
                                where:{ id },
                                data: dto
                        })

                        return { message: 'user updated', user:updateUser};
                } catch (error) {
                        throw new BadRequestException(error)
                }
                }

        async deleteUser(id: string){
                try {
                        const foundUser = await this.prisma.user.findUnique({where: {id}})
                        if(!foundUser){
                                throw new BadRequestException('Id not exists!')
                        }
                        const foundUserProfile = await this.prisma.profile.findUnique({ where:{ userId: id}})
                       if(foundUserProfile){
                         await this.prisma.profile.delete({ where:{ userId: id}})
                       }
                        const deleteUser = await this.prisma.user.delete({ where:{ id } })
                        return { message: 'user deleted', user:deleteUser};
                } catch (error) {
                        throw new BadRequestException(error)
                }
                }



}
















