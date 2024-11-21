import { ApiProperty } from '@nestjs/swagger';
import { MusicPath } from '@prisma/client';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { WidgetCommonDto } from 'src/app.dto';

export class CreateMusicWidgetRequest {
  @ApiProperty()
  @ValidateNested()
  @Type(() => WidgetCommonDto)
  settingCommon: WidgetCommonDto;
}

export class CreateMusicWidgetResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  settingCommon: WidgetCommonDto;
  @ApiProperty()
  musicPath: MusicPath[];
}

export class GetMusicWidgetResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  settingCommon: WidgetCommonDto;
  @ApiProperty()
  musicPath: MusicPath[];
}

export class UpdateMusicWidgetRequest {
  @ApiProperty()
  @ValidateNested()
  @Type(() => WidgetCommonDto)
  settimgCommon: WidgetCommonDto;
}

export class UpdateMusicWidgetResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  settingCommon: WidgetCommonDto;
  @ApiProperty()
  musicPath: MusicPath[];
}

export class DeleteMusicWidgetResponse {}
