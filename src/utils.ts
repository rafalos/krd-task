import type { Debt, SortDirection } from './types';
import { HEADERS } from './components/Table';

export const dateFormatter = new Intl.DateTimeFormat('pl-PL', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export const sortDebts = (
  debts: Debt[],
  by: (typeof HEADERS)[number],
  direction: SortDirection
): Debt[] => {
  let sortedDebts: Debt[] = [...debts];

  switch (by) {
    case 'dłużnik':
      sortedDebts = debts.sort((a, b) => a.Name.localeCompare(b.Name));
      break;
    case 'nip':
      sortedDebts = debts.sort((a, b) => +a.NIP - +b.NIP);
      break;
    case 'kwota zadłużenia':
      sortedDebts = debts.sort((a, b) => +a.Value - +b.Value);
      break;
    case 'data powstania zobowiązania':
      sortedDebts = debts.sort((a, b) => a.Date.localeCompare(b.Date));
      break;
    default:
      return debts;
  }

  return direction === 'asc' ? sortedDebts : sortedDebts.reverse();
};

export const toggleDirection = (
  currentDirection: SortDirection
): SortDirection => {
  return currentDirection === 'asc' ? 'desc' : 'asc';
};
