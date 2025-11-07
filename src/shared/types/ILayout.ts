interface ILayout {
  id?: string;
  spacing?: number;
  className?: string;
  alignItems?: string;
  [key: string]: unknown;
  justifyContent?: string;
  children?: React.ReactNode;
}

export type { ILayout };
