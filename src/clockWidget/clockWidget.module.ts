import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClockWidgetController } from './clockWidget.controller';
import { ClockWidgetService } from './clockWidget.service';

@Module({
  controllers: [ClockWidgetController],
  providers: [ClockWidgetService, PrismaService],
  exports: [ClockWidgetService],
})
export class ClockWidgetModule {}
