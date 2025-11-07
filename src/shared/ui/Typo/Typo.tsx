import cn from "~/shared/lib/helpers/classnames";

import { ColorClasses, VariantClasses } from "./Typo.consts";

import type { ElementType, FC } from "react";
import type { TypoProps } from "./Typo.types";

const Typo: FC<TypoProps> = ({
  as,
  color,
  children,
  className,
  variant = "body-base",
  ...rest
}) => {
  const Component = (as ?? "span") as ElementType;

  const baseClasses = cn(
    "block",
    VariantClasses[variant],
    color && ColorClasses[color],
    className
  );

  return (
    <Component className={baseClasses} {...rest}>
      {children}
    </Component>
  );
};

export default Typo;
