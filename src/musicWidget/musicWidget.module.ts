import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MusicWidgetController } from './musicWidget.controller';
import { MusicWidgetService } from './musicWidget.service';

@Module({
  controllers: [MusicWidgetController],
  providers: [MusicWidgetService, PrismaService],
  exports: [MusicWidgetService],
})
export class MusicWidgetModule {}
