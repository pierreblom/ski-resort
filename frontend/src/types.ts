export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface LiftDistributionPlan {
  lift: string;
  trips: number;
  people_per_trip: number;
}

export interface Trail {
  name: string;
  difficulty: DifficultyLevel;
  groomed: boolean;
  accessedByLifts: Array<{ name: string; elevationGain: number; capacity: number; status: 'OPEN' | 'CLOSED' | 'HOLD' }>;
  liftsToSummit: number;
  minElevationGain: number;
  status: 'OPEN' | 'CLOSED';
  liftDistributionPlan?: LiftDistributionPlan[];
}