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
  UseGuards,
} from '@nestjs/common';
import { CalendarWidgetService } from './calendarWidget.service';
import { ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from 'src/user/auth.guard';
import {
  CreateCalendarWidgetRequest,
  CreateCalendarWidgetResponse,
  DeleteCalendarWidgetResponse,
  GetCalendarWidgetResponse,
  UpdateCalendarWidgetRequest,
  UpdateCalendarWidgetResponse,
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

  @Get(':calendarWidgetId')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async getCalendarWidget(
    @Request() req,
    @Param('calendarWidgetId', ParseIntPipe) id: number,
  ): Promise<APIResponse<GetCalendarWidgetResponse>> {
    await this.calendarWidgetService.validateUserHasCalendarWidget(
      req.user.id,
      id,
    );
    const result = await this.calendarWidgetService.getCalendarWidgetById(id);
    return {
      message: 'success',
      error: '',
      statusCode: 200,
      data: result,
    };
  }

  @Put(':calendarWidgetId')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async updateCalendarWidget(
    @Request() req,
    @Body() data: UpdateCalendarWidgetRequest,
    @Param('calendarWidgetId', ParseIntPipe) id: number,
  ): Promise<APIResponse<UpdateCalendarWidgetResponse>> {
    await this.calendarWidgetService.validateUserHasCalendarWidget(
      req.user.id,
      id,
    );
    const result = await this.calendarWidgetService.updateCalendarWidgetById(
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

  @Delete(':calendarWidgetId')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async deleteCalendarWidget(
    @Request() req,
    @Param('calendarWidgetId', ParseIntPipe) id: number,
  ): Promise<APIResponse<DeleteCalendarWidgetResponse>> {
    await this.calendarWidgetService.validateUserHasCalendarWidget(
      req.user.id,
      id,
    );
    await this.calendarWidgetService.deleteCalendarWidgetById(id);
    return {
      data: {},
      error: '',
      message: 'success',
      statusCode: 200,
    };
  }
}
