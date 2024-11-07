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
        calendarWidgetSetting: {
          select: { id: true, settingCommon: true, schedule: true },
        },
        clockWidgetSetting: { select: { id: true, settingCommon: true } },
        weatherWidgetSetting: { select: { id: true, settingCommon: true } },
        musicPlayWidgetSetting: { select: { id: true, settingCommon: true } },
      },
    });
  }
}
