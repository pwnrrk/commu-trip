import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PaginationQueryDto } from '../../common/pagination-query.dto';
import { TripDifficulty, TripType } from '../../common/enums';

/** Filters for browsing open trips. */
export class ListTripsQueryDto extends PaginationQueryDto {
  /** Free-text match against title, description and location. */
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TripType)
  type?: TripType;

  @IsOptional()
  @IsEnum(TripDifficulty)
  difficulty?: TripDifficulty;

  @IsOptional()
  @IsString()
  location?: string;

  /** Only trips starting on or after this date. */
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startFrom?: Date;

  /** Only trips starting on or before this date. */
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startTo?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;
}


