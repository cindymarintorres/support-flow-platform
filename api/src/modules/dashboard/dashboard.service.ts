import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getMetrics() {
    const [total, open, resolved] = await Promise.all([
      this.prisma.ticket.count(),
      this.prisma.ticket.count({ where: { status: 'OPEN' } }),
      this.prisma.ticket.count({ where: { status: 'RESOLVED' } }),
    ]);

    return {
      total,
      open,
      resolved,
      inProgress: total - open - resolved,
    };
  }
}
