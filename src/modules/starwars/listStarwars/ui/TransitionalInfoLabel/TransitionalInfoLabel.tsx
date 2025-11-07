import type { ReactNode } from "react";

import InfoLabel from "~/business/ui/InfoLabel/InfoLabel";

interface TransitionalLabelProps {
  label: string;
  children: ReactNode;
}

const TransitionalLabel = ({ label, children }: TransitionalLabelProps) => {
  return (
    <div className="transition-all duration-300 delay-100 transform group-hover:translate-x-0 -translate-x-4 opacity-0 group-hover:opacity-100">
      <InfoLabel label={label}>{children}</InfoLabel>
    </div>
  );
};

export default TransitionalLabel;
