import { 
  Body, 
  Controller, 
  Get, 
  Post, 
  UseGuards, 
  Request, 
  HttpCode, 
  HttpStatus,
  UsePipes
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginSchema, LoginDto } from './schemas/auth.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout() {
    // Para JWT, el logout suele manejarse en el cliente descartando el token.
    // Si se requiere invalidación en el servidor, se puede usar Redis para blacklisting.
    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
