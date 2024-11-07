import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCalendarWidgetRequest } from './calendarWidget.dto';

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
      },
    });
  }
}
