import { graphLayout } from "./graphLayout";

import type { Node, Edge } from "@xyflow/react";

import type { CharacterDetails } from "../detailStarwars/models/CharacterDetails.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const layers: GraphLayer<any>[] = [
  { key: "films", type: "film", y: 150, labelSelector: (f) => f.title },
  {
    key: "starships",
    type: "starship",
    y: 300,
    labelSelector: (s) => s.name,
  },
  { key: "vehicles", type: "vehicle", y: 450, labelSelector: (v) => v.name },
  { key: "species", type: "species", y: 600, labelSelector: (sp) => sp.name },
];

interface GraphLayer<T> {
  y: number;
  type: string;
  key: keyof CharacterDetails;
  labelSelector: (item: T) => string;
}

export interface GraphModel {
  nodes: Node[];
  edges: Edge[];
}

export function buildGraphData(character: CharacterDetails): GraphModel {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  nodes.push({
    id: character?.name,
    type: "hero",
    position: { x: 0, y: 0 },
    data: {
      name: character?.name,
      gender: character?.gender,
      birth_year: character?.birth_year,
      homeworld: character?.homeworld?.name,
    },
  });

  layers?.forEach(({ key, type, y, labelSelector }) => {
    const items = character[key] as unknown[];

    if (!Array.isArray(items)) return;

    items.forEach((item, i) => {
      const label = labelSelector(item);
      const nodeId = `${type}-${label}`;

      nodes.push({
        type,
        id: nodeId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: item as any,
        position: { x: 250 * (i + 1), y },
      });

      edges.push({
        target: nodeId,
        source: character?.name,
        id: `${character?.name}-${nodeId}`,
      });
    });
  });

  const layoutedNodes = graphLayout(nodes, edges);

  return { nodes: layoutedNodes, edges };
}
