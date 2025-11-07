import type { TypoColor, TypoVariant } from "./Typo.types";

export const VariantClasses: Record<TypoVariant, string> = {
  label: "text-xs leading-relaxed tracking-normal text-gray-90",
  "body-xs": "text-xs leading-relaxed tracking-normal text-white",
  "body-base": "text-base leading-relaxed tracking-normal text-white font-bold",
  "title-lg": "text-xl md:text-5xl leading-tight tracking-normal text-white font-bold",
};

export const ColorClasses: Record<TypoColor, string> = {
  gray: "text-gray-500",
  white: "text-white",
};
