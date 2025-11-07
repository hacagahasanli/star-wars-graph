/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";

import { render, screen, waitFor } from "~/__tests__/utils/test-utils";

import ListStartWars from "../ListStarwars";

import * as useCharactersQuery from "../api/queries/useCharactersQuery";

// Mock StarwarsCard component
vi.mock("../ui/StarwarsCard/StarwarsCard", () => ({
  default: ({ character, id }: any) => (
    <div data-testid={`starwars-card-${id}`}>
      {character.name}
    </div>
  ),
}));

// Mock StarwarsCardSkeleton component
vi.mock("../ui/StarwarsCardSkeleton/StarwarsCardSkeleton", () => ({
  default: () => <div data-testid="starwars-card-skeleton">Loading...</div>,
}));

const mockCharacters = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
      homeworld: "https://swapi.dev/api/planets/1/",
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: "2014-12-09T13:50:51.644000Z",
      edited: "2014-12-20T21:17:56.891000Z",
      url: "https://swapi.dev/api/people/1/",
    },
    {
      name: "Darth Vader",
      height: "202",
      mass: "136",
      hair_color: "none",
      skin_color: "white",
      eye_color: "yellow",
      birth_year: "41.9BBY",
      gender: "male",
      homeworld: "https://swapi.dev/api/planets/1/",
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: "2014-12-10T15:18:20.704000Z",
      edited: "2014-12-20T21:17:50.313000Z",
      url: "https://swapi.dev/api/people/4/",
    },
  ],
};

describe("ListStartWars", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading skeleton when fetching", () => {
    vi.spyOn(useCharactersQuery, "default").mockReturnValue({
      data: undefined,
      isSuccess: false,
      isFetching: true,
      isLoading: true,
      isError: false,
      error: null,
    } as any);

    render(<ListStartWars />);

    expect(screen.getByTestId("starwars-card-skeleton")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render character cards when data is loaded", async () => {
    vi.spyOn(useCharactersQuery, "default").mockReturnValue({
      data: mockCharacters,
      isSuccess: true,
      isFetching: false,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(<ListStartWars />);

    await waitFor(() => {
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });

    expect(screen.getByText("Darth Vader")).toBeInTheDocument();
    expect(screen.getByTestId("starwars-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("starwars-card-2")).toBeInTheDocument();
  });

  it("should render grid container", () => {
    vi.spyOn(useCharactersQuery, "default").mockReturnValue({
      data: mockCharacters,
      isSuccess: true,
      isFetching: false,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    const { container } = render(<ListStartWars />);

    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass("grid-cols-1");
    expect(gridContainer).toHaveClass("md:grid-cols-4");
  });

  it("should not render cards when no characters exist", () => {
    vi.spyOn(useCharactersQuery, "default").mockReturnValue({
      data: { count: 0, next: null, previous: null, results: [] },
      isSuccess: true,
      isFetching: false,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(<ListStartWars />);

    expect(screen.queryByTestId("starwars-card-1")).not.toBeInTheDocument();
  });

  it("should not render skeleton when data is loaded", async () => {
    vi.spyOn(useCharactersQuery, "default").mockReturnValue({
      data: mockCharacters,
      isSuccess: true,
      isFetching: false,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(<ListStartWars />);

    await waitFor(() => {
      expect(screen.queryByTestId("starwars-card-skeleton")).not.toBeInTheDocument();
    });
  });

  it("should handle undefined data gracefully", () => {
    vi.spyOn(useCharactersQuery, "default").mockReturnValue({
      data: undefined,
      isSuccess: false,
      isFetching: false,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    const { container } = render(<ListStartWars />);

    expect(container.querySelector(".grid")).toBeInTheDocument();
  });

  it("should render correct number of cards", async () => {
    vi.spyOn(useCharactersQuery, "default").mockReturnValue({
      data: mockCharacters,
      isSuccess: true,
      isFetching: false,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(<ListStartWars />);

    await waitFor(() => {
      const cards = screen.getAllByTestId(/starwars-card-/);
      expect(cards).toHaveLength(2);
    });
  });
});
