import {
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiBody, ApiConsumes, ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from './user/auth.guard';
import { env } from 'process';
import { APIResponse } from './type';
import { UploadResponse } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getUserAll() {
    return this.appService.getUserAll();
  }

  @Post('upload')
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
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<APIResponse<UploadResponse>> {
    const data = await this.appService.fileDBUpload(
      req.user.id,
      'static/' + file.filename,
    );
    return {
      message: 'success',
      error: '',
      statusCode: 201,
      data: data,
    };
  }

  @Get('widget')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async getWidget(@Request() req) {
    return await this.appService.getWidget(req.user.id);
  }
}
