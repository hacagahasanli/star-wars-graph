import InfoLabel from "~/business/ui/InfoLabel/InfoLabel";

import CardNode from "../CardNode/CardNode";

import type { Starship } from "../../models/Starship.model";

interface StarshipNodeProps {
  data: Starship;
}

const StarshipNode = ({ data }: StarshipNodeProps) => {
  return (
    <CardNode>
      <InfoLabel label="Name">{data.name}</InfoLabel>
      <InfoLabel label="Model">{data.model}</InfoLabel>
      <InfoLabel label="Class">{data.starship_class}</InfoLabel>
      <InfoLabel label="Manufacturer">{data.manufacturer}</InfoLabel>
      <InfoLabel label="Crew">{data.crew}</InfoLabel>
      <InfoLabel label="Hyperdrive Rating">{data.hyperdrive_rating}</InfoLabel>
    </CardNode>
  );
};

export default StarshipNode;
