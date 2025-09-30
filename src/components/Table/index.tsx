import { useState } from 'react';
import type { Debt, SortDirection } from '../../types';
import { currencyFormatter, dateFormatter, sortDebts, toggleDirection } from '../../utils';

export const HEADERS = [
  'dłużnik',
  'nip',
  'kwota zadłużenia',
  'data powstania zobowiązania',
] as const;

type Props = {
  debts: Debt[];
  loading: boolean;
};

const Table = ({ debts, loading }: Props) => {
  const [sortBy, setSortBy] = useState<(typeof HEADERS)[number]>('dłużnik');
  const [direction, setDirection] = useState<SortDirection>('asc');

  const sortedDebts = sortDebts(debts, sortBy, direction);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return dateFormatter.format(date).replace(/\./g, '-');
  };

  return (
    <div
      className={`results__content container ${
        loading ? 'container--suspensed' : ''
      }`}
    >
      <table>
        <thead>
          <tr>
            {HEADERS.map((header) => (
              <th
                key={header}
                onClick={() => {
                  if (sortBy === header) {
                    const newDirection = toggleDirection(direction);
                    setDirection(newDirection);
                  } else {
                    setDirection('asc');
                  }
                  setSortBy(header);
                }}
              >
                {
                  <span className='header'>
                    {header.toUpperCase()}{' '}
                    {header === sortBy && (
                      <img
                        src='caret.svg'
                        alt=''
                        className={`header__caret ${
                          direction === 'desc'
                            ? 'header__caret--descending'
                            : ''
                        }`}
                      />
                    )}
                  </span>
                }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedDebts.map(({ Id, Name, NIP, Value, Date: date }) => (
            <tr key={Id}>
              <td>{Name}</td>
              <td>{NIP}</td>
              <td>{currencyFormatter.format(+Value)}</td>
              <td>{formatDate(date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
