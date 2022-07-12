import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from 'src/local.gurad';
import { LoggedInGuard } from 'src/logged-in.guard';

import { AuthService } from './auth.service';
import { Public } from './decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post('login')
  loginUser(@Req() req) {
    if (!req.user) throw new BadRequestException();
    return req.user;
  }

  @UseGuards(LoggedInGuard)
  @Get('current')
  currentUser(@Req() req) {
    return req.user;
  }

  @UseGuards(LoggedInGuard)
  @Post('logout')
  async logout(@Req() req, @Res() res) {
    try {
      await this.authService.destroySession(req, res);
      return res.status(200).json({});
    } catch (error) {
      throw error;
    }
  }
}
