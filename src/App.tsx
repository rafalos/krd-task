import { useEffect, useState } from 'react';
import { getTopDebts } from './api';
import Search from './components/Search';
import Table from './components/Table';
import type { Debt } from './types';

function App() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTopDebts().then((res) => {
      setDebts(res);
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
        <Table debts={debts} loading={loading} />
      </main>
    </div>
  );
}

export default App;
