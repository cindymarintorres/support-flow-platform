import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: any, @Request() req) {
    return this.ticketsService.create(createTicketDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }
}
