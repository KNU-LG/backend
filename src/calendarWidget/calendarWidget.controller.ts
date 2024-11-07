import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CalendarWidgetService } from './calendarWidget.service';
import { ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from 'src/user/auth.guard';
import {
  CreateCalendarWidgetRequest,
  CreateCalendarWidgetResponse,
} from './calendarWidget.dto';
import { APIResponse } from 'src/type';

@Controller('widget/calendar')
export class CalendarWidgetController {
  constructor(private calendarWidgetService: CalendarWidgetService) {}

  @Post()
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async createCalendarWidget(
    @Request() req,
    @Body() data: CreateCalendarWidgetRequest,
  ): Promise<APIResponse<CreateCalendarWidgetResponse>> {
    const widget = await this.calendarWidgetService.createCalendarWidget(
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
