import {
    Controller,
    Post,
    Body,
    Request,
    UseGuards,
    ForbiddenException,
    ParseIntPipe,
    Param,
    Get,
    Put,
} from '@nestjs/common';
import { ClockWidgetService } from './clockWidget.service';
import { APIResponse } from 'src/type';
import { ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from 'src/user/auth.guard';
import { 
    CreateClockWidgetResponse,
    CreateClockWidgetRequest,
    GetClockWidgetResponse,
    UpdateClockWidgetRequest,
    UpdateClockWidgetResponse,
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

    async validateClockWidgetId(
      userId: number,
      clockWidgetId: number,
    ): Promise<boolean> {
      if (
        !(await this.clockWidgetService.isUserHasClockWidget(
          userId,
          clockWidgetId,
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

    @Get(':clockWidgetId')
    @ApiSecurity('authorization')
    @UseGuards(AuthGuard)
    async getClockWidget(
      @Request() req,
      @Param('clockWidgetId', ParseIntPipe) id: number,
    ): Promise<APIResponse<GetClockWidgetResponse>> {
      await this.validateClockWidgetId(req.user.id, id);
      const result = await this.clockWidgetService.getClockWidgetById(id);
      return {
        message: 'success',
        error: '',
        statusCode: 200,
        data: result,
      };
    }

    @Put(':clockWidgetId')
    @ApiSecurity('authorization')
    @UseGuards(AuthGuard)
    async updateClockWidget(
      @Request() req,
      @Body() data: UpdateClockWidgetRequest,
      @Param('clockWidgetId', ParseIntPipe) id: number,
    ): Promise<APIResponse<UpdateClockWidgetResponse>> {
      await this.validateClockWidgetId(req.user.id, id);
      const result = await this.clockWidgetService.updateClockWidgetById(
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
  }