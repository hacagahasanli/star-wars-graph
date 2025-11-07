import type { BaseModel } from "~/business/models/BaseModel";

interface Starship extends BaseModel {
  name: string;
  crew: string;
  MGLT: string;
  model: string;
  length: string;
  films: string[];
  pilots: string[];
  passengers: string;
  consumables: string;
  manufacturer: string;
  cargo_capacity: string;
  starship_class: string;
  cost_in_credits: string;
  hyperdrive_rating: string;
  max_atmosphering_speed: string;
}

export type { Starship };
