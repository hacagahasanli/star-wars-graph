interface PaginationModel<T> {
  readonly results: T[];
  readonly count: number;
  readonly next?: string;
  readonly previos?: string;
}

export type { PaginationModel };
