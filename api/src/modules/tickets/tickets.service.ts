import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, userId: string) {
    // Placeholder para creación de ticket
    return { message: 'Ticket creation not yet implemented' };
  }

  async findAll(filters: any) {
    return this.prisma.ticket.findMany({
      include: { category: true, createdBy: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.ticket.findUnique({
      where: { id },
      include: { category: true, createdBy: true, assignedTo: true },
    });
  }
}
