import Show from "~/shared/ui/Show/Show";

import StarwarsCard from "./ui/StarwarsCard/StarwarsCard";
import useCharactersQuery from "./api/queries/useCharactersQuery";
import StarwarsCardSkeleton from "./ui/StarwarsCardSkeleton/StarwarsCardSkeleton";

const ListStartWars = () => {
  const {
    data: charactersResponse,
    isSuccess: isCharactersSucceed,
    isFetching: isCharactersFetching,
  } = useCharactersQuery();

  const { results: charactersList } = charactersResponse ?? {};

  const isNotEmpty = !!charactersList?.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Show when={isCharactersFetching}>
        <StarwarsCardSkeleton />
      </Show>
      <Show when={!isCharactersFetching && isCharactersSucceed && isNotEmpty}>
        {charactersList?.map((character, idx) => (
          <StarwarsCard id={idx + 1} character={character} />
        ))}
      </Show>
    </div>
  );
};

export default ListStartWars;
