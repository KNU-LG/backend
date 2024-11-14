import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class AddScheduleRequest {
  @ApiProperty()
  calendarId: number;
  @ApiProperty({ type: Date })
  @IsDateString()
  date: Date;
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
}

export class ScheduleResponse {
  @ApiProperty({ type: Date })
  date: Date;
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
}

export class UpdateScheduleRequest {
  @ApiProperty({ type: Date })
  @IsDateString()
  date: Date;
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
}
