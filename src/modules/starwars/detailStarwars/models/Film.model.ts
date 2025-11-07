import type { BaseModel } from "~/business/models/BaseModel";

interface Film extends BaseModel {
  title: string;
  director: string;
  producer: string;
  planets: string[];
  species: string[];
  episode_id: number;
  vehicles: string[];
  starships: string[];
  release_date: string;
  characters: string[];
  opening_crawl: string;
}

export type { Film };
