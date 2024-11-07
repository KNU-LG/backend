import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CalendarWidgetService } from './calendarWidget.service';
import { ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from 'src/user/auth.guard';
import {
  CreateCalendarWidgetRequest,
  CreateCalendarWidgetResponse,
  GetCalendarWidgetResponse,
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

  async validateCalendarWidgetId(
    userId: number,
    calendarWidgetId: number,
  ): Promise<boolean> {
    if (
      !(await this.calendarWidgetService.isUserHasCalendarWidget(
        userId,
        calendarWidgetId,
      ))
    ) {
      throw new ForbiddenException({
        data: {},
        message: '잘못된 위젯 접근',
        error: '사용자가 가지고 있는 위젯이 아님',
        statusCode: 403,
      });
    }
    return true;
  }

  @Get(':calendarWidgetId')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async getCalendarWidget(
    @Request() req,
    @Param('calendarWidgetId', ParseIntPipe) id: number,
  ): Promise<APIResponse<GetCalendarWidgetResponse>> {
    await this.validateCalendarWidgetId(req.user.id, id);
    const result = await this.calendarWidgetService.getCalendarWidgetById(id);
    return {
      message: 'success',
      error: '',
      statusCode: 200,
      data: result,
    };
  }
}
