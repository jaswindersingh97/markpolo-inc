import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper();

export const userColumns = [
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
    cell: info => info.getValue(), // The formatting is now done at the data level
  }),
  columnHelper.accessor(row => `${row.company.name} (${row.address.city})`, {
    id: 'companyCity',
    header: 'Company (City)',
    cell: info => info.getValue(),
  }),
];