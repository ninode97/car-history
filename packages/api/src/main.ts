import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

const Helmet = helmet as any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://127.0.0.1:3000',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });
  // const app = await NestFactory.create(AppModule, {
  //   // cors: {
  //   //   origin: 'http://127.0.0.1:3000',
  //   //   credentials: true,
  //   // },
  // });

  //app.use(cookieParser());

  const env = process.env.NODE_ENV;
  const isProduction = env === 'production';

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: !isProduction,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  //app.use(Helmet());
  // app.use(
  //   csurf({
  //     cookie: true,
  //   }),
  // );

  await app.listen(5000);
}
bootstrap();
