import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateMusicWidgetRequest,
  UpdateMusicWidgetRequest,
} from './musicWidget.dto';
import { join } from 'path';
import { unlinkSync } from 'fs';
import { env } from 'process';

@Injectable()
export class MusicWidgetService {
  constructor(private prisma: PrismaService) {}

  async createMusicWidget(userId: number, data: CreateMusicWidgetRequest) {
    return await this.prisma.musicPlayWidgetSetting.create({
      data: {
        settingCommon: { create: data.settingCommon },
        user: { connect: { id: userId } },
      },
      select: {
        id: true,
        settingCommon: true,
        musicPath: true,
      },
    });
  }

  async validateUserHasMusicWidget(userId: number, musicWidgetId: number) {
    const result =
      (await this.prisma.musicPlayWidgetSetting.count({
        where: { userId: userId, id: musicWidgetId },
      })) > 0;
    if (!result) {
      throw new ForbiddenException({
        data: {},
        message: '잘못된 위젯 접근',
        error: '사용자가 가지고 있는 위젯이 아님',
        statusCode: 403,
      });
    }
    return true;
  }

  async getMusicWidgetById(id: number) {
    return await this.prisma.musicPlayWidgetSetting.findUniqueOrThrow({
      where: { id: id },
      select: {
        id: true,
        settingCommon: true,
        musicPath: true,
      },
    });
  }

  async updateMusicWidgetById(id: number, data: UpdateMusicWidgetRequest) {
    return await this.prisma.musicPlayWidgetSetting.update({
      where: { id: id },
      data: {
        settingCommon: {
          create: data.settimgCommon,
        },
      },
      select: {
        id: true,
        settingCommon: true,
        musicPath: true,
      },
    });
  }

  async deleteMusicWidgetById(id: number) {
    return await this.prisma.musicPlayWidgetSetting.delete({
      where: { id: id },
    });
  }

  async addMusicPath(musicPlayWidgetId: number, filename: string) {
    return await this.prisma.musicPath.create({
      data: {
        path: 'static/' + filename,
        musicPlayWidgetId: musicPlayWidgetId,
      },
    });
  }

  async deleteMusicPath(id: number) {
    const { path } = await this.prisma.musicPath.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    await this.prisma.musicPath.delete({ where: { id: id } });
    unlinkSync(join(env.HOME, 'capstone-media', path));
  }

  async validateMusicPathId(musicWidgetId: number, musicPathId: number) {
    const count = await this.prisma.musicPath.count({
      where: {
        id: musicPathId,
        musicPlayWidgetId: musicWidgetId,
      },
    });
    if (count === 0) {
      throw new ForbiddenException({
        error: '잘못된 music path id 접근',
        message: 'fail',
        statusCode: 403,
        data: {},
      });
    }
  }
}
