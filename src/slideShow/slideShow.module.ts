import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SlideShowController } from './slideShow.controller';
import { SlideShowService } from './slideShow.service';

@Module({
  controllers: [SlideShowController],
  providers: [PrismaService, SlideShowService],
  exports: [SlideShowService],
})
export class SlideShowModule {}
