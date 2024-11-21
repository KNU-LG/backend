import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserRequest, RegisterRequest } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailerSerivice: MailerService,
  ) {}

  async getUserAll() {
    return this.prisma.user.findMany();
  }

  async getUserByIdWithoutPassword(id: number) {
    return await this.prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        mode: true,
        name: true,
        loginId: true,
        theme: true,
      },
      where: {
        id: id,
      },
    });
  }

  async getUserByEmailOrLoginId(email?: string, loginId?: string) {
    let user: User;
    try {
      if (email != null) {
        user = await this.prisma.user.findUnique({ where: { email: email } });
      } else if (loginId != null) {
        user = await this.prisma.user.findUnique({
          where: { loginId: loginId },
        });
      } else {
        throw new BadRequestException('need email or loginId');
      }
    } catch (err) {
      throw new NotFoundException(err);
    }
    return user;
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
        mode: true,
        name: true,
        theme: true,
      },
      data: updateUserRequest,
    });
  }

  async sendResetPasswordEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    const newPassword = randomUUID();
    await this.changePassword(user.id, newPassword);
    await this.mailerSerivice.sendMail({
      to: user.email,
      text: `임시 비밀번호는 ${newPassword} 입니다. 변경 후 사용하세요.`,
    });
  }
}
