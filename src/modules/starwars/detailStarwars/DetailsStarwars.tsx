import { useNavigate, useParams } from "react-router-dom";

import Col from "~/shared/ui/Col/Col";
import Row from "~/shared/ui/Row/Row";
import Icon from "~/shared/ui/Icon/Icon";
import Typo from "~/shared/ui/Typo/Typo";
import Divider from "~/shared/ui/Divider/Divider";

import { isoToDate } from "~/shared/lib/utils/DateUtils";

import BaseIcons from "~/resources/constants/BaseIcons";
import AlignItems from "~/resources/constants/AlignItems";
import JustifyContent from "~/resources/constants/JustifyContent";

import InfoLabel from "~/business/ui/InfoLabel/InfoLabel";

import DetailsFlowGraph from "./ui/DetailsFlowGraph/DetailsFlowGraph";

import useCharacterDetailsQuery from "./api/queries/useCharacterDetailsQuery";

const DetailStarwars = () => {
  const navigate = useNavigate();

  const { id: characterId } = useParams();

  const { data: characterDetails } = useCharacterDetailsQuery(characterId!);

  return (
    <Col container lg={4} spacing={6}>
      <Row className="w-full" justifyContent={JustifyContent.SPACE_BETWEEN}>
        <button
          onClick={() => navigate(-1)}
          className="outline-none border-none bg-gray-80 w-9 h-9 c-flex-center rounded-lg cursor-pointer"
        >
          <Icon name={BaseIcons.CIRCLE_ARROW_LEFT} />
        </button>
        <Row className="w-max">
          <InfoLabel alignItems={AlignItems.CENTER} label="Created At">
            {isoToDate(characterDetails?.created)}
          </InfoLabel>
          <InfoLabel alignItems={AlignItems.CENTER} label="Edited At">
            {isoToDate(characterDetails?.edited)}
          </InfoLabel>
        </Row>
      </Row>
      <Col spacing={6}>
        <Typo variant="title-lg">{characterDetails?.name}</Typo>
        <div className="grid py-4 md:py-0 grid-cols-3 md:grid-cols-8 gap-4 md:gap-0">
          <InfoLabel alignItems={AlignItems.CENTER} label="Gender">
            {characterDetails?.gender}
          </InfoLabel>
          <InfoLabel alignItems={AlignItems.CENTER} label="Birth Year">
            {characterDetails?.birth_year}
          </InfoLabel>
          <InfoLabel alignItems={AlignItems.CENTER} label="Hair color">
            {characterDetails?.hair_color}
          </InfoLabel>
          <InfoLabel alignItems={AlignItems.CENTER} label="Skin color">
            {characterDetails?.skin_color}
          </InfoLabel>
          <InfoLabel alignItems={AlignItems.CENTER} label="Eye color">
            {characterDetails?.eye_color}
          </InfoLabel>
          <InfoLabel alignItems={AlignItems.CENTER} label="Mass">
            {characterDetails?.mass}
          </InfoLabel>
          <InfoLabel alignItems={AlignItems.CENTER} label="Height">
            {characterDetails?.height}
          </InfoLabel>
        </div>
      </Col>
      <Divider />
      <DetailsFlowGraph characterDetails={characterDetails!} />
    </Col>
  );
};

export default DetailStarwars;
