import type { BaseModel } from "~/business/models/BaseModel";

interface Species extends BaseModel {
  name: string;
  films: string[];
  language: string;
  people: string[];
  eye_colors: string;
  designation: string;
  skin_colors: string;
  hair_colors: string;
  classification: string;
  average_height: string;
  average_lifespan: string;
  homeworld: string | null;
}

export type { Species };
