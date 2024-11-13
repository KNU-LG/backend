import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CalendarWidgetService } from 'src/calendarWidget/calendarWidget.service';
import { ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from 'src/user/auth.guard';
import {
  AddScheduleRequest,
  ScheduleResponse,
  UpdateScheduleRequest,
} from './schedule.dto';
import { APIResponse } from 'src/type';

@Controller('schedule')
export class ScheduleController {
  constructor(
    private scheduleService: ScheduleService,
    private calendarWidgetService: CalendarWidgetService,
  ) {}

  @Get()
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async getSchedule(
    @Query('calendarId', ParseIntPipe) calendarId: number,
    @Request() req,
  ): Promise<APIResponse<ScheduleResponse[]>> {
    await this.calendarWidgetService.validateUserHasCalendarWidget(
      req.user.id,
      calendarId,
    );
    const response = await this.scheduleService.getByCalendarId(calendarId);
    return {
      data: response,
      error: '',
      message: 'success',
      statusCode: 200,
    };
  }

  @Post()
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async addSchedule(
    @Body() addScheduleRequest: AddScheduleRequest,
    @Request() req,
  ): Promise<APIResponse<ScheduleResponse>> {
    await this.calendarWidgetService.validateUserHasCalendarWidget(
      req.user.id,
      addScheduleRequest.calendarId,
    );
    const result = await this.scheduleService.addSchedule(
      req.user.id,
      addScheduleRequest,
    );
    return {
      data: result,
      error: '',
      message: 'success',
      statusCode: 201,
    };
  }

  @Put(':scheduleId')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async updateSchedule(
    @Body() updateScheduleRequest: UpdateScheduleRequest,
    @Param('scheduleId', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<APIResponse<ScheduleResponse>> {
    await this.scheduleService.validateUserHasSchedule(req.user.id, id);
    return {
      message: 'success',
      error: '',
      statusCode: 200,
      data: await this.scheduleService.updateSchedule(
        id,
        updateScheduleRequest,
      ),
    };
  }

  @Delete(':scheduleId')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async deleteSchedule(
    @Param('scheduleId', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<APIResponse<object>> {
    await this.scheduleService.validateUserHasSchedule(req.user.id, id);
    await this.scheduleService.deleteSchedule(id);
    return {
      message: 'success',
      error: '',
      statusCode: 200,
      data: {},
    };
  }
}
