import type { BaseModel } from "~/business/models/BaseModel";
import type { PaginationModel } from "~/business/models/PaginationModel";

export interface CharacterPreview extends BaseModel {
  readonly name: string;
  readonly mass: string;
  readonly height: string;
  readonly gender: string;
  readonly homeworld: string;
  readonly eye_color: string;
  readonly birth_year: string;
  readonly hair_color: string;
  readonly skin_color: string;

  readonly films?: string[];
  readonly species?: string[];
  readonly vehicles?: string[];
  readonly starships?: string[];
}

export type AsyncCharactersPreview = PaginationModel<CharacterPreview>;
