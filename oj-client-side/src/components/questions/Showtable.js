import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

function Showtable(props) {
  const { data } = props;
  console.log(data);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = [
    { id: 'problemName', label: 'Name', minWidth: 170 },
    { id: 'submittedAt', label: 'submissionTime', minWidth: 100 },
    {
      id: `status`,
      label: 'Status',
      minWidth: 170,
      align: 'right',
    },
    {
      id: `ExecutionTime`,
      label: 'Execution Time',
      minWidth: 170,
      align: 'right',
    },
    {
      id: `language`,
      label: 'Language',
      minWidth: 170,
      align: 'right',
    },
  ];

  function createData(propsData) {
    let { problemName, submittedAt, status, completedAt, startedAt, language } = propsData;
    if (status === 'error')
      status = 'Rejected';
    if (status === 'success')
      status = 'Accepted';
    if (!problemName)
      problemName = "Kadane";
    let ExecutionTime = new Date(completedAt) - new Date(startedAt);
    if (isNaN(ExecutionTime))
      ExecutionTime = 1053;
    return { problemName, submittedAt, status, ExecutionTime, language };
  }

  const rows = data.map(createData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '76vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        /* TODO : corrections in showing correct answer and its color ! */
                        <TableCell
                          style={{ color: value === 'Rejected' ? '#d11534' : (value === 'Accepted' ? '#32c766' : '') }}
                          key={column.id}
                          align={column.align}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default Showtable