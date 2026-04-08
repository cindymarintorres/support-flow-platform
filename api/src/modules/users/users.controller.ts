import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserSchema, CreateUserDto, UpdateUserSchema, UpdateUserDto } from './schemas/user.schema';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRoleValues } from 'src/common/enums/user-role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRoleValues.ADMINISTRADOR)
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  create(@Body() createUserDto: CreateUserDto) { //Create User
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(UserRoleValues.ADMINISTRADOR)
  findAll() { //List Users
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(UserRoleValues.ADMINISTRADOR)
  findOne(@Param('id') id: string) { //Get User by Id
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @Roles(UserRoleValues.ADMINISTRADOR)
  @UsePipes(new ZodValidationPipe(UpdateUserSchema))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) { //Update User
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRoleValues.ADMINISTRADOR)
  remove(@Param('id') id: string) { //Delete User
    return this.usersService.remove(id);
  }
}