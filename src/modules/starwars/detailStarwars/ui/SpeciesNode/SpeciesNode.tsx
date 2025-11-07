import InfoLabel from "~/business/ui/InfoLabel/InfoLabel";

import CardNode from "../CardNode/CardNode";

import type { Species } from "../../models/Species.model";

interface SpeciesNodeProps {
  data: Species;
}

const SpeciesNode = ({ data }: SpeciesNodeProps) => {
  return (
    <CardNode tagLabel="Species">
      <InfoLabel label="Name">{data.name}</InfoLabel>
      <InfoLabel label="Classification">{data.classification}</InfoLabel>
      <InfoLabel label="Designation">{data.designation}</InfoLabel>
      <InfoLabel label="Language">{data.language}</InfoLabel>
      <InfoLabel label="Average Height">{data.average_height}</InfoLabel>
      <InfoLabel label="Average Lifespan">{data.average_lifespan}</InfoLabel>
    </CardNode>
  );
};

export default SpeciesNode;
