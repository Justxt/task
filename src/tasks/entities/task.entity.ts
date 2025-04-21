import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../value-objects/take-status.vo';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeName: string;

  @Column()
  projectName: string;

  @Column()
  description: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column()
  estimatedDays: number;

  @Column({
    type: 'simple-enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({ type: 'date', nullable: true })
  endDate: Date | null;

  // Este campo se calculará en el servicio
  delayedDays?: number;
}
