import cn from "~/shared/lib/helpers/classnames";

import AlignItems from "~/resources/constants/AlignItems";
import JustifyContent from "~/resources/constants/JustifyContent";

import  HtmlTags from "~/resources/constants/HtmlTags";

import type { ILayout } from "~/shared/types/ILayout";

interface IColProps extends ILayout {
  as?: HtmlTags;
  size?: string;
  mobileSpacing?: number;
}

const Col = ({
  size,
  wFull,
  id = "",
  children,
  className,
  spacing = 0,
  mobileSpacing,
  as = HtmlTags.DIV,
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
