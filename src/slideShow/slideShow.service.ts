import { ForbiddenException, Injectable } from '@nestjs/common';
import { unlinkSync } from 'fs';
import { join } from 'path';
import { env } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SlideShowService {
  constructor(private prismaService: PrismaService) {}

  async getSlideShow(userId: number) {
    const count = await this.prismaService.slideShow.count({
      where: {
        userId: userId,
      },
    });
    if (count > 0) {
      return await this.prismaService.slideShow.findUniqueOrThrow({
        include: {
          slideShowImage: true,
        },
        where: {
          userId: userId,
        },
      });
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

  async addSlideShowImage(slideShowId: number, filename: string) {
    return await this.prismaService.slideShowImage.create({
      data: {
        path: 'static/' + filename,
        slideShowid: slideShowId,
      },
    });
  }

  async deleteSlideShowImage(id: number) {
    const { path } = await this.prismaService.slideShowImage.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    await this.prismaService.slideShowImage.delete({ where: { id: id } });
    unlinkSync(join(env.HOME, 'capstone-media', path));
  }

  async validateSlideShowImageId(userId: number, slideShowImageId: number) {
    const count = await this.prismaService.slideShowImage.count({
      where: {
        id: slideShowImageId,
        slideShow: {
          userId: userId,
        },
      },
    });
    if (count === 0) {
      throw new ForbiddenException({
        error: '잘못된 slide show image id 접근',
        message: 'fail',
        statusCode: 403,
        data: {},
      });
    }
  }
}
