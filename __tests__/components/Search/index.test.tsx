import { render, screen } from '@testing-library/react';
import { describe, test, vi, expect, beforeEach } from 'vitest';
import Search from '../../../src/components/Search';
import userEvent from '@testing-library/user-event';

vi.mock('../../../src/api', () => ({
  getFilteredDebts: () => filteredDebtsMock(),
}));

const filteredDebtsMock = vi.fn();
const onSearchMock = vi.fn();
const onSearchStartMock = vi.fn();
const onSearchEndMock = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('<Search />', () => {
  test('renders properly', () => {
    render(
      <Search
        onSearch={onSearchMock}
        onSearchEnd={onSearchEndMock}
        onSearchStart={onSearchStartMock}
      />
    );

    const heading = screen.getByText(/podaj nip/i);
    const form = screen.getByRole('form');

    expect(heading).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  test('doesnt fetch filtered debts when submitting empty input', async () => {
    const user = userEvent.setup();

    render(
      <Search
        onSearch={onSearchMock}
        onSearchEnd={onSearchEndMock}
        onSearchStart={onSearchStartMock}
      />
    );

    const submitButton = screen.getByRole('button');

    await user.click(submitButton);

    expect(filteredDebtsMock).not.toHaveBeenCalled();
  });

  test('fetches filtered debts when form is correctly submitted', async () => {
    const user = userEvent.setup();

    render(
      <Search
        onSearch={onSearchMock}
        onSearchEnd={onSearchEndMock}
        onSearchStart={onSearchStartMock}
      />
    );

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button');

    await user.type(input, 'test');
    await user.click(submitButton);

    expect(filteredDebtsMock.mock.calls).toHaveLength(1);
  });

  test('callbacks are called properly', async () => {
    const user = userEvent.setup();

    render(
      <Search
        onSearch={onSearchMock}
        onSearchEnd={onSearchEndMock}
        onSearchStart={onSearchStartMock}
      />
    );

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button');

    await user.type(input, 'test');
    await user.click(submitButton);

    expect(onSearchStartMock).toHaveBeenCalledBefore(onSearchEndMock);
    expect(onSearchEndMock).toHaveBeenCalled();
  });

  test('displays validation error when search request fails', async () => {
    const user = userEvent.setup();

    filteredDebtsMock.mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    render(
      <Search
        onSearch={onSearchMock}
        onSearchEnd={onSearchEndMock}
        onSearchStart={onSearchStartMock}
      />
    );

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button');

    await user.type(input, 'test');
    await user.click(submitButton);

    const errorText = screen.getByText(/test error/i);

    expect(errorText).toBeInTheDocument();
  });
});
