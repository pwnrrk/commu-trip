import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TripDifficulty, TripStatus, TripType } from '../../common/enums';
import { Booking } from '../../bookings/entities/booking.entity';

/** A trip listing: a camp, trek, shared-budget trip or provider tour. */
@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Index()
  @Column({ type: 'enum', enum: TripType })
  type: TripType;

  @Column({ type: 'enum', enum: TripDifficulty, default: TripDifficulty.EASY })
  difficulty: TripDifficulty;

  @Index()
  @Column({ type: 'enum', enum: TripStatus, default: TripStatus.OPEN })
  status: TripStatus;

  @Index()
  @Column({ length: 200 })
  location: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  meetingPoint: string | null;

  @Index()
  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  pricePerPerson: number;

  @Column({ length: 3, default: 'THB' })
  currency: string;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'int', default: 0 })
  bookedSeats: number;

  @Column({ type: 'varchar', nullable: true })
  coverImageUrl: string | null;

  @Column({ type: 'text', array: true, default: () => "'{}'" })
  tags: string[];

  /** MongoDB user id of the traveler or provider who posted the trip. */
  @Index()
  @Column()
  organizerId: string;

  @OneToMany(() => Booking, (booking) => booking.trip)
  bookings: Booking[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}


