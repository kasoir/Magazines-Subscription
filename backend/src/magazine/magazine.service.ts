import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Magazine } from './magazine.entity';

@Injectable()
export class MagazineService {
  constructor(
    @InjectRepository(Magazine)
    private magazineRepository: Repository<Magazine>,
  ) {}

  async createMagazine(name: string, description: string, price: number): Promise<Magazine> {
    const magazine = new Magazine();
    magazine.name = name;
    magazine.description = description;
    magazine.price = price;
    return this.magazineRepository.save(magazine);
  }

  async getMagazines(): Promise<Magazine[]> {
    return this.magazineRepository.find({ where: { deletedAt: null } });
  }

  async updateMagazine(id: number, name: string, description: string, price: number, subscribed: boolean): Promise<Magazine> {
    const magazine = await this.magazineRepository.findOne({ where: { id: id } });
    magazine.name = name;
    magazine.description = description;
    magazine.price = price;
    magazine.subscribed = subscribed;
    return this.magazineRepository.save(magazine);
  }

  async softDeleteMagazine(id: number): Promise<void> {
    const magazine = await this.magazineRepository.findOne({ where: { id: id } });
    magazine.deletedAt = new Date();
    await this.magazineRepository.save(magazine);
  }
}
