import { useState } from 'react';
import { getFilteredDebts } from '../../api';
import type { Debt } from '../../types';

interface Props {
  onSearch: (debts: Debt[]) => void;
  onSearchStart: () => void;
  onSearchEnd: () => void;
}

const Search = ({ onSearch, onSearchEnd, onSearchStart }: Props) => {
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError('');
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query');

    if (!query) return;

    onSearchStart();
    try {
      const results = await getFilteredDebts(query.toString());
      onSearch(results);
    } catch (error) {
      if (error instanceof Error) {
        setValidationError(error.message);
      }
    } finally {
      onSearchEnd();
    }
  };

  return (
    <div className='container search'>
      <p className='search__heading'>Podaj NIP lub nazwę dłużnika</p>
      <form
        className='search__control'
        onSubmit={(event) => handleSubmit(event)}
        aria-label='search form'
      >
        <input type='text' className='search__input' name='query' />
        <button type='submit' className='search__button'>Szukaj</button>
      </form>
      <p className='search__error'>{validationError}</p>
    </div>
  );
};

export default Search;
