import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';
import { TripDifficulty } from '../../common/enums';

/** Payload a traveler sends to post a shared-budget trip. */
export class CreateSharedTripDto {
  @IsString()
  @Length(3, 200)
  title: string;

  @IsString()
  @Length(10, 5000)
  description: string;

  @IsOptional()
  @IsEnum(TripDifficulty)
  difficulty?: TripDifficulty;

  @IsString()
  @Length(2, 200)
  location: string;

  @IsOptional()
  @IsString()
  @Length(2, 200)
  meetingPoint?: string;

  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;

  /** Each traveler's expected share of the total budget. */
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  pricePerPerson: number;

  /** Total seats including the organizer. */
  @Type(() => Number)
  @IsInt()
  @Min(2)
  capacity: number;

  @IsOptional()
  @IsUrl()
  coverImageUrl?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  tags?: string[];
}


