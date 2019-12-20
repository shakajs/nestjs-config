**Install**

```npm i @shaka-time/nestjs-config --save```

**Using**

1. Create config file:
```
import { ConfigDefaultValue } from '@shaka-time/nestjs-config';

export class AppConfig {
  @ConfigDefaultValue(() => process.env.DB_HOST || 'localhost')
  dbHost: string = null;

  @ConfigDefaultValue(() => process.env.DB_PORT || '3306')
  dbPort: string = null;

  @ConfigDefaultValue(() => process.env.DB_USER || 'root')
  dbUser: string = null;
  
  @ConfigDefaultValue(() => process.env.DB_PASSWORD || '')
  dbPassword: string = null;
  
  @ConfigDefaultValue(() => process.env.TOKEN || '')
  token: string = null;
}
```

2. Register created config in root-module:

```
import { Module } from '@nestjs/common';
import { ConfigModule } from '@shaka-time/nestjs-config';
import { AppConfig } from './app.config';

@Module({
  imports: [
    ConfigModule.register(AppConfig),
  ],
})
export class AppModule {}
```

3. Use in service:
```
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@shaka-time/nestjs-config';
import { AppConfig } from '../app.config';

@Injectable()
export class ExampleService {
  constructor(
    private readonly configService: ConfigService<AppConfig>,
  ) {
  }
  
  getTokenFromCongig() {
    return this.configService.config.token;
  }
}
```
