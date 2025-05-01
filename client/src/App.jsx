import React, { useState, useCallback } from 'react';
import { debounce } from './utils/Debounce';
import usePaginatedUsers from './hooks/usePaginatedUsers';
import UserTable from './components/UsersTable';
import { userColumns } from './columns/columns';

const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 50;

  const { users, loading, error } = usePaginatedUsers(page, limit, search);

  const handleSearchChange = useCallback(
    debounce((val) => {
      setPage(1);
      setSearch(val);
    }, 500),
    []
  );

  const handleReachedEnd = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-500">User List</h1>
      </header>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Name or Email"
          className="border border-slate-300 focus:border-indigo-500 focus:ring-indigo-500 p-2 rounded w-full shadow-sm"
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <UserTable 
        data={users} 
        columns={userColumns} 
        loading={loading}
        onReachedEnd={handleReachedEnd}
      />
    </div>
  );
};

export default App;