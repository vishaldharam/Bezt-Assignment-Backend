


import { Controller, Get, Post, Body, Req, Res, Param, Delete, Patch } from '@nestjs/common';
import { Request, Response } from 'express'; // Import Response from express
import { ProfileService } from './profile.service';
import { ProfileDto, UpdateProfileDto } from './dto/profile.dto';


@Controller('profile')
export class ProfileController {
  
  constructor(private readonly profileService: ProfileService) {}

  @Get('get-user-profile/:id')
  async getProfileById(@Param('id') id: string) {
    return this.profileService.getProfileById(id);
  }


  @Post('create-user-profile')
  createUserProfile(@Body() dto: ProfileDto, @Req() req: Request, @Res() res: Response){
      return this.profileService.createUserProfile(dto, req, res)
    }

  @Patch('update-user-profile/:id')
  updateUserProfile(@Param('id') id: string, @Body() dto: UpdateProfileDto){
    return this.profileService.updateUserProfile(id, dto)
  }

    
  @Delete('delete-user-profile/:id')
  deleteUserProfile(@Param('id') id: string){
    return this.profileService.deleteUserProfile(id)
  }



}
