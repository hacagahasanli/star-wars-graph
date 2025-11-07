import { describe, it, expect } from "vitest";

import HtmlTags from "~/resources/constants/HtmlTags";
import AlignItems from "~/resources/constants/AlignItems";
import JustifyContent from "~/resources/constants/JustifyContent";

import Col from "../Col";

import { render, screen } from "~/__tests__/utils/test-utils";

describe("Col", () => {
  it("should render children", () => {
    render(<Col>Test Content</Col>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should render as div by default", () => {
    const { container } = render(<Col>Test</Col>);
    const element = container.querySelector("div");
    expect(element).toBeInTheDocument();
  });

  it("should render with custom element type", () => {
    const { container } = render(<Col as={HtmlTags.SECTION}>Section</Col>);
    const element = container.querySelector("section");
    expect(element).toBeInTheDocument();
  });

  it("should apply flex and flex-col classes", () => {
    const { container } = render(<Col>Test</Col>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("flex");
    expect(element).toHaveClass("flex-col");
  });

  it("should apply w-full when wFull is true", () => {
    const { container } = render(<Col wFull>Test</Col>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("w-full");
  });

  it("should render with custom id", () => {
    render(<Col id="test-id">Test</Col>);
    const element = document.getElementById("test-id");
    expect(element).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(<Col className="custom-class">Test</Col>);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("custom-class");
  });

  it("should apply alignItems", () => {
    const { container } = render(
      <Col alignItems={AlignItems.CENTER}>Test</Col>
    );
    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain(AlignItems.CENTER);
  });

  it("should apply justifyContent", () => {
    const { container } = render(
      <Col justifyContent={JustifyContent.SPACE_BETWEEN}>Test</Col>
    );
    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain(JustifyContent.SPACE_BETWEEN);
  });

  it("should apply default alignItems and justifyContent", () => {
    const { container } = render(<Col>Test</Col>);
    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain(AlignItems.STRETCH);
    expect(element.className).toContain(JustifyContent.FLEX_START);
  });

  it("should render multiple children", () => {
    render(
      <Col>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Col>
    );
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
    expect(screen.getByText("Child 3")).toBeInTheDocument();
  });

  it("should pass additional props", () => {
    render(<Col data-testid="col-test">Test</Col>);
    expect(screen.getByTestId("col-test")).toBeInTheDocument();
  });

  it("should render empty col", () => {
    const { container } = render(<Col />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should handle nested Cols", () => {
    render(
      <Col>
        <Col>Nested 1</Col>
        <Col>Nested 2</Col>
      </Col>
    );
    expect(screen.getByText("Nested 1")).toBeInTheDocument();
    expect(screen.getByText("Nested 2")).toBeInTheDocument();
  });
});
