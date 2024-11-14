import { ApiProperty } from '@nestjs/swagger';
import { WidgetCommonDto } from 'src/app.dto';

export class CreateClockWidgetRequest {
  @ApiProperty()
  settingCommon: WidgetCommonDto;
  @ApiProperty()
  timezone: string;
}

export class CreateClockWidgetResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  settingCommon: WidgetCommonDto;
  @ApiProperty()
  timezone: number;
  @ApiProperty()
  design: string;
}

export class GetClockWidgetResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  settingCommon: WidgetCommonDto;
  @ApiProperty()
  timezone: number;
  @ApiProperty()
  design: string;
}