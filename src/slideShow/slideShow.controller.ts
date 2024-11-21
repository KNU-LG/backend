import { Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from 'src/user/auth.guard';

@Controller('slide-show')
export class SlideShowController {
  @Get()
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async getSlideShow(@Request() req) {}

  @Put()
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async updateSlideShow() {}

  @Post('image')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async uploadSlideShowImage() {}

  @Post('image/:imageId')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async deleteSlideShowImage() {}
}
