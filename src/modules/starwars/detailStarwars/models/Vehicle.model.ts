import type { BaseModel } from "~/business/models/BaseModel";

interface Vehicle extends BaseModel {
  name: string;
  crew: string;
  model: string;
  length: string;
  films: string[];
  pilots: string[];
  passengers: string;
  consumables: string;
  manufacturer: string;
  vehicle_class: string;
  cargo_capacity: string;
  cost_in_credits: string;
  max_atmosphering_speed: string;
}

export type { Vehicle };
