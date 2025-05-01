import React, { useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { formatPhoneNumber } from './../utils/phoneUtils'; // We'll create this utility
import loader from './../assets/loader.webp';
const UserTable = ({ data, columns, loading, onReachedEnd }) => {
  const table = useReactTable({
    data,
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

  const virtualRows = rowVirtualizer.getVirtualItems();
  const lastItem = virtualRows[virtualRows.length - 1];
  const reachedEnd = lastItem?.index >= data.length - 1;

  React.useEffect(() => {
    if (reachedEnd && !loading && onReachedEnd) {
      onReachedEnd();
    }
  }, [reachedEnd, loading, onReachedEnd]);

  const formattedData = React.useMemo(() => {
    return data.map(user => ({
      ...user,
      phone: formatPhoneNumber(user.phone) // Format phone numbers
    }));
  }, [data]);

  const formattedTable = useReactTable({
    data: formattedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
        className="overflow-auto bg-white border border-slate-300 rounded shadow-sm relative"
        style={{ height: '400px' }}
      >
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-20">
            <div className="text-center">
              <img 
                src={loader} 
                alt="Loading..." 
                className="w-16 h-16 mx-auto mb-2"
              />
              <p className="text-indigo-600 font-medium">Loading more users...</p>
            </div>
          </div>
        )}

        <table className="table-fixed w-full border-collapse">
          <tbody
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative',
            }}
          >
            {virtualRows.map(virtualRow => {
              const row = formattedTable.getRowModel().rows[virtualRow.index];
              return (
                <tr
                  key={row.id}
                  className='hover:bg-indigo-50 transition-colors  border-b border-slate-200 '
                  style={{
                    position: 'absolute',
                    top: 0,
                    transform: `translateY(${virtualRow.start}px)`,
                    width: '100%',
                    display: 'table',
                    height:"48px",
                    tableLayout: 'fixed',
                  }}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-4 py-2 text-sm text-slate-800 truncate whitespace-nowrap overflow-hidden "
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
  );
};

export default UserTable;