import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddScheduleRequest, UpdateScheduleRequest } from './schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async getByCalendarId(calendarId: number) {
    return (
      await this.prisma.calendarWidgetSetting.findUniqueOrThrow({
        where: {
          id: calendarId,
        },
        select: {
          schedule: {
            select: {
              date: true,
              id: true,
              title: true,
              content: true,
            },
          },
        },
      })
    ).schedule;
  }

  async addSchedule(userId: number, data: AddScheduleRequest) {
    return await this.prisma.schedule.create({
      data: {
        userId: userId,
        calendarWidget: {
          connect: {
            id: data.calendarId,
          },
        },
        title: data.title,
        date: data.date,
        content: data.content,
      },
      select: {
        date: true,
        id: true,
        title: true,
        content: true,
      },
    });
  }

  async validateUserHasSchedule(userId: number, scheduleId: number) {
    const count = await this.prisma.schedule.count({
      where: {
        userId: userId,
        id: scheduleId,
      },
    });
    if (count > 0) {
      return true;
    }
    throw new ForbiddenException({
      message: '사용자가 가진 스케쥴 아님',
      error: '검증 에러',
      statusCode: 403,
      data: {},
    });
  }

  async updateSchedule(scheduleId: number, data: UpdateScheduleRequest) {
    return await this.prisma.schedule.update({
      where: {
        id: scheduleId,
      },
      data: data,
      select: {
        id: true,
        title: true,
        content: true,
        date: true,
      },
    });
  }

  async deleteSchedule(scheduleId: number) {
    return await this.prisma.schedule.delete({
      where: {
        id: scheduleId,
      },
    });
  }
}
