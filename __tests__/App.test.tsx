import { act, render, screen, within } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import App from '../src/App';
import { topDebts } from '../__mocks__/debts';
import userEvent from '@testing-library/user-event';

const getTopDebtsMock = vi.fn(() => Promise.resolve(topDebts));
const getFilteredDebts = vi.fn();

vi.mock('../src/api', () => ({
  getTopDebts: () => getTopDebtsMock(),
  getFilteredDebts: () => getFilteredDebts(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('<App />', () => {
  test('shows loader on page init', async () => {
    render(<App />);

    const loader = screen.getByRole('status');

    expect(loader).toBeInTheDocument();
  });

  test('fetches top 10 debts on page init properly', async () => {
    await act(async () => {
      render(<App />);
    });

    const rows = await screen.findAllByRole('row');
    expect(getTopDebtsMock).toHaveBeenCalled();
    expect(rows).toHaveLength(topDebts.length + 1);
  });

  test('displays proper record after searching existing entry', async () => {
    const QUERY = '1112223304';
    const user = userEvent.setup();
    const searchedResult = topDebts[6];

    vi.mocked(getFilteredDebts).mockImplementationOnce(() =>
      Promise.resolve([searchedResult])
    );

    await act(async () => {
      render(<App />);
    });

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button');

    await user.type(input, QUERY);
    await user.click(submitButton);

    const rows = await screen.findAllByRole('row');

    const cell = within(rows[1]).getAllByRole('cell');

    expect(cell[0]).toHaveTextContent(searchedResult.Name);
  });

  test('display no records text when no record were found after search', async () => {
    const QUERY = 'testquery';
    const user = userEvent.setup();

    vi.mocked(getFilteredDebts).mockImplementationOnce(() =>
      Promise.resolve([])
    );

    await act(async () => {
      render(<App />);
    });

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button');

    await user.type(input, QUERY);
    await user.click(submitButton);

    const noRecordsText = await screen.findByText(/brak wyników/i);

    expect(noRecordsText).toBeInTheDocument();
  });
});
