import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { CompanyModule } from './company/company.module';
import { AccountingModule } from './accounting/accounting.module';
import { CarHistoryModule } from './car-history/car-history.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { RedisModule } from './redis/redis.module';
import { REDIS } from './redis/redis.constants';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';
import { RedisClientType } from 'redis';
import * as session from 'express-session';
import * as passport from 'passport';
import * as RedisStore from 'connect-redis';
import * as path from 'path';
import { LangModule } from './lang/lang.module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/lang/i18n/'),
      },
    }),
    LangModule,
    RedisModule,
    CarModule,
    UserModule,
    BrandModule,
    ModelModule,
    CompanyModule,
    AccountingModule,
    CarHistoryModule,
    AuthModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: RedisClientType) {}
  configure(consumer: MiddlewareConsumer) {
    const client = this.redis as any;
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: client,
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: 'redis-secret',
          resave: false,
          cookie: {
            // sameSite: 'none',
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 10,
            secure: false,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
