import { ApiProperty } from '@nestjs/swagger';

export class UserCommand {

  @ApiProperty({
    uniqueItems: true,
    example: 'test1@gmail.com'
  })
  email: string;
  @ApiProperty({
    minLength: 6,
    example: 'test1@3'
  })
  password: string;
}