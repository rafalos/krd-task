import { getFilteredDebts } from '../../api';
import type { Debt } from '../../types';

interface Props {
  onSearch: (debts: Debt[]) => void;
  onSearchStart: () => void;
  onSearchEnd: () => void;
}

const Search = ({ onSearch, onSearchEnd, onSearchStart }: Props) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query');

    if (!query) return;

    onSearchStart();
    const results = await getFilteredDebts(query.toString());

    onSearch(results);
    onSearchEnd();
  };

  return (
    <div className='container search'>
      <p className='search__heading'>Podaj NIP lub nazwę dłużnika</p>
      <form
        className='search__control'
        onSubmit={(event) => handleSubmit(event)}
      >
        <input type='text' className='search__input' name='query' />
        <button className='search__button'>Szukaj</button>
      </form>
    </div>
  );
};

export default Search;
