import type { BaseModel } from "~/business/models/BaseModel";

interface Planet extends BaseModel {
  name: string;
  climate: string;
  gravity: string;
  terrain: string;
  films: string[];
  diameter: string;
  population: string;
  residents: string[];
  surface_water: string;
  orbital_period: string;
  rotation_period: string;
}

export type { Planet };
