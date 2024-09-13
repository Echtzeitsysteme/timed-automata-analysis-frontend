import { ClockConstraint } from './clockConstraint';

export interface Location {
  name: string;
  isInitial?: boolean;
  invariant?: ClockConstraint;
  xCoordinate: number;
  yCoordinate: number;
  committed?: boolean;
  urgent?: boolean;
  labels?: string[];
}
