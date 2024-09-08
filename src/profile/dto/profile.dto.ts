import { IsNotEmpty, IsOptional, IsString, IsPhoneNumber, Length, IsInt, IsEmail } from 'class-validator';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  public userId:string;

  @IsNotEmpty()
  @IsEmail()
  public email:string;

  @IsNotEmpty()
  public gender:string;

  @IsNotEmpty()
  public address:string;
  
  @IsNotEmpty()
  public pincode:string;

  @IsNotEmpty()
  public city:string;

  @IsNotEmpty()
  public state:string;

  @IsNotEmpty()
  public country:string;
}


export class UpdateProfileDto {

  @IsOptional()
  @IsString()
  public gender?:string;

  @IsOptional()
  @IsString()
  public address?:string;
  
  @IsOptional()
  @IsString()
  public pincode?:string;

  @IsOptional()
  @IsString()
  public city?:string;

  @IsOptional()
  @IsString()
  public state?:string;
  
  @IsOptional()
  @IsString()
  public country?:string;
}
