import Grid from "~/shared/ui/Grid/Grid";

import StarwarsCard from "./ui/StarwarsCard/StarwarsCard";
import useCharactersQuery from "./api/queries/useCharactersQuery";
import Show from "~/shared/ui/Show/Show";
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
    <Grid container lg={4} md={3} sm={2} xs={1} spacing={4}>
      <Show when={isCharactersFetching}>
        <StarwarsCardSkeleton />
      </Show>
      <Show when={!isCharactersFetching && isCharactersSucceed && isNotEmpty}>
        {charactersList?.map((character, idx) => (
          <StarwarsCard id={idx + 1} character={character} />
        ))}
      </Show>
    </Grid>
  );
};

export default ListStartWars;
