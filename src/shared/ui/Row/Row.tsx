import { type ReactNode, type ElementType } from "react";

import cn from "~/shared/lib/helpers/classnames";

import AlignItems from "~/resources/constants/AlignItems";
import JustifyContent from "~/resources/constants/JustifyContent";

import type { ILayout } from "~/shared/types/ILayout";

interface IRowProps<TAs extends ElementType = "div"> extends ILayout {
  as?: TAs;
  children?: ReactNode;
  mobileSpacing?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Row = ({
  children,
  className,
  as = "div",
  spacing = 2,
  wFull = true,
  mobileSpacing,
  alignItems = AlignItems.STRETCH,
  justifyContent = JustifyContent.FLEX_START,
  ...rest
}: IRowProps) => {
  const Tag = as;

  const classes = cn(
    `flex flex-row ${wFull ? "w-full" : ""}`,
    spacing !== undefined && `gap-${spacing}`,
    (!!mobileSpacing || !!spacing) && `xs:gap-${mobileSpacing ?? spacing}`,
    (mobileSpacing !== undefined || spacing !== undefined) &&
      `lg:gap-${spacing ?? mobileSpacing}`,
    justifyContent,
    alignItems,
    className
  );

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
};

export default Row;
