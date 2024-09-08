
import { Controller, Get, Post, Body, Req, Res, Param, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express'; // Import Response from express
import { UpdateUserDto, UserDto } from './dto/user.dto';


@Controller('user')
export class UserController {
  
  constructor(private readonly userService: UserService) {}

  @Get('get-user/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('get-all-users')
  async getAllUser(req: Request, res: Response) {
    return this.userService.getAllUsers(req, res);
  }


  @Post('create-user')
    createUser(@Body() dto: UserDto, @Req() req: Request, @Res() res: Response){
      return this.userService.createUser(dto, req, res)
    }

  @Patch('update-user/:id')
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto){
    return this.userService.updateUser(id, dto)
  }

    
  @Delete('delete-user/:id')
  deleteUser(@Param('id') id: string){
    return this.userService.deleteUser(id)
  }



}
