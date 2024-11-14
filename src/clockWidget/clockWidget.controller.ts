import {
    Controller,
    Post,
    Body,
    Request,
    UseGuards
} from '@nestjs/common';
import { ClockWidgetService } from './clockWidget.service';
import { APIResponse } from 'src/type';
import { ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from 'src/user/auth.guard';
import { 
    CreateClockWidgetResponse,
    CreateClockWidgetRequest,
 } from './clockWidget.dto';

@Controller('widget/clock')
export class ClockWidgetController {
    constructor(private readonly clockWidgetService: ClockWidgetService) {}

    @Post('add')
    @ApiSecurity('authorization')
    @UseGuards(AuthGuard)
    async createClockWidget(
      @Request() req,
      @Body() data: CreateClockWidgetRequest,
    ): Promise<APIResponse<CreateClockWidgetResponse>> {
      const widget = await this.clockWidgetService.createClockWidget(
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
  }