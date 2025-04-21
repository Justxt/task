import { IsOptional, IsDateString } from 'class-validator';

export class FilterTasksDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  delayed?: boolean;
}
