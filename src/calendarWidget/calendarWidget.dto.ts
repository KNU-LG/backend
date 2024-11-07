import { ApiProperty } from '@nestjs/swagger';
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
}
