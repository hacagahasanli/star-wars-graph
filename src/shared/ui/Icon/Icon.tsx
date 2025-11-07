import { lazy, Suspense, useMemo } from "react";

import IconPlaceholder from "./ui/IconPlaceholder/IconPlaceholder";

import type { IconProps, TIconCache } from "./Icon.types";

const DEFAULT_SIZE = 20;

const iconCache: TIconCache = {};

function getIcon(name: string, size: number) {
  if (!iconCache[name]) {
    iconCache[name] = lazy(() =>
      import(`~/resources/icons/svgs/${name}.tsx`).catch(() => ({
        default: () => <IconPlaceholder size={size} />,
      }))
    );
  }

  return iconCache[name];
}

function filterUndefinedProps<T extends object>(props: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(props || {})?.filter(
      ([, value]) => value !== undefined && value !== null
    )
  ) as Partial<T>;
}

const Icon: React.FC<IconProps> = ({
  name,
  color,
  width,
  height,
  strokeColor,
  size = DEFAULT_SIZE,
}) => {
  const SvgIcon = useMemo(() => getIcon(name, size), [name, size]);

  const finalProps = filterUndefinedProps({
    path: strokeColor,
    stroke: strokeColor,
    width: width ?? size,
    height: height ?? size,
    style: color ? { fill: color } : undefined,
  });

  return (
    <div
      className="inline-block"
      style={{
        backgroundColor: strokeColor || color,
      }}
    >
      <Suspense fallback={<IconPlaceholder size={size} />}>
        <SvgIcon {...finalProps} />
      </Suspense>
    </div>
  );
};

export default Icon;
