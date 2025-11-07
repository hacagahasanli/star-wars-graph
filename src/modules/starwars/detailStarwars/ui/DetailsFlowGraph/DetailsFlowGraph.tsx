import { ReactFlow, Background, Controls } from "@xyflow/react";
import { isEmpty } from "~/shared/lib/utils/CommonUtils";

import { buildGraphData } from "~/modules/starwars/shared/buildGraphData";

import HeroNode from "../HeroNode/HeroNode";
import FilmNode from "../FilmNode/FilmNode";
import StarshipNode from "../StarshipNode/StarshipNode";
import VehicleNode from "../VehicleNode/VehicleNode";
import SpeciesNode from "../SpeciesNode/SpeciesNode";

import type { CharacterDetails } from "../../models/CharacterDetails.model";

import "@xyflow/react/dist/style.css";

const nodeTypes = {
  hero: HeroNode,
  film: FilmNode,
  starship: StarshipNode,
  vehicle: VehicleNode,
  species: SpeciesNode,
};

interface DetailsFlowGraphProps {
  characterDetails: CharacterDetails;
}

function DetailsFlowGraph({ characterDetails }: DetailsFlowGraphProps) {
  if (isEmpty(characterDetails)) return null;

  const graphData = buildGraphData(characterDetails);

  return (
    <div className="w-full h-[500px] max-h-[calc(100vh - 250px)]">
      <ReactFlow
        fitView
        nodeTypes={nodeTypes}
        nodes={graphData.nodes}
        edges={graphData.edges}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default DetailsFlowGraph;
