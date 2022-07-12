import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CaslModule } from 'src/casl/casl.module';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [CaslModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, CaslAbilityFactory],
  exports: [UserService],
})
export class UserModule {}
