import { useEffect, useState } from 'react';
import { getTopDebts } from './api';
import Search from './components/Search';
import Table from './components/Table';
import type { Debt } from './types';
import Loader from './components/Loader';
import NoResults from './components/NoResults';

function App() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getTopDebts().then((data) => {
      setDebts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className='wrapper'>
      <header>
        <Search
          onSearch={(debts) => setDebts(debts)}
          onSearchEnd={() => setLoading(false)}
          onSearchStart={() => setLoading(true)}
        />
      </header>

      <main>
        {loading && <Loader />}

        {!loading && debts.length === 0 ? (
          <NoResults />
        ) : (
          <Table debts={debts} loading={loading} />
        )}
      </main>
    </div>
  );
}

export default App;
