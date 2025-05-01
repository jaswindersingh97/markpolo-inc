import React, { useRef, useState, useCallback , useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import usePaginatedUsers from './usePaginatedUsers';
import { debounce } from './utils/Debounce';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor(row => `${row.company.name} (${row.address.city})`, {
    id: 'companyCity',
    header: 'Company (City)',
    cell: info => info.getValue(),
  }),
];

const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 1000;

  const { users, loading, error } = usePaginatedUsers(page, limit, search);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 10,
  });

  // Infinite scroll trigger
  const virtualRows = rowVirtualizer.getVirtualItems();
  const lastItem = virtualRows[virtualRows.length - 1];
  const reachedEnd = lastItem?.index >= users.length - 1;

  useEffect(() => {
    if (reachedEnd && !loading) {
      setPage(prev => prev + 1);
    }
  }, [reachedEnd, loading]);

  const handleSearchChange = useCallback(
    debounce((val) => {
      setPage(1);
      setSearch(val);
    }, 500),
    []
  );

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

  <div className="border rounded">
    <table className="table-fixed w-full border-collapse">
      <thead className="bg-indigo-100 sticky top-0 z-10 text-indigo-800">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className="px-4 py-2 text-left text-sm font-semibold tracking-wide border-b border-indigo-300 bg-indigo-50"
                style={{ width: `${100 / columns.length}%` }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
    </table>

    <div
      ref={parentRef}
      className="overflow-auto bg-white border border-slate-300 rounded shadow-sm"
      style={{ height: '400px' }}
    >
      <table className="table-fixed w-full border-collapse">
        <tbody
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {virtualRows.map(virtualRow => {
            const row = table.getRowModel().rows[virtualRow.index];
            return (
              <tr
                key={row.id}
                className=''
                style={{
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${virtualRow.start}px)`,
                  width: '100%',
                  display: 'table',
                  tableLayout: 'fixed',
                }}
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 text-sm text-slate-800 truncate whitespace-nowrap overflow-hidden border-b border-slate-200"
                    style={{ width: `${100 / columns.length}%` }}
                    title={String(cell.getValue() ?? '')}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
};

export default App;
