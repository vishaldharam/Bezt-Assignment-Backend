import { IsNotEmpty, IsOptional, IsString, IsPhoneNumber, Length, IsInt } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  public username:string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 10, { message: 'Phone no must be of 10 digit' })
  public phone:string;

}


export class UpdateUserDto {
  @IsOptional()
  @IsString()
  public username?: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 10, { message: 'Phone no must be of 10 digit' })
  public phone?:string;
}
