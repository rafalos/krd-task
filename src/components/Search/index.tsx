const Search = () => {
  return (
    <div className='container search'>
      <p className='search__heading'>Podaj NIP lub nazwę dłużnika</p>
      <div className='search__control'>
        <input type='text' className='search__input' />
        <button className='search__button'>Szukaj</button>
      </div>
    </div>
  );
};

export default Search;
