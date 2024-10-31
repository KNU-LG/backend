import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { UserRequest } from "./user.dto";
import { JwtService } from '@nestjs/jwt';
import { userInfo } from 'os';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async getUserAll() {
        return this.prisma.user.findMany();
    }

    async register(userRequest: UserRequest) {
        await this.prisma.user.create({
            data: {
                email: userRequest.email,
                login_id: userRequest.loginId,
                password: userRequest.passWord,
                name: userRequest.name,
                mode: 'WIDGET',
                theme: 'LIGHT'
            }
        })
    }

    async login(loginId: string) {
        return await this.jwtService.signAsync({
          loginId: loginId
        })
    }
}

