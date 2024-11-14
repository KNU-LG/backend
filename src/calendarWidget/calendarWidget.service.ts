import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateCalendarWidgetRequest,
  UpdateCalendarWidgetRequest,
} from './calendarWidget.dto';

@Injectable()
export class CalendarWidgetService {
  constructor(private prisma: PrismaService) {}

  async createCalendarWidget(
    userId: number,
    data: CreateCalendarWidgetRequest,
  ) {
    return await this.prisma.calendarWidgetSetting.create({
      data: {
        settingCommon: { create: data.settingCommon },
        user: { connect: { id: userId } },
      },
      select: {
        id: true,
        settingCommon: true,
        schedule: true,
      },
    });
  }

  async validateUserHasCalendarWidget(
    userId: number,
    calendarWidgetId: number,
  ) {
    const result =
      (await this.prisma.calendarWidgetSetting.count({
        where: { userId: userId, id: calendarWidgetId },
      })) > 0;
    if (!result) {
      throw new ForbiddenException({
        data: {},
        message: '잘못된 위젯 접근',
        error: '사용자가 가지고 있는 위젯이 아님',
        statusCode: 403,
      });
    }
    return true;
  }

  async getCalendarWidgetById(id: number) {
    return await this.prisma.calendarWidgetSetting.findUniqueOrThrow({
      where: { id: id },
      select: {
        id: true,
        settingCommon: true,
        schedule: true,
      },
    });
  }

  async updateCalendarWidgetById(
    id: number,
    data: UpdateCalendarWidgetRequest,
  ) {
    return await this.prisma.calendarWidgetSetting.update({
      where: { id: id },
      data: {
        settingCommon: {
          create: data.settimgCommon,
        },
      },
      select: {
        id: true,
        settingCommon: true,
        schedule: true,
      },
    });
  }

  async deleteCalendarWidgetById(id: number) {
    return await this.prisma.calendarWidgetSetting.delete({
      where: { id: id },
    });
  }
}
