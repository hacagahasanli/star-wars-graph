import dagre from "dagre";

import type { Node, Edge, Position } from "@xyflow/react";

const nodeWidth = 320;
const nodeHeight = 220;

export function graphLayout(nodes: Node[], edges: Edge[]) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: "TB",
    nodesep: 100,
    ranksep: 150,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return nodes.map((node) => {
    const nodeWithPos = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPos.x - nodeWidth / 2,
      y: nodeWithPos.y - nodeHeight / 2,
    };
    node.targetPosition = "top" as Position;
    node.sourcePosition = "bottom" as Position;
    return node;
  });
}
