import { type ReactElement, type ReactNode } from "react";

import { MemoryRouter } from "react-router-dom";

import userEvent from "@testing-library/user-event";

import {
  act,
  cleanup,
  renderHook,
  type RenderOptions,
  render as rtlRender,
} from "@testing-library/react";

import {
  screen,
  within,
  waitFor,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/dom";

import { compose } from "~/shared/lib/utils/FunctionUtils";

import withReactQuery from "~/app/providers/hocs/withReactQuery";
import withErrorBoundary from "~/app/providers/hocs/withErrorBoundary";

import type { HOC } from "~/app/providers/types/HOC";

const withTestRouter: HOC = (Component) => (props) =>
  (
    <MemoryRouter>
      <Component {...props} />
    </MemoryRouter>
  );

const withTestProviders = compose(
  withErrorBoundary,
  withTestRouter,
  withReactQuery
);

const AllProviders = withTestProviders(
  ({ children }: { children: ReactNode }) => <>{children}</>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => rtlRender(ui, { wrapper: AllProviders, ...options });

export { customRender as render, userEvent };

export {
  act,
  screen,
  within,
  waitFor,
  cleanup,
  fireEvent,
  renderHook,
  waitForElementToBeRemoved,
};
