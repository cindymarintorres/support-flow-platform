import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { LoginDto, ForgotPasswordDto, ResetPasswordDto } from './schemas/auth.schema';
import { PrismaService } from 'src/prisma/prisma.service';

type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

type AuthUserResponse = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type LoginResponse = {
  access_token: string;
  user: AuthUserResponse;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    //private readonly mailService: MailService,
  ) { }

  // ─── Validate User ───────────────────────────────
  async validateUser(email: string, password: string): Promise<AuthUserResponse> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
  // ─── Login ───────────────────────────────────────
  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const authUser = await this.validateUser(loginDto.email, loginDto.password);

    const payload: JwtPayload = {
      sub: authUser.id,
      email: authUser.email,
      role: authUser.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: authUser,
    };
  }

  // ─── Generate Reset Token for email───────────────────────────────
  private generateResetToken(): string {
    return crypto.randomBytes(32).toString('hex')
  }

  // ─── Forgot Password ─────────────────────────────
  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(dto.email)

    if (!user || !user.isActive) {
      return { message: 'Si el correo existe, recibirás un email' }
    }

    const token = this.generateResetToken()  // ← método privado

    await this.prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      }
    })

    //await this.mailService.sendPasswordReset(user.email, token)

    return { message: 'Si el correo existe, recibirás un email' }
  }

  // ─── Reset Password ───────────────────────────────
  async resetPassword(dto: ResetPasswordDto) {
    const resetRecord = await this.prisma.passwordResetToken.findUnique({
      where: { token: dto.token }
    })

    if (!resetRecord) {
      throw new BadRequestException('Token inválido')
    }

    if (resetRecord.expiresAt < new Date()) {
      throw new BadRequestException('El token expiró, solicita uno nuevo')
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10)

    await this.usersService.updatePassword(resetRecord.userId, hashedPassword)

    await this.prisma.passwordResetToken.delete({
      where: { token: dto.token }
    })

    return { message: 'Contraseña actualizada correctamente' }
  }
}