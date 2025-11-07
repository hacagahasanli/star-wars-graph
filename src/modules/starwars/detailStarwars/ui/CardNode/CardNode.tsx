import { Handle, Position } from "@xyflow/react";
import { type ReactNode } from "react";

import Col from "~/shared/ui/Col/Col";
import Row from "~/shared/ui/Row/Row";

interface CardNodeProps {
  children: ReactNode;
  className?: string;
}

const CardNode = ({ children, className = "" }: CardNodeProps) => {
  const baseClasses =
    "p-5 border-2 rounded-[21px] transition-colors duration-300 cursor-pointer min-w-[280px]";
  const defaultClasses = "border-gray-70 bg-gray-80 group-hover:bg-gray-70";

  return (
    <div className="group relative outline-none max-w-[300px]">
      <Handle type="target" position={Position.Top} />
      <article className={`${baseClasses} ${className || defaultClasses}`}>
        <Row spacing={7} alignItems="flex-start">
          <Col spacing={2} className="shrink-0 flex-1">
            {children}
          </Col>
        </Row>
      </article>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CardNode;
