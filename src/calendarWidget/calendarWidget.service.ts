import { Injectable } from '@nestjs/common';
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

  async isUserHasCalendarWidget(userId: number, calendarWidgetId: number) {
    return (
      (await this.prisma.calendarWidgetSetting.count({
        where: { userId: userId, id: calendarWidgetId },
      })) > 0
    );
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
