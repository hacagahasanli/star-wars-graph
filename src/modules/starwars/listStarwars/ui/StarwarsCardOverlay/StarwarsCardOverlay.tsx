import Col from "~/shared/ui/Col/Col";

import TransitionalLabel from "../TransitionalInfoLabel/TransitionalInfoLabel";

import type { CharacterPreview } from "~/modules/starwars/models/CharacterPreview.model";

interface StarwarsCardOverlayProps {
  character: CharacterPreview;
}

const StarwarsCardOverlay = ({ character }: StarwarsCardOverlayProps) => {
  return (
    <div className="absolute top-full left-0 right-0 bg-gray-70 border-2 w-max border-gray-70 rounded-[21px] p-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-in-out z-50 mt-2 shadow-2xl">
      <Col spacing={2}>
        <TransitionalLabel label="Hair color">
          {character?.hair_color}
        </TransitionalLabel>
        <TransitionalLabel label="Skin color">
          {character?.skin_color}
        </TransitionalLabel>
        <TransitionalLabel label="Eye color">
          {character?.eye_color}
        </TransitionalLabel>
        <TransitionalLabel label="Mass">{character?.mass}</TransitionalLabel>
      </Col>
    </div>
  );
};

export default StarwarsCardOverlay;
