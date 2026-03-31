import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tickets/:ticketId/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  create(@Param('ticketId') ticketId: string, @Body() createCommentDto: any, @Request() req) {
    return this.commentsService.create(ticketId, req.user.id, createCommentDto);
  }

  @Get()
  findAll(@Param('ticketId') ticketId: string) {
    return this.commentsService.findByTicket(ticketId);
  }
}
