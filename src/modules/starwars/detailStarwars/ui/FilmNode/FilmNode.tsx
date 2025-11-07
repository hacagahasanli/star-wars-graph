import InfoLabel from "~/business/ui/InfoLabel/InfoLabel";

import CardNode from "../CardNode/CardNode";

import type { Film } from "../../models/Film.model";

interface FilmNodeProps {
  data: Film;
}

const FilmNode = ({ data }: FilmNodeProps) => {
  return (
    <CardNode>
      <InfoLabel label="Title">{data.title}</InfoLabel>
      <InfoLabel label="Episode">{data.episode_id}</InfoLabel>
      <InfoLabel label="Director">{data.director}</InfoLabel>
      <InfoLabel label="Release Date">{data.release_date}</InfoLabel>
    </CardNode>
  );
};

export default FilmNode;
