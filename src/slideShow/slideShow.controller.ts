import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from 'src/user/auth.guard';
import { SlideShowService } from './slideShow.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { env } from 'process';

@Controller('slide-show')
export class SlideShowController {
  constructor(private slideShowService: SlideShowService) {}

  @Get()
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async getSlideShow(@Request() req) {
    const id = req.user.id;
    return {
      statusCode: 200,
      error: '',
      message: 'success',
      data: await this.slideShowService.getSlideShow(id),
    };
  }

  @Post('image')
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
  ) {
    const slideShow = (await this.slideShowService.getSlideShow(req.user.id))
      .id;
    const result = await this.slideShowService.addSlideShowImage(
      slideShow,
      file.filename,
    );
    return {
      statusCode: 201,
      message: 'success',
      data: result,
      error: '',
    };
  }

  @Delete('image/:imageId')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async deleteSlideShowImage(
    @Param('imageId', ParseIntPipe) id: number,
    @Request() req,
  ) {
    await this.slideShowService.validateSlideShowImageId(req.user.id, id);
    await this.slideShowService.deleteSlideShowImage(id);
    return {
      message: 'success',
      statusCode: 200,
      error: '',
      data: {},
    };
  }
}
