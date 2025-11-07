import InfoLabel from "~/business/ui/InfoLabel/InfoLabel";

import CardNode from "../CardNode/CardNode";

import type { Vehicle } from "../../models/Vehicle.model";

interface VehicleNodeProps {
  data: Vehicle;
}

const VehicleNode = ({ data }: VehicleNodeProps) => {
  return (
    <CardNode>
      <InfoLabel label="Name">{data.name}</InfoLabel>
      <InfoLabel label="Model">{data.model}</InfoLabel>
      <InfoLabel label="Class">{data.vehicle_class}</InfoLabel>
      <InfoLabel label="Manufacturer">{data.manufacturer}</InfoLabel>
      <InfoLabel label="Crew">{data.crew}</InfoLabel>
      <InfoLabel label="Passengers">{data.passengers}</InfoLabel>
    </CardNode>
  );
};

export default VehicleNode;
