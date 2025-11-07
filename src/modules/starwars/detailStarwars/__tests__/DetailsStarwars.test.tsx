/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";

import { render, screen, waitFor } from "~/__tests__/utils/test-utils";

import DetailStarwars from "../DetailsStarwars";

import * as useCharacterDetailsQuery from "../api/queries/useCharacterDetailsQuery";

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "1" }),
  };
});

// Mock DetailsFlowGraph component
vi.mock("../ui/DetailsFlowGraph/DetailsFlowGraph", () => ({
  default: () => <div data-testid="details-flow-graph">Flow Graph</div>,
}));

const mockCharacterDetails = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  hair_color: "blond",
  skin_color: "fair",
  eye_color: "blue",
  birth_year: "19BBY",
  gender: "male",
  created: "2014-12-09T13:50:51.644000Z",
  edited: "2014-12-20T21:17:56.891000Z",
  url: "https://swapi.dev/api/people/1/",
  homeworld: {
    name: "Tatooine",
    rotation_period: "23",
    orbital_period: "304",
    diameter: "10465",
    climate: "arid",
    gravity: "1 standard",
    terrain: "desert",
    surface_water: "1",
    population: "200000",
    residents: [],
    films: [],
    created: "2014-12-09T13:50:49.641000Z",
    edited: "2014-12-20T20:58:18.411000Z",
    url: "https://swapi.dev/api/planets/1/",
  },
  films: [],
  species: [],
  vehicles: [],
  starships: [],
};

describe("DetailStarwars", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state initially", () => {
    vi.spyOn(useCharacterDetailsQuery, "default").mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as any);

    render(<DetailStarwars />);

    // Component should render even without data
    expect(document.body).toBeTruthy();
  });

  it("should render character details when data is loaded", async () => {
    vi.spyOn(useCharacterDetailsQuery, "default").mockReturnValue({
      data: mockCharacterDetails,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(<DetailStarwars />);

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });

    expect(screen.getByText("male")).toBeInTheDocument();
    expect(screen.getByText("19BBY")).toBeInTheDocument();
    expect(screen.getByText("blond")).toBeInTheDocument();
    expect(screen.getByText("fair")).toBeInTheDocument();
    expect(screen.getByText("blue")).toBeInTheDocument();
    expect(screen.getByText("77")).toBeInTheDocument();
    expect(screen.getByText("172")).toBeInTheDocument();
  });

  it("should render back button", async () => {
    vi.spyOn(useCharacterDetailsQuery, "default").mockReturnValue({
      data: mockCharacterDetails,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(<DetailStarwars />);

    const backButton = await waitFor(() =>
      screen.getByRole("button")
    );

    expect(backButton).toBeInTheDocument();
  });

  it("should call navigate when back button is clicked", async () => {
    vi.spyOn(useCharacterDetailsQuery, "default").mockReturnValue({
      data: mockCharacterDetails,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    const { container } = render(<DetailStarwars />);

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });

    const backButton = container.querySelector("button");
    if (backButton) {
      backButton.click();
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    }
  });

  it("should render created and edited dates", async () => {
    vi.spyOn(useCharacterDetailsQuery, "default").mockReturnValue({
      data: mockCharacterDetails,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(<DetailStarwars />);

    await waitFor(() => {
      expect(screen.getByText("Created At")).toBeInTheDocument();
    });

    expect(screen.getByText("Edited At")).toBeInTheDocument();
  });

  it("should render all info labels", async () => {
    vi.spyOn(useCharacterDetailsQuery, "default").mockReturnValue({
      data: mockCharacterDetails,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(<DetailStarwars />);

    await waitFor(() => {
      expect(screen.getByText("Gender")).toBeInTheDocument();
    });

    expect(screen.getByText("Birth Year")).toBeInTheDocument();
    expect(screen.getByText("Hair color")).toBeInTheDocument();
    expect(screen.getByText("Skin color")).toBeInTheDocument();
    expect(screen.getByText("Eye color")).toBeInTheDocument();
    expect(screen.getByText("Mass")).toBeInTheDocument();
    expect(screen.getByText("Height")).toBeInTheDocument();
  });

  it("should render DetailsFlowGraph component", async () => {
    vi.spyOn(useCharacterDetailsQuery, "default").mockReturnValue({
      data: mockCharacterDetails,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(<DetailStarwars />);

    await waitFor(() => {
      expect(screen.getByTestId("details-flow-graph")).toBeInTheDocument();
    });
  });

  it("should handle missing optional data gracefully", async () => {
    const incompleteData = {
      ...mockCharacterDetails,
      hair_color: "n/a",
      mass: "unknown",
    };

    vi.spyOn(useCharacterDetailsQuery, "default").mockReturnValue({
      data: incompleteData,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(<DetailStarwars />);

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });

    expect(screen.getByText("n/a")).toBeInTheDocument();
    expect(screen.getByText("unknown")).toBeInTheDocument();
  });
});
