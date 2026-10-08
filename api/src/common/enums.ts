/** Kind of trip a traveler can discover or post. */
export enum TripType {
  CAMPING = 'camping',
  TREKKING = 'trekking',
  SHARED_BUDGET = 'shared_budget',
  TOUR = 'tour',
}

/** Physical difficulty of a trip, from a relaxed camp to a hard trek. */
export enum TripDifficulty {
  EASY = 'easy',
  MODERATE = 'moderate',
  HARD = 'hard',
}

/** Lifecycle of a trip listing. Only `OPEN` trips are visible to travelers. */
export enum TripStatus {
  DRAFT = 'draft',
  OPEN = 'open',
  FULL = 'full',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
}

/** Lifecycle of a traveler's booking on a trip. */
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  REJECTED = 'rejected',
}

/** Role of a platform user. A user may hold several roles. */
export enum UserRole {
  TRAVELER = 'traveler',
  PROVIDER = 'provider',
  DRIVER = 'driver',
}


