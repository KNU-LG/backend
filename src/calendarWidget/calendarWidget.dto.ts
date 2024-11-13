import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from '@prisma/client';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { WidgetCommonDto } from 'src/app.dto';

export class CreateCalendarWidgetRequest {
  @ApiProperty()
  @ValidateNested()
  @Type(() => WidgetCommonDto)
  settingCommon: WidgetCommonDto;
}

export class CreateCalendarWidgetResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  settingCommon: WidgetCommonDto;
  @ApiProperty()
  schedule: Schedule[];
}

export class GetCalendarWidgetResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  settingCommon: WidgetCommonDto;
  @ApiProperty()
  schedule: Schedule[];
}

export class UpdateCalendarWidgetRequest {
  @ApiProperty()
  @ValidateNested()
  @Type(() => WidgetCommonDto)
  settimgCommon: WidgetCommonDto;
}

export class UpdateCalendarWidgetResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  settingCommon: WidgetCommonDto;
  @ApiProperty()
  schedule: Schedule[];
}

export class DeleteCalendarWidgetResponse {}
