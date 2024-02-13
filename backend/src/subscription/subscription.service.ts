import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { Magazine } from '../magazine/magazine.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Magazine)
    private magazineRepository: Repository<Magazine>,
  ) {}

  async getSubscription(): Promise<Subscription[]> {
    const subscriptions = await this.subscriptionRepository.find();
    for (const subscription of subscriptions) {
      const magazine = await this.magazineRepository.findOne({where: {id: subscription.magazineId}});
      subscription.magazineName = magazine.name; // add magazine name to subscription
    }
    return subscriptions;
  }

  async subscribe(userId: number, magazineId: number, magazineName: string): Promise<Subscription> {
    const subscription = new Subscription();
    subscription.userId = userId;
    subscription.magazineId = magazineId;
    subscription.status = 'active';
    subscription.magazineName = magazineName
    return this.subscriptionRepository.save(subscription);
  }

  async cancelSubscription(id: number): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({ where: { id: id } });
    subscription.status = 'cancelled';
    subscription.endDate = new Date();
    const magazine = await this.magazineRepository.findOne({ where: { id: subscription.magazineId } });
    magazine.name = magazine.name;
    magazine.description = magazine.description;
    magazine.price = magazine.price;
    magazine.subscribed = false;
    await this.magazineRepository.save(magazine);
    await this.subscriptionRepository.save(subscription);
  }
}
