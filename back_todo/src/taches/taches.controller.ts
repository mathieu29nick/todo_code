import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { TachesService } from './taches.service';
import { Taches } from './taches.entity';

@Controller('taches')
export class TachesController {
  constructor(private readonly tachesService: TachesService) {}

  @Post()
  async createTache(@Body() tache: Taches) {
    return this.tachesService.createTache(tache);
  }

  @Get()
  findAll() {
    return this.tachesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tachesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Taches>,
  ) {
    return this.tachesService.updateTache(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tachesService.removeTache(+id);
  }
}
