import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  registerMiddleware() {
    this.$use(async (params: Prisma.MiddlewareParams, next) => {
      console.log('save identification code if not exist');
      if (params.action == 'create' && params.model == 'CarHistory') {
      }
      return await next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
