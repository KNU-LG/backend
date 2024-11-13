import { ApiProperty } from '@nestjs/swagger';
import {
  CalendarWidgetSetting,
  ClockWidgetSetting,
  MusicPlayWidgetSetting,
  WeatherWidgetSetting,
  WidgetColor,
  WidgetSize,
} from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UploadResponse {
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  path: string;
}

export class GetWidgetResponse {
  @ApiProperty()
  clockWidgetSetting: ClockWidgetSetting[];
  @ApiProperty()
  calendarWidgetSetting: CalendarWidgetSetting[];
  @ApiProperty()
  musicPlayWidgetSetting: MusicPlayWidgetSetting[];
  @ApiProperty()
  weatherWidgetSetting: WeatherWidgetSetting[];
}

export class WidgetCommonDto {
  @ApiProperty()
  positionX: number;
  @ApiProperty()
  positionY: number;
  @ApiProperty({ enum: WidgetSize })
  @IsEnum(WidgetSize)
  size: WidgetSize;
  @ApiProperty({ enum: WidgetColor })
  @IsEnum(WidgetColor)
  color: WidgetColor;
}
