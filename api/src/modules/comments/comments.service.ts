import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(ticketId: string, userId: string, data: any) {
    return { message: 'Comment creation not yet implemented' };
  }

  async findByTicket(ticketId: string) {
    return this.prisma.ticketComment.findMany({
      where: { ticketId },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
  }
}
