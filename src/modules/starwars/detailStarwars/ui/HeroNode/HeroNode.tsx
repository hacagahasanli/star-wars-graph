import InfoLabel from "~/business/ui/InfoLabel/InfoLabel";

import CardNode from "../CardNode/CardNode";

interface HeroNodeData {
  name: string;
  gender: string;
  homeworld: string;
  birth_year: string;
}

interface HeroNodeProps {
  data: HeroNodeData;
}

const HeroNode = ({ data }: HeroNodeProps) => {
  return (
    <CardNode className="border-yellow-500 bg-yellow-900/20 group-hover:bg-yellow-900/30 shadow-lg shadow-yellow-500/20">
      <InfoLabel label="Name">{data.name}</InfoLabel>
      <InfoLabel label="Gender">{data.gender}</InfoLabel>
      <InfoLabel label="Birth Year">{data.birth_year}</InfoLabel>
      <InfoLabel label="Homeworld">{data.homeworld}</InfoLabel>
    </CardNode>
  );
};

export default HeroNode;
