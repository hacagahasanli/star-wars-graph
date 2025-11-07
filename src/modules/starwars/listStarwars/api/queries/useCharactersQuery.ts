import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import QueryKeys from "~/business/constants/QueryKeys";

import ListStarwarsRepository from "../repositories/ListStarwars.repo";

import type { ApiErrorResponse } from "~/shared/types/ApiErrorResponse";
import type { AsyncCharactersPreview } from "~/modules/starwars/models/CharacterPreview.model";

type QueryOptions = UseQueryOptions<AsyncCharactersPreview, ApiErrorResponse>;

function fetch() {
  return ListStarwarsRepository.getCharacters();
}

const useCharactersQuery = (options?: QueryOptions) => {
  return useQuery<AsyncCharactersPreview, ApiErrorResponse>({
    queryKey: [QueryKeys.CHARACTER_LIST],
    queryFn: () => fetch(),
    staleTime: 10 * 60 * 1000,
    ...options,
  });
};

export default useCharactersQuery;
