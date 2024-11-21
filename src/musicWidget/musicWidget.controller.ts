import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MusicWidgetService } from './musicWidget.service';
import { ApiBody, ApiConsumes, ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from 'src/user/auth.guard';
import {
  CreateMusicWidgetRequest,
  CreateMusicWidgetResponse,
  DeleteMusicWidgetResponse,
  GetMusicWidgetResponse,
  UpdateMusicWidgetRequest,
  UpdateMusicWidgetResponse,
} from './musicWidget.dto';
import { APIResponse } from 'src/type';
import { FileInterceptor } from '@nestjs/platform-express';
import { env } from 'process';

@Controller('widget/music')
export class MusicWidgetController {
  constructor(private musicWidgetService: MusicWidgetService) {}

  @Post()
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async createMusicWidget(
    @Request() req,
    @Body() data: CreateMusicWidgetRequest,
  ): Promise<APIResponse<CreateMusicWidgetResponse>> {
    const widget = await this.musicWidgetService.createMusicWidget(
      req.user.id,
      data,
    );
    return {
      data: widget,
      message: 'success',
      error: '',
      statusCode: 201,
    };
  }

  @Get(':musicWidgetId')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async getMusicWidget(
    @Request() req,
    @Param('musicWidgetId', ParseIntPipe) id: number,
  ): Promise<APIResponse<GetMusicWidgetResponse>> {
    await this.musicWidgetService.validateUserHasMusicWidget(req.user.id, id);
    const result = await this.musicWidgetService.getMusicWidgetById(id);
    return {
      message: 'success',
      error: '',
      statusCode: 200,
      data: result,
    };
  }

  @Put(':musicWidgetId')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async updateMusicWidget(
    @Request() req,
    @Body() data: UpdateMusicWidgetRequest,
    @Param('musicWidgetId', ParseIntPipe) id: number,
  ): Promise<APIResponse<UpdateMusicWidgetResponse>> {
    await this.musicWidgetService.validateUserHasMusicWidget(req.user.id, id);
    const result = await this.musicWidgetService.updateMusicWidgetById(
      id,
      data,
    );
    return {
      data: result,
      error: '',
      message: 'success',
      statusCode: 200,
    };
  }

  @Delete(':musicWidgetId')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async deleteMusicWidget(
    @Request() req,
    @Param('musicWidgetId', ParseIntPipe) id: number,
  ): Promise<APIResponse<DeleteMusicWidgetResponse>> {
    await this.musicWidgetService.validateUserHasMusicWidget(req.user.id, id);
    await this.musicWidgetService.deleteMusicWidgetById(id);
    return {
      data: {},
      error: '',
      message: 'success',
      statusCode: 200,
    };
  }

  @Post(':musicWidgetId/upload')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', { dest: env.HOME + '/capstone-media/static' }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadSlideShowImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
    @Param('musicWidgetId', ParseIntPipe) musicWidgetId: number,
  ) {
    await this.musicWidgetService.validateUserHasMusicWidget(
      req.user.id,
      musicWidgetId,
    );
    const result = await this.musicWidgetService.addMusicPath(
      musicWidgetId,
      file.filename,
    );
    return {
      statusCode: 201,
      message: 'success',
      data: result,
      error: '',
    };
  }

  @Delete(':musicWidgetId/upload/:uploadId')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async deleteSlideShowImage(
    @Param('musicWidgetId', ParseIntPipe) musicWidgetId: number,
    @Param('uploadId', ParseIntPipe) uploadId: number,
    @Request() req,
  ) {
    await this.musicWidgetService.validateMusicPathId(musicWidgetId, uploadId);
    await this.musicWidgetService.validateUserHasMusicWidget(
      req.user.id,
      musicWidgetId,
    );
    await this.musicWidgetService.deleteMusicPath(uploadId);
    return {
      message: 'success',
      statusCode: 200,
      error: '',
      data: {},
    };
  }
}
