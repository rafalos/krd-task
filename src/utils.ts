import type { Debt, SortDirection } from './types';
import { HEADERS } from './components/Table';

export const dateFormatter = new Intl.DateTimeFormat('pl-PL', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
});

export const sortDebts = (
  debts: Debt[],
  by: (typeof HEADERS)[number],
  direction: SortDirection
): Debt[] => {
  console.log(by);

  switch (by) {
    case 'dłużnik':
      return debts.sort((a, b) => a.Name.localeCompare(b.Name));
    case 'nip':
      return debts.sort((a, b) => +a.NIP - +b.NIP);
    case 'kwota zadłużenia':
      return debts.sort((a, b) => +a.Value - +b.Value);
    case 'data powstania zobowiązania':
      return debts.sort((a, b) => a.Date.localeCompare(b.Date));
    default:
      return debts;
  }
};

export const toggleDirection = (
  currentDirection: SortDirection
): SortDirection => {
  return currentDirection === 'asc' ? 'desc' : 'asc';
};
