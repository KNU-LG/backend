import { ApiProperty } from "@nestjs/swagger";

export class UserRequest {
    @ApiProperty()
    loginId: string;
    @ApiProperty()
    passWord: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    name: string; 
}