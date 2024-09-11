export enum ClockComparator {
  EQ = '=',
  NEQ = '≠',
  LEQ = '≤',
  GEQ = '≥',
  LESSER = '<',
  GREATER = '>',
}

export function parseClockComparator(input: string): ClockComparator {
  switch (input) {
    case '=':
      return ClockComparator.EQ;
    case '==':
      return ClockComparator.EQ;
    case '!=':
      return ClockComparator.NEQ;
    case '≠':
      return ClockComparator.NEQ;
    case '≤':
      return ClockComparator.LEQ;
    case '<=':
      return ClockComparator.LEQ;
    case '≥':
      return ClockComparator.GEQ;
    case '>=':
      return ClockComparator.GEQ;
    case '<':
      return ClockComparator.LESSER;
    case '>':
      return ClockComparator.GREATER;
    default:
      throw Error(`parseClockComparator: input ${input} is not a valid clock comparator`);
  }
}
