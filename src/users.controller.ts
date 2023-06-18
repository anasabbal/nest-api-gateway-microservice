import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserCommand } from './command/user.command';
import { UserRegisterResponse } from './command/user.register.response';
import { IServiceUserCreateResponse } from './command/service-user-create-response';
import { firstValueFrom } from 'rxjs';
import { ApiBody, ApiCreatedResponse, ApiParam } from '@nestjs/swagger';


@Controller('users')
export class UsersController{
  constructor(@Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy) {
  }

  @Post()
  @ApiBody({type: UserCommand})
  @ApiCreatedResponse({type: UserRegisterResponse})
  public async register(@Body() userRequest: UserCommand): Promise<UserRegisterResponse>{
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
  @Get(':id')
  @ApiParam({type: String, name: 'id'})
  public async findById(@Param() id: string): Promise<UserRegisterResponse>{

    const userPayload: IServiceUserCreateResponse = await firstValueFrom(
      this.userServiceClient.send('user_get_by_id', id)
    );
    if(userPayload.status != HttpStatus.CREATED){
      throw new HttpException(
        {
          message: userPayload.message,
          data: null,
          errors: userPayload.errors
        }, userPayload.status
      );
    }
    return {
      message: userPayload.message,
      data: { user: userPayload.user},
      errors: null,
    };
  }
}