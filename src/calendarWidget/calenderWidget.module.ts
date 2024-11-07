import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CalendarWidgetController } from './calendarWidget.controller';
import { CalendarWidgetService } from './calendarWidget.service';

@Module({
  controllers: [CalendarWidgetController],
  providers: [CalendarWidgetService, PrismaService],
  exports: [CalendarWidgetService],
})
export class CalendarWidgetModule {}
