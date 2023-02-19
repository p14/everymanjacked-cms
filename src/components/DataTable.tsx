import { useEffect, useState } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DataTableProps {
  rows: any[]
  columns: GridColDef[]
  type: string
}

const DataTable = ({ rows, columns, type }: DataTableProps) => {

  const [pageSize, setPageSize] = useState<number>(5);
  const [searchField, setSearchField] = useState<string>(columns[0].field);
  const [search, setSearch] = useState<string>('');
  const [filteredRows, setFilteredRows] = useState<any[]>(rows);

  useEffect(() => {
    if (!search) {
      setFilteredRows(rows);
    } else {
      const filtered = rows.filter((row) => {
        let searchValues: string[] | string = row[searchField];
        if (Array.isArray(searchValues)) {
          return searchValues.some((option: string) => option.toLowerCase().includes(search.toLowerCase()));
        }
        return searchValues.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredRows(filtered);
    }
  }, [rows, search, searchField]);

  return (
    <Box width='100%'>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, marginBottom: 1 }}>
        <TextField
          sx={{ paddingBottom: { xs: '8px', sm: '0px' }, width: { xs: '100%', sm: '70%' } }}
          label='Search'
          type='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          select
          sx={{ display: { xs: 'none', sm: 'flex' }, marginLeft: '5px', width: '30%' }}
          label='Search Field'
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        >
          {columns.filter((column) => column.field !== 'actions' && !column.hide).map((column) => {
            return (
              <MenuItem key={column.field} value={column.field}>
                {column.headerName}
              </MenuItem>
            )
          })}
        </TextField>
      </Box>
      <DataGrid
        autoHeight
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 25]}
        disableSelectionOnClick
        disableColumnFilter
        disableColumnMenu
      />
    </Box>
  );
};

export default DataTable;
