import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExchangeRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  exchangeAmount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  exchangeRate: number;

  @Column()
  date: string;
}
