import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserRequest, RegisterRequest } from './user.dto';
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

  async register(userRequest: RegisterRequest) {
    return await this.prisma.user.create({
      data: {
        email: userRequest.email,
        loginId: userRequest.loginId,
        password: this.hashPassword(userRequest.password),
        name: userRequest.name,
        mode: 'WIDGET',
        theme: 'LIGHT',
      },
    });
  }

  async login(loginId: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { loginId: loginId },
    });
    if (!bcrypt.compareSync(password, user.password)) {
      throw Error('password different');
    }
    return await this.jwtService.signAsync({
      id: user.id,
      loginId: loginId,
      name: user.name,
    });
  }

  hashPassword(password: string) {
    return bcrypt.hashSync(password, parseInt(process.env.PASSWORD_ROUND, 10));
  }

  async changePassword(id: number, password: string) {
    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: this.hashPassword(password),
      },
    });
  }

  async updateUser(id: number, updateUserRequest: UpdateUserRequest) {
    return await this.prisma.user.update({
      where: { id: id },
      select: {
        id: true,
        loginId: true,
        email: true,
        theme: true,
        mode: true,
        name: true,
      },
      data: updateUserRequest,
    });
  }
}
