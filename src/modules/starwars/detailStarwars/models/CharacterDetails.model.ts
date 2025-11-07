import type { Film } from "./Film.model";
import type { Planet } from "./Planet.model";
import type { Species } from "./Species.model";
import type { Starship } from "./Starship.model";
import type { Vehicle } from "./Vehicle.model";

import type { CharacterPreview } from "../../models/CharacterPreview.model";

interface CharacterDetails
  extends Omit<
    CharacterPreview,
    "homeworld" | "films" | "starships" | "vehicles" | "species"
  > {
  films: Film[];
  homeworld: Planet;
  species: Species[];
  vehicles: Vehicle[];
  starships: Starship[];
}

export type { CharacterDetails };
