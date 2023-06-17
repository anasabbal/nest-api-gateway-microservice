import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserCommand } from './command/user.command';
import { UserSignupResponse } from './command/user.signup.response';
import { IServiceUserCreateResponse } from './command/service-user-create-response';
import { firstValueFrom } from 'rxjs';


@Controller('users')
export class UsersController{
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) {
  }

  @Post()
  public async createUser(@Body() userRequest: UserCommand): Promise<UserSignupResponse>{
    const createUserResponse: IServiceUserCreateResponse = await firstValueFrom(
      this.userServiceClient.send('user-create', userRequest)
    );
    if(createUserResponse.status != HttpStatus.CREATED){
      throw new HttpException(
        {
          message: createUserResponse.message,
          data: null,
          errors: createUserResponse.errors
        }, createUserResponse.status
      );
    }
    return {
      message: createUserResponse.message,
      data: { user: createUserResponse.user},
      errors: null,
    };
  }
}