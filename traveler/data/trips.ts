export interface Region {
  id: string;
  name: string;
  tripCount: number;
}

export interface FeaturedTrip {
  id: string;
  title: string;
  region: string;
  type: "Trek" | "Camp" | "Tour" | "Shared trip";
  durationDays: number;
  pricePerPerson: number;
  spotsLeft: number;
}

/** Regions shown in the horizontal region-browser, placeholder until wired to the API. */
export const regions: Region[] = [
  { id: "doi-inthanon", name: "Doi Inthanon", tripCount: 34 },
  { id: "kanchanaburi", name: "Kanchanaburi highlands", tripCount: 21 },
  { id: "phu-kradueng", name: "Phu Kradueng", tripCount: 18 },
  { id: "khao-yai", name: "Khao Yai", tripCount: 27 },
  { id: "phu-soi-dao", name: "Phu Soi Dao", tripCount: 9 },
  { id: "chiang-dao", name: "Chiang Dao", tripCount: 15 },
];

/** Featured/open trip listings, placeholder until wired to the API. */
export const featuredTrips: FeaturedTrip[] = [
  {
    id: "t-001",
    title: "Doi Inthanon summit weekend",
    region: "Chiang Mai",
    type: "Trek",
    durationDays: 2,
    pricePerPerson: 1450,
    spotsLeft: 4,
  },
  {
    id: "t-002",
    title: "Erawan waterfall camp",
    region: "Kanchanaburi",
    type: "Camp",
    durationDays: 3,
    pricePerPerson: 990,
    spotsLeft: 6,
  },
  {
    id: "t-003",
    title: "Phu Kradueng plateau trek",
    region: "Loei",
    type: "Trek",
    durationDays: 3,
    pricePerPerson: 1200,
    spotsLeft: 2,
  },
  {
    id: "t-004",
    title: "Khao Yai wildlife tour",
    region: "Nakhon Ratchasima",
    type: "Tour",
    durationDays: 1,
    pricePerPerson: 850,
    spotsLeft: 9,
  },
  {
    id: "t-005",
    title: "Sangkhlaburi shared-budget ride",
    region: "Kanchanaburi",
    type: "Shared trip",
    durationDays: 4,
    pricePerPerson: 1600,
    spotsLeft: 3,
  },
  {
    id: "t-006",
    title: "Phu Soi Dao by train and trail",
    region: "Uttaradit",
    type: "Trek",
    durationDays: 3,
    pricePerPerson: 1350,
    spotsLeft: 5,
  },
];
