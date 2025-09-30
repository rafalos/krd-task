import { describe, test, expect } from 'vitest';
import { sortDebts, toggleDirection } from '../../src/utils';
import { topDebts } from '../../__mocks__/debts';
import type { Header } from '../../src/types';

describe('sortDebts', () => {
  test('sorts debts properly in ascending order by name', () => {
    const FIRST_NAME_IN_ORDER = 'Edward Szulc (Test)';
    const LAST_NAME_IN_ORDER =
      'Sebastian Baranowski-Brzęczyszczykiewicz (Test)';

    const sortedDebts = sortDebts(topDebts, 'dłużnik', 'asc');

    expect(sortedDebts[0].Name).toBe(FIRST_NAME_IN_ORDER);

    expect(sortedDebts[sortedDebts.length - 1].Name).toBe(LAST_NAME_IN_ORDER);
  });

  test('sorts debts properly in descending order by name', () => {
    const FIRST_NAME_IN_ORDER =
      'Sebastian Baranowski-Brzęczyszczykiewicz (Test)';
    const LAST_NAME_IN_ORDER = 'Edward Szulc (Test)';

    const sortedDebts = sortDebts(topDebts, 'dłużnik', 'desc');

    expect(sortedDebts[0].Name).toBe(FIRST_NAME_IN_ORDER);

    expect(sortedDebts[sortedDebts.length - 1].Name).toBe(LAST_NAME_IN_ORDER);
  });

  test('returns unsorted arrray when wrong header is given', () => {
    const sortedDebts = sortDebts(topDebts, 'wrong' as Header, 'asc');

    expect(sortedDebts).toEqual(topDebts);
  });
});

describe('toggleDirection', () => {
  test('toggles sort to desc when asc is fiven', () => {
    const newDirection = toggleDirection('asc');

    expect(newDirection).toBe('desc');
  });
});
