# Testing Guide

This project uses Vitest and React Testing Library for testing.

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Structure

Tests are organized in `__tests__` folders next to the code they test:

```
src/
├── __tests__/
│   ├── setup.ts          # Global test setup
│   └── utils/
│       └── test-utils.tsx # Custom render function with providers
├── modules/
│   └── starwars/
│       ├── detailStarwars/
│       │   ├── __tests__/
│       │   │   └── DetailsStarwars.test.tsx
│       │   └── DetailsStarwars.tsx
│       └── listStarwars/
│           ├── __tests__/
│           │   └── ListStarwars.test.tsx
│           └── ListStarwars.tsx
└── shared/
    ├── ui/
    │   ├── Col/
    │   │   ├── __tests__/
    │   │   │   └── Col.test.tsx
    │   │   └── Col.tsx
    │   ├── Tag/
    │   │   ├── __tests__/
    │   │   │   └── Tag.test.tsx
    │   │   └── Tag.tsx
    │   └── Typo/
    │       ├── __tests__/
    │       │   └── Typo.test.tsx
    │       └── Typo.tsx
    └── lib/
        └── utils/
            ├── __tests__/
            │   ├── DateUtils.test.ts
            │   └── FunctionUtils.test.ts
            ├── DateUtils.ts
            └── FunctionUtils.ts
```

## Writing Tests

### Import the test utilities

```typescript
import { render, screen, waitFor } from "~/__tests__/utils/test-utils";
```

### Example Component Test

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "~/__tests__/utils/test-utils";
import MyComponent from "../MyComponent";

describe("MyComponent", () => {
  it("should render correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

### Example Utility Test

```typescript
import { describe, it, expect } from "vitest";
import { myUtilityFunction } from "../myUtils";

describe("myUtilityFunction", () => {
  it("should return expected value", () => {
    expect(myUtilityFunction("test")).toBe("expected");
  });
});
```

### Mocking

```typescript
import { vi } from "vitest";

// Mock a module
vi.mock("../api/queries/useCharactersQuery", () => ({
  default: vi.fn(),
}));

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
```

## Test Utilities

The project includes a custom render function that wraps components with all necessary providers:

- Jotai (state management)
- React Query (data fetching)
- React Router (routing)
- Theme provider
- Error Boundary

This ensures components are tested in an environment that closely matches production.

## Coverage

To generate a coverage report:

```bash
npm run test:coverage
```

Coverage reports are generated in the `coverage` directory.

## Configuration

- **vitest.config.ts**: Vitest configuration
- **src/__tests__/setup.ts**: Global test setup, mocks for browser APIs
- **src/__tests__/utils/test-utils.tsx**: Custom render function with providers

## Best Practices

1. Place tests in `__tests__` folders next to the code they test
2. Use descriptive test names that explain what is being tested
3. Test user-facing behavior, not implementation details
4. Use `screen` queries from Testing Library for better error messages
5. Use `waitFor` for async operations
6. Mock external dependencies (APIs, modules, etc.)
7. Keep tests focused and atomic

## Current Test Coverage

- **8 test files**
- **85 tests** (all passing)
- Components: DetailsStarwars, ListStarwars, InfoLabel, Tag, Typo, Col
- Utils: DateUtils, FunctionUtils
