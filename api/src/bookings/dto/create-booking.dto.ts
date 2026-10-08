import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

/** Payload a traveler sends to book seats on a trip. */
export class CreateBookingDto {
  @IsInt()
  @Min(1)
  @Max(20)
  seats: number = 1;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}


