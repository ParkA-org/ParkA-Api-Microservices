import { IsEmail } from 'class-validator';

export class SocialLoginDto implements ISocialLoginDto {
  displayName: string;

  photoUrl: string;

  @IsEmail()
  email: string;

  origin: string;
}
