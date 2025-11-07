import DetailStarwarsService from "../services/DetailStarwars.service";

import type { Film } from "../../models/Film.model";
import type { Species } from "../../models/Species.model";
import type { Vehicle } from "../../models/Vehicle.model";
import type { Starship } from "../../models/Starship.model";
import type { CharacterDetails } from "../../models/CharacterDetails.model";

const DetailStarwarsRepository = {
  async getFilms(urls: string[]): Promise<Film[]> {
    return Promise.all(urls.map((url) => DetailStarwarsService.getFilm(url)));
  },

  async getStarships(urls: string[]): Promise<Starship[]> {
    return Promise.all(
      urls.map((url) => DetailStarwarsService.getStarship(url))
    );
  },

  async getVehicles(urls: string[]): Promise<Vehicle[]> {
    return Promise.all(
      urls.map((url) => DetailStarwarsService.getVehicle(url))
    );
  },

  async getSpeciesBatch(urls: string[]): Promise<Species[]> {
    return Promise.all(
      urls.map((url) => DetailStarwarsService.getSpecies(url))
    );
  },

  async getCharacterDetails(id: string): Promise<CharacterDetails> {
    const person = await DetailStarwarsService.getPerson(id);

    const [homeworld, films, starships, vehicles, species] = await Promise.all([
      DetailStarwarsService.getPlanet(person.homeworld),
      this.getFilms(person.films!),
      this.getStarships(person.starships!),
      this.getVehicles(person.vehicles!),
      this.getSpeciesBatch(person.species!),
    ]);

    return {
      ...person,
      films,
      species,
      vehicles,
      homeworld,
      starships,
    };
  },
};

export default DetailStarwarsRepository;
