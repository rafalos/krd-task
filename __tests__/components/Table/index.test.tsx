import { render, screen, within } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Table, { HEADERS } from '../../../src/components/Table';
import { topDebts } from '../../../__mocks__/debts';
import userEvent from '@testing-library/user-event';

describe('<Table />', () => {
  test('renders correct amount of table headers', () => {
    render(<Table debts={topDebts} loading={false} />);

    const headers = screen.getAllByRole('columnheader');

    expect(headers).toHaveLength(HEADERS.length);
  });

  test('renders correct amount of table rows', () => {
    render(<Table debts={topDebts} loading={false} />);

    const rows = screen.getAllByRole('row');

    expect(rows).toHaveLength(topDebts.length + 1);
  });

  test('renders initial records in ascending order sorted by name', () => {
    render(<Table debts={topDebts} loading={false} />);

    const tbody = screen.getAllByRole('rowgroup')[1];

    const rows = within(tbody).getAllByRole('row');

    const firstRow = rows[0];
    const secondRow = rows[1];
    const firstCells = within(firstRow).getAllByRole('cell');
    const secondCells = within(secondRow).getAllByRole('cell');

    expect(firstCells[0]).toHaveTextContent('Edward Szulc (Test)');
    expect(secondCells[0]).toHaveTextContent('Grażyna Mazur (Test)');
  });

  test('changes sort order to descending when clicking table head once', async () => {
    const user = userEvent.setup();

    render(<Table debts={topDebts} loading={false} />);

    const thead = screen.getAllByRole('rowgroup')[0];
    const headerRow = within(thead).getByRole('row');
    const headers = within(headerRow).getAllByRole('columnheader');

    await user.click(headers[0]);

    const tbody = screen.getAllByRole('rowgroup')[1];

    const rows = within(tbody).getAllByRole('row');

    const firstRow = rows[0];
    const secondRow = rows[1];
    const firstCells = within(firstRow).getAllByRole('cell');
    const secondCells = within(secondRow).getAllByRole('cell');

    expect(firstCells[0]).toHaveTextContent(
      'Sebastian Baranowski-Brzęczyszczykiewicz (Test)'
    );
    expect(secondCells[0]).toHaveTextContent('Renata Urbańska (Test)');
  });
});
