import BaseService from "~/shared/services/BaseService/BaseService";

import type { Film } from "../../models/Film.model";
import type { Planet } from "../../models/Planet.model";
import type { Species } from "../../models/Species.model";
import type { Vehicle } from "../../models/Vehicle.model";
import type { Starship } from "../../models/Starship.model";

import type { CharacterPreview } from "~/modules/starwars/models/CharacterPreview.model";

class ListStarwarsService extends BaseService {
  constructor() {
    super();
  }
  async getPerson(id: string): Promise<CharacterPreview> {
    return this.get({
      endpoint: `people/${id}`,
    });
  }

  async getPlanet(url: string): Promise<Planet> {
    return this.api.get<Planet>(url).then((o) => o.data);
  }

  async getFilm(url: string): Promise<Film> {
    return this.api.get<Film>(url).then((o) => o.data);
  }

  async getStarship(url: string): Promise<Starship> {
    return this.api.get<Starship>(url).then((o) => o.data);
  }

  async getSpecies(url: string): Promise<Species> {
    return this.api.get<Species>(url).then((o) => o.data);
  }

  async getVehicle(url: string): Promise<Vehicle> {
    return this.api.get<Vehicle>(url).then((o) => o.data);
  }
}

export default new ListStarwarsService();
