import type { FC, ComponentClass, FunctionComponent } from "react";

type HOC = {
  <P extends object>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component: ComponentClass<any> | FunctionComponent<P>
  ): FC<P>;
};

export type { HOC };
