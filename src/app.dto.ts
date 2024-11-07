import { ApiProperty } from '@nestjs/swagger';
import {
  CalendarWidgetSetting,
  ClockWidgetSetting,
  MusicPlayWidgetSetting,
  WeatherWidgetSetting,
} from '@prisma/client';

export class UploadResponse {
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  path: string;
}

export class GetWidgetResponse {
  clockWidgetSetting: ClockWidgetSetting[];
  calendarWidgetSetting: CalendarWidgetSetting[];
  musicPlayWidgetSetting: MusicPlayWidgetSetting[];
  weatherWidgetSetting: WeatherWidgetSetting[];
}
