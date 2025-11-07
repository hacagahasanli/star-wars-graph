import { graphLayout } from "./graphLayout";

import type { Node, Edge } from "@xyflow/react";
import type { CharacterDetails } from "../detailStarwars/models/CharacterDetails.model";

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

class GraphBuilder {
  // eslint-disable-next-line
  private readonly layers: GraphLayer<any>[] = [
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

  private nodes: Node[] = [];
  private edges: Edge[] = [];

  constructor(private character: CharacterDetails) {}

  public build(): GraphModel {
    this.reset();
    this.buildHeroNode();
    this.buildResourceLayers();

    return this.applyLayout();
  }

  private reset(): void {
    this.nodes = [];
    this.edges = [];
  }

  private buildHeroNode(): void {
    this.nodes.push({
      id: this.character.name,
      type: "hero",
      position: { x: 0, y: 0 },
      data: {
        name: this.character.name,
        gender: this.character.gender,
        birth_year: this.character.birth_year,
        homeworld: this.character.homeworld?.name,
      },
    });
  }

  private buildResourceLayers(): void {
    this.layers.forEach((layer) => {
      this.buildLayer(layer);
    });
  }

  // eslint-disable-next-line
  private buildLayer(layer: GraphLayer<any>): void {
    const items = this.character[layer.key] as unknown[];

    if (!Array.isArray(items)) return;

    items.forEach((item, index) => {
      const label = layer.labelSelector(item);
      const nodeId = this.generateNodeId(layer.type, label);

      this.buildResourceNode(layer, item, nodeId, index);
      this.buildEdge(this.character.name, nodeId);
    });
  }

  private buildResourceNode(
    // eslint-disable-next-line
    layer: GraphLayer<any>,
    // eslint-disable-next-line
    item: any,
    nodeId: string,
    index: number
  ): void {
    this.nodes.push({
      type: layer.type,
      id: nodeId,
      data: item,
      position: { x: 250 * (index + 1), y: layer.y },
    });
  }

  private buildEdge(sourceId: string, targetId: string): void {
    this.edges.push({
      target: targetId,
      source: sourceId,
      id: `${sourceId}-${targetId}`,
    });
  }

  private generateNodeId(type: string, label: string): string {
    return `${type}-${label}`;
  }

  private applyLayout(): GraphModel {
    const layoutedNodes = graphLayout(this.nodes, this.edges);
    return { nodes: layoutedNodes, edges: this.edges };
  }

  public updateCharacter(character: CharacterDetails): GraphModel {
    this.character = character;
    return this.build();
  }

  public getCurrentGraph(): GraphModel {
    return { nodes: this.nodes, edges: this.edges };
  }
}

export { GraphBuilder };

export function buildGraphData(character: CharacterDetails): GraphModel {
  const builder = new GraphBuilder(character);
  return builder.build();
}
