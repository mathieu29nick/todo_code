import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('taches')
export class Taches {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ default: 1 })
  status: number;
}
