import BaseService from "~/shared/services/BaseService/BaseService";

import { generateQuery } from "~/shared/lib/utils/ApiUtils";

import type {
  CharacterPreview,
  AsyncCharactersPreview,
} from "~/modules/starwars/models/CharacterPreview.model";

class ListStarwarsService extends BaseService {
  constructor() {
    super();
  }

  async getCharacters(page = 1): Promise<AsyncCharactersPreview> {
    return await this.get<AsyncCharactersPreview>({
      endpoint: `people?${generateQuery({ page })}`,
    });
  }

  async getPerson(id: string): Promise<CharacterPreview> {
    return await this.get<CharacterPreview>({
      endpoint: `people/${id}`,
    });
  }
}

export default new ListStarwarsService();
