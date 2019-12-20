import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({})
export class ConfigModule {
  static register(...schemas: Array<{ new (): any }>) {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: ConfigService,
          useFactory: () => {
            const configService = new ConfigService();
            configService.load(...schemas);
            return configService;
          },
        },
      ],
      exports: [ConfigService],
    } as DynamicModule;
  }
}
