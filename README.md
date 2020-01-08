![GitHub Workflow Status](https://img.shields.io/github/workflow/status/shakajs/nestjs-config/Publish)
![GitHub](https://img.shields.io/github/license/shakajs/nestjs-config)
[![install size](https://packagephobia.now.sh/badge?p=@shakajs/nestjs-config)](https://packagephobia.now.sh/result?p=@shakajs/nestjs-config)
[![npm (scoped)](https://img.shields.io/npm/v/@shakajs/nestjs-config.svg)](https://www.npmjs.com/package/@shakajs/nestjs-config)
[![Known Vulnerabilities](https://snyk.io/test/github/shakajs/nestjs-config/badge.svg?targetFile=package.json)](https://snyk.io/test/github/shakajs/nestjs-config?targetFile=package.json)
[![DeepScan grade](https://deepscan.io/api/teams/6650/projects/8686/branches/108718/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=6650&pid=8686&bid=108718)

**Install**

```npm i @shakajs/nestjs-config --save```

**Using**

***1. Create config file:***

```
import { ConfigDefaultValue } from '@shakajs/nestjs-config';

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

***2. Register created config in root-module:***

```
import { Module } from '@nestjs/common';
import { ConfigModule } from '@shakajs/nestjs-config';
import { AppConfig } from './app.config';

@Module({
  imports: [
    ConfigModule.register(AppConfig),
  ],
})
export class AppModule {}
```

***3. Use in service:***

```
import { Injectable } from '@nestjs/common';
import { AppConfig } from '../app.config';
import { InjectConfig } from '@shakajs/nestjs-config';

@Injectable()
export class ExampleService {
  constructor(
    @InjectConfig() private readonly config: AppConfig,
  ) {
  }
  
  getTokenFromCongig() {
    return this.config.token;
  }
}
```

***4. Use in custom provider:***

```
import { APP_CONFIG } from '@shakajs/nestjs-config';

...

providers: [  
  {
    provide: 'SOME_VALUE',
    useFactory: (config: AppConfig) => {
      return config.someKey;
    },
    inject: [APP_CONFIG],
  }
],
```
