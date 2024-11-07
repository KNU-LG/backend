import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from '@prisma/client';
import { WidgetCommonDto } from 'src/app.dto';

export class CreateCalendarWidgetRequest {
  @ApiProperty()
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
