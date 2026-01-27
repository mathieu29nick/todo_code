import { Injectable, NotFoundException } from '@nestjs/common';
import { Taches } from './taches.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TachesService {
  constructor(
    @InjectRepository(Taches)
    private readonly tacheRepository: Repository<Taches>
  ){}

  async createTache(body: Taches): Promise<string> {
    try {
      const tache = this.tacheRepository.create(body);
      await this.tacheRepository.save(tache);
      return `La tâche ${tache.title} a été postée`;
    } catch (error) {
      console.error(error);
      throw new Error('Impossible de créer cette tâche');
    }
  }

  async findAll(): Promise<Taches[]> {
    return this.tacheRepository.find();
  }

  async findOne(id: number): Promise<Taches> {
    const tache = await this.tacheRepository.findOne({
      where: { id },
    });
    if (!tache) {
      throw new NotFoundException(`Tâche ${id} introuvable`);
    }
    return tache;
  }

  async updateTache(id: number, body: Partial<Taches>): Promise<Taches> {
    const tache = await this.findOne(id);

    const updated = this.tacheRepository.merge(tache, body);
    return this.tacheRepository.save(updated);
  }

  async removeTache(id: number): Promise<void> {
    const result = await this.tacheRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Tâche ${id} introuvable`);
    }
  }
}
