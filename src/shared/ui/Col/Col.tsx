import { type ElementType } from "react";

import cn from "~/shared/lib/helpers/classnames";

import AlignItems from "~/resources/constants/AlignItems";
import JustifyContent from "~/resources/constants/JustifyContent";

import type { ILayout } from "~/shared/types/ILayout";

interface IColProps<TAs extends ElementType = "div"> extends ILayout {
  as?: TAs;
  size?: string;
  mobileSpacing?: number;
}

const Col = ({
  size,
  wFull,
  id = "",
  children,
  className,
  as = "div",
  spacing = 0,
  mobileSpacing,
  alignItems = AlignItems.STRETCH,
  justifyContent = JustifyContent.FLEX_START,
  ...rest
}: IColProps) => {
  const Tag = as;

  const classes = cn(
    `flex flex-col ${wFull ? "w-full" : ""}`,
    size && `w-${size}`,
    (!!mobileSpacing || !!spacing) && `xs:gap-${mobileSpacing ?? spacing}`,
    (mobileSpacing !== undefined || spacing !== undefined) &&
      `lg:gap-${spacing ?? mobileSpacing}`,
    justifyContent,
    alignItems,
    className
  );

  return (
    <Tag id={id} className={classes} {...rest}>
      {children}
    </Tag>
  );
};

export default Col;
