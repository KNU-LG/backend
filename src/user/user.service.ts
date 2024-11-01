import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRequest } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getUserAll() {
    return this.prisma.user.findMany();
  }

  async register(userRequest: UserRequest) {
    return await this.prisma.user.create({
      data: {
        email: userRequest.email,
        login_id: userRequest.loginId,
        password: await bcrypt.hash(
          userRequest.passWord,
          parseInt(process.env.PASSWORD_ROUND, 10),
        ),
        name: userRequest.name,
        mode: 'WIDGET',
        theme: 'LIGHT',
      },
    });
  }

  async login(id: number, loginId: string, password: string) {
    const user = await this.prisma.user.findFirst({ where: { id: id } });
    if (!bcrypt.compareSync(password, user.password)) {
      throw Error('password different');
    }
    return await this.jwtService.signAsync({
      id: id,
      loginId: loginId,
      name: user.name,
    });
  }
}
