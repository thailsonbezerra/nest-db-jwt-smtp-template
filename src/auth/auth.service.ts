import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { validatePassword } from 'src/utils/password';
import { PayloadDto } from './dto/payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new HttpException('Email Not Registered', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await validatePassword(password, user?.password || '');

    if (!isMatch) {
      throw new HttpException(
        'Invalid Email or Password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      token: await this.jwtService.signAsync({
        ...new PayloadDto(user.id, user.name),
      }),
    };
  }
}
