import { ApiProperty } from '@nestjs/swagger';

export class UploadResponse {
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  path: string;
}
