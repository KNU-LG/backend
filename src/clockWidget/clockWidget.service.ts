import {
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClockWidgetRequest } from './clockWidget.dto';
import { ClockDesign } from '@prisma/client';

@Injectable()
export class ClockWidgetService {
  constructor(private prisma: PrismaService) 
  {}

  getCurrentTime(): string {
      const currentTime = new Date().toISOString();
      return currentTime;
  }

  private parseTimezoneOffset(timezone: string): number {
      const match = timezone.match(/UTC([+-]\d+)/);
      if (!match) throw new Error('Invalid timezone format');

      const offsetHours = parseInt(match[1], 10);
      return offsetHours * 60; 
  }

  async createClockWidget(
      userId: number,
      data: CreateClockWidgetRequest,
  ) {
      const timezoneOffset = this.parseTimezoneOffset(data.timezone);

      return await this.prisma.clockWidgetSetting.create({
          data: {
              settingCommon: { create: data.settingCommon },
              user: { connect: { id: userId } },
              timezone: timezoneOffset,
              design: "ANALOG",
          },
          select: {
              id: true,
              settingCommon: true,
              timezone: true,
              design: true,
          },
      });
  }
}
