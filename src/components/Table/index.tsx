import { useEffect, useState } from 'react';
import { getTopDebts } from '../../api';
import type { Debt, SortDirection } from '../../types';
import { dateFormatter, sortDebts, toggleDirection } from '../../utils';

export const HEADERS = [
  'dłużnik',
  'nip',
  'kwota zadłużenia',
  'data powstania zobowiązania',
] as const;

const Table = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [sortBy, setSortBy] = useState<(typeof HEADERS)[number]>('dłużnik');
  const [direction, setDirection] = useState<SortDirection>('asc');

  const sortedDebts = sortDebts(debts, sortBy, direction);

  useEffect(() => {
    getTopDebts().then((res) => {
      setDebts(res);
    });
  }, []);

  const formtDate = (dateString: string) => {
    const date = new Date(dateString);

    return dateFormatter.format(date).replace(/\./g, '-');
  };

  return (
    <div className='container'>
      <table
        style={{
          width: '100%',
        }}
      >
        <thead>
          <tr>
            {HEADERS.map((header) => (
              <th
                key={header}
                onClick={() => {
                  if (sortBy === header) {
                    const newDirection = toggleDirection(direction);
                    setDirection(newDirection);
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
                        className={`header__caret ${direction === 'desc' ? 'header__caret--descending' : ''}`}
                      />
                    )}
                  </span>
                }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedDebts.map(({ id, Name, NIP, Value, Date: date }) => (
            <tr key={id}>
              <td>{Name}</td>
              <td>{NIP}</td>
              <td>{Value}</td>
              <td>{formtDate(date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
