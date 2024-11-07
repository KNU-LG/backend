import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getUserAll() {
    return this.prisma.user.findMany();
  }

  async fileDBUpload(userId: number, path: string) {
    return await this.prisma.media.create({
      data: { userId: userId, path: path },
    });
  }

  async getWidget(userId: number) {
    return await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        calendarWidgetSetting: { include: { settingCommon: true } },
        clockWidgetSetting: { include: { settingCommon: true } },
        weatherWidgetSetting: { include: { settingCommon: true } },
        musicPlayWidgetSetting: { include: { settingCommon: true } },
      },
    });
  }
}
