import Show from "~/shared/ui/Show/Show";

import StarwarsCard from "./ui/StarwarsCard/StarwarsCard";
import useCharactersQuery from "./api/queries/useCharactersQuery";
import StarwarsCardSkeleton from "./ui/StarwarsCardSkeleton/StarwarsCardSkeleton";
import Col from "~/shared/ui/Col/Col";

const ListStartWars = () => {
  const {
    data: charactersResponse,
    isSuccess: isCharactersSucceed,
    isFetching: isCharactersFetching,
  } = useCharactersQuery();

  const { results: charactersList } = charactersResponse ?? {};

  const isNotEmpty = !!charactersList?.length;

  return (
    <Col>
      <h1 className="text-yellow-500 animate-pulse font-extrabold mb-4 text-shadow-md text-shadow-yellow-700 w-max text-5xl">
        Star Wars
      </h1>
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
    </Col>
  );
};

export default ListStartWars;
