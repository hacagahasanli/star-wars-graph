import { describe, it, expect } from "vitest";

import HtmlTags from "~/resources/constants/HtmlTags";

import { render, screen } from "~/__tests__/utils/test-utils";

import Typo from "../Typo";

describe("Typo", () => {
  it("should render children text", () => {
    render(<Typo>Test Text</Typo>);
    expect(screen.getByText("Test Text")).toBeInTheDocument();
  });

  it("should render as span by default", () => {
    const { container } = render(<Typo>Test</Typo>);
    const element = container.querySelector("span");
    expect(element).toBeInTheDocument();
  });

  it("should render with custom element type", () => {
    const { container } = render(<Typo as={HtmlTags.H1}>Heading</Typo>);
    const element = container.querySelector("h1");
    expect(element).toBeInTheDocument();
    expect(screen.getByText("Heading")).toBeInTheDocument();
  });

  it("should render with variant", () => {
    const { container } = render(<Typo variant="title-lg">Title</Typo>);
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("should render with default body-base variant", () => {
    const { container } = render(<Typo>Body Text</Typo>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render with custom className", () => {
    const { container } = render(<Typo className="custom-class">Test</Typo>);
    const element = container.querySelector(".custom-class");
    expect(element).toBeInTheDocument();
  });

  it("should apply block class", () => {
    const { container } = render(<Typo>Test</Typo>);
    const element = container.querySelector(".block");
    expect(element).toBeInTheDocument();
  });

  it("should pass additional props", () => {
    render(<Typo data-testid="typo-test">Test</Typo>);
    expect(screen.getByTestId("typo-test")).toBeInTheDocument();
  });

  it("should render complex children", () => {
    render(
      <Typo>
        <strong>Bold</strong> and <em>italic</em>
      </Typo>
    );
    expect(screen.getByText("Bold")).toBeInTheDocument();
    expect(screen.getByText("italic")).toBeInTheDocument();
  });

  it("should render empty content", () => {
    const { container } = render(<Typo>{""}</Typo>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render as different HTML elements", () => {
    const { rerender, container } = render(
      <Typo as={HtmlTags.P}>Paragraph</Typo>
    );
    expect(container.querySelector("p")).toBeInTheDocument();

    rerender(<Typo as={HtmlTags.DIV}>Div</Typo>);
    expect(container.querySelector("div")).toBeInTheDocument();

    rerender(<Typo as={HtmlTags.H2}>Heading 2</Typo>);
    expect(container.querySelector("h2")).toBeInTheDocument();
  });
});
