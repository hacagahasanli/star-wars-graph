import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import QueryKeys from "~/business/constants/QueryKeys";

import DetailStarwarsRepository from "../repositories/DetailStarwars.repo";

import type { ApiErrorResponse } from "~/shared/types/ApiErrorResponse";

import type { CharacterDetails } from "../../models/CharacterDetails.model";

type QueryOptions = UseQueryOptions<CharacterDetails, ApiErrorResponse>;

function fetch(id: string) {
  return DetailStarwarsRepository.getCharacterDetails(id);
}

const useCharacterDetailsQuery = (id: string, options?: QueryOptions) => {
  return useQuery<CharacterDetails, ApiErrorResponse>({
    queryKey: [QueryKeys.CHARACTER_DETAILS, id],
    queryFn: () => fetch(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    ...options,
  });
};

export default useCharacterDetailsQuery;
