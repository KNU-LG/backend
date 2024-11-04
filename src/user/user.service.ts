import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserRequest, UserRequest } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  async getUserAll() {
    return this.prisma.user.findMany();
  }

  async register(userRequest: UserRequest) {
    return await this.prisma.user.create({
      data: {
        email: userRequest.email,
        login_id: userRequest.loginId,
        password: this.hashPassword(userRequest.passWord),
        name: userRequest.name,
        mode: 'WIDGET',
        theme: 'LIGHT',
      },
    });
  }

  async login(loginId: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { login_id: loginId },
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

  async sendResetCode(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestException('등록되지 않은 이메일입니다.');
    }
  
    await this.mailerService.sendMail({
      to: email,
      subject: '비밀번호 초기화 인증번호',
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
      data: {
        email: updateUserRequest.newEmail,
        name: updateUserRequest.newName,
      },
    });
  }
}
