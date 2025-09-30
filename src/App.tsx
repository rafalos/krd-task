import Search from './components/Search';
import Table from './components/Table';

function App() {
  return (
    <div className='wrapper'>
      <header>
        <Search />
      </header>

      <main>
        <Table />
      </main>
    </div>
  );
}

export default App;
