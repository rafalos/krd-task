import { describe, test, expect } from 'vitest';
import NoResults from '../../src/components/NoResults';
import { render, screen } from '@testing-library/react';

describe('<NoResults />', () => {
  test('renders properly', () => {
    render(<NoResults />);

    const text = screen.getByText(/brak wyników/i);

    expect(text).toBeInTheDocument();
  });
});
