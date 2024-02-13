import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { MagazineService } from './magazine.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Magazine Controller')
@Controller('magazines')
export class MagazineController {
  constructor(private readonly magazineService: MagazineService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new magazine' })
  @ApiBody({ description: 'The magazine details', type: 'object', required: true })
  createMagazine(@Body('name') name: string, @Body('description') description: string, @Body('price') price: number) {
    return this.magazineService.createMagazine(name, description, price);
  }

  @Get()
  @ApiOperation({ summary: 'Get all magazines' })
  getMagazines() {
    return this.magazineService.getMagazines();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a magazine' })
  @ApiParam({ name: 'id', required: true, description: 'The id of the magazine to update' })
  @ApiBody({ description: 'The new magazine details', type: 'object', required: true })
  updateMagazine(@Param('id') id: number, @Body('name') name: string, @Body('description') description: string, @Body('price') price: number, @Body('subscribed') subscribed: boolean) {
    return this.magazineService.updateMagazine(id, name, description, price, subscribed);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a magazine' })
  @ApiParam({ name: 'id', required: true, description: 'The id of the magazine to delete' })
  softDeleteMagazine(@Param('id') id: number) {
    return this.magazineService.softDeleteMagazine(id);
  }
}
