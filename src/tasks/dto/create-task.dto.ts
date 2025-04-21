import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskStatus } from '../value-objects/take-status.vo';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  employeeName: string;

  @IsNotEmpty()
  @IsString()
  projectName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  startDate: Date;

  @IsNotEmpty()
  @IsNumber()
  estimatedDays: number;
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : null))
  endDate: Date | null;
}
