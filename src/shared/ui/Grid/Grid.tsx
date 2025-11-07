import cn from "~/shared/lib/helpers/classnames";

import AlignItems from "~/resources/constants/AlignItems";
import JustifyContent from "~/resources/constants/JustifyContent";

import { type GridProps } from "./Grid.types";

const Grid = ({
  xl,
  xs,
  lg,
  md,
  sm,
  item,
  children,
  container,
  className,
  as = "div",
  spacing = 2,
  alignItems = AlignItems.STRETCH,
  justifyContent = JustifyContent.FLEX_START,
  ...rest
}: GridProps) => {
  const containerClasses = container && {
    "w-full mx-auto": true,
    [`gap-${spacing}`]: spacing !== undefined,
    [`lg:grid-cols-${lg}`]: lg !== undefined,
    [`md:grid-cols-${md}`]: md !== undefined,
    [`sm:grid-cols-${sm}`]: sm !== undefined,
    [`xl:grid-cols-${xl}`]: xl !== undefined,
    [`xs:grid-cols-${xs}`]: xs !== undefined,
  };

  const itemClasses = item && {
    [`gap-${spacing}`]: spacing !== undefined,
    [`lg:col-span-${lg}`]: lg !== undefined,
    [`xl:col-span-${xl}`]: xl !== undefined,
    [`md:col-span-${md}`]: md !== undefined,
    [`sm:col-span-${sm}`]: sm !== undefined,
    [`xs:col-span-${xs}`]: xs !== undefined,
  };

  const classes = cn(
    "grid",
    containerClasses,
    itemClasses,
    justifyContent,
    alignItems,
    className
  );

  const Tag = as;

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
};

export default Grid;
