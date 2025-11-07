import type { ReactNode } from "react";
import AlignItems from "~/resources/constants/AlignItems";

import Col from "~/shared/ui/Col/Col";
import Typo from "~/shared/ui/Typo/Typo";

interface InfoLabelProps {
  label: string;
  children: ReactNode;
  alignItems?: AlignItems
}

const InfoLabel = ({
  label,
  children,
  alignItems = AlignItems.FLEX_START,
}: InfoLabelProps) => {
  return (
    <Col spacing={0} alignItems={alignItems}>
      <Typo variant="label">{label}</Typo>
      <Typo>{children}</Typo>
    </Col>
  );
};

export default InfoLabel;
