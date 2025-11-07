import { Link } from "react-router-dom";

import Col from "~/shared/ui/Col/Col";
import Row from "~/shared/ui/Row/Row";

import Paths from "~/resources/constants/Paths";

import InfoLabel from "~/business/ui/InfoLabel/InfoLabel";

import StarwarsCardOverlay from "../StarwarsCardOverlay/StarwarsCardOverlay";

import type { CharacterPreview } from "~/modules/starwars/models/CharacterPreview.model";

interface StarwarsCardProps {
  id: number;
  character: CharacterPreview;
}

const StarwarsCard = ({ id, character }: StarwarsCardProps) => {
  return (
    <Link
      className="group relative outline-none"
      to={`${Paths.LIST_STARWARS_GENERIC}/${id}`}
    >
      <article className="p-5 border-2 border-gray-70 rounded-[21px] bg-gray-80 transition-colors duration-300 group-hover:bg-gray-70 cursor-pointer">
        <Row spacing={7} alignItems="flex-start">
          <Col spacing={2} className="shrink-0 flex-1">
            <InfoLabel label="Name">{character.name}</InfoLabel>
            <InfoLabel label="Gender">{character.gender}</InfoLabel>
            <InfoLabel label="Height">{character.height}</InfoLabel>
            <InfoLabel label="Birth Year">{character.birth_year}</InfoLabel>
          </Col>
        </Row>
      </article>
      <StarwarsCardOverlay character={character} />
    </Link>
  );
};

export default StarwarsCard;
