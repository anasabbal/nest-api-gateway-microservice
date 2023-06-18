import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersController } from './users.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

const configService = new ConfigService();

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('USER_HOST'),
            port: configService.get('USER_PORT')
          }
        })
      },
      inject: [ConfigService]
    }
  ],
})
export class AppModule {}
