import type { ElementType } from "react";

export type TypoVariant = "body-xs" | "body-base" | "title-lg" | "label";

export type TypoColor = "gray" | "white";

export interface TypoProps<TAs extends ElementType = "span"> {
  as?: TAs;
  variant?: TypoVariant;
  color?: TypoColor;
  className?: string;
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
