import { describe, it, expect } from "vitest";

import { render, screen } from "~/__tests__/utils/test-utils";

import Tag from "../Tag";

describe("Tag", () => {
  it("should render children text", () => {
    render(<Tag>Test Tag</Tag>);
    expect(screen.getByText("Test Tag")).toBeInTheDocument();
  });

  it("should render with custom className", () => {
    const { container } = render(<Tag className="custom-class">Test Tag</Tag>);
    const tag = container.querySelector("span");
    expect(tag).toHaveClass("custom-class");
  });

  it("should have default styling classes", () => {
    const { container } = render(<Tag>Test Tag</Tag>);
    const tag = container.querySelector("span");
    expect(tag).toHaveClass("inline-flex");
    expect(tag).toHaveClass("items-center");
    expect(tag).toHaveClass("rounded-full");
  });

  it("should render complex children", () => {
    render(
      <Tag>
        <span>Complex</span> Content
      </Tag>
    );
    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should render as a span element", () => {
    const { container } = render(<Tag>Test</Tag>);
    const tag = container.querySelector("span");
    expect(tag).toBeInTheDocument();
    expect(tag?.tagName).toBe("SPAN");
  });

  it("should render empty tag", () => {
    const { container } = render(<Tag>{""}</Tag>);
    const tag = container.querySelector("span");
    expect(tag).toBeInTheDocument();
  });

  it("should render multiple tags", () => {
    render(
      <>
        <Tag>Tag 1</Tag>
        <Tag>Tag 2</Tag>
        <Tag>Tag 3</Tag>
      </>
    );
    expect(screen.getByText("Tag 1")).toBeInTheDocument();
    expect(screen.getByText("Tag 2")).toBeInTheDocument();
    expect(screen.getByText("Tag 3")).toBeInTheDocument();
  });
});
