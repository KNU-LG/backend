import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { CalendarWidgetService } from 'src/calendarWidget/calendarWidget.service';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService, CalendarWidgetService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
