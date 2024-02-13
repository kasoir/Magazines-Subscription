import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  magazineId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column()
  status: string;

  @Column()
  magazineName: string;
}
