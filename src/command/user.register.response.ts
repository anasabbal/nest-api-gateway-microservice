import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterResponse {
  @ApiProperty({
    example: 'user_create_success'
  })
  message: string;

  @ApiProperty({
    example: {
      user: {
        email: 'test@denrox.com',
        is_confirmed: false,
        id: '5d987c3bfb881ec86b476bcc',
      },
    },
    nullable: true,
  })
  data: {
    user: {};
  };

  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}