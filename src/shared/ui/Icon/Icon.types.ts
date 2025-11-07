export interface IconProps {
  name: string;
  size?: number;
  width?: number;
  color?: string;
  height?: number;
  strokeColor?: string;
}

export interface TIconCache {
  [key: string]: React.LazyExoticComponent<React.ComponentType<React.SVGProps<SVGSVGElement>>>;
}
