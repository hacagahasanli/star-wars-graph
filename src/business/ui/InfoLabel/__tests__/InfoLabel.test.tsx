import { describe, it, expect } from "vitest";

import { render, screen } from "~/__tests__/utils/test-utils";

import AlignItems from "~/resources/constants/AlignItems";

import InfoLabel from "../InfoLabel";

describe("InfoLabel", () => {
  it("should render label and children", () => {
    render(
      <InfoLabel label="Test Label">
        Test Content
      </InfoLabel>
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should render with custom alignment", () => {
    const { container } = render(
      <InfoLabel label="Test Label" alignItems={AlignItems.CENTER}>
        Test Content
      </InfoLabel>
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render with default alignment when not specified", () => {
    const { container } = render(
      <InfoLabel label="Test Label">
        Test Content
      </InfoLabel>
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render complex children", () => {
    render(
      <InfoLabel label="Test Label">
        <span>Complex</span>
        <span>Content</span>
      </InfoLabel>
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should render empty children", () => {
    render(
      <InfoLabel label="Test Label">
        {""}
      </InfoLabel>
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("should render with numeric children", () => {
    render(
      <InfoLabel label="Age">
        {25}
      </InfoLabel>
    );

    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
  });
});
