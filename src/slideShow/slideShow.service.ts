import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SlideShowService {
  constructor(private prismaService: PrismaService) {}

  async getSlideShow(userId: number) {}

  async createSlideShow(userId: number) {
    const count = await this.prismaService.slideShow.count({
      where: {
        userId: userId,
      },
    });
    if (count > 0) {
      return this.getSlideShow(userId);
    }

    const result = await this.prismaService.slideShow.create({
      data: {
        userId: userId,
      },
      include: {
        slideShowImage: true,
      },
    });
    return result;
  }
}
