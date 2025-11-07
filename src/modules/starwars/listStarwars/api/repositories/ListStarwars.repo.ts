import ListStarwarsService from "../services/ListStarwars.service";

import type { AsyncCharactersPreview } from "~/modules/starwars/models/CharacterPreview.model";

const ListStarwarsRepository = {
  async getCharacters(): Promise<AsyncCharactersPreview> {
    return ListStarwarsService.getCharacters();
  },
};

export default ListStarwarsRepository;
