import { FC, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import { IEventList } from '../../hooks/useEventsListApi'
import { convertTime } from '../../utils/convertTime'

type TableProps = {
  playerRef: any
  list: IEventList[]
}

interface Column {
  id: 'timestamp' | 'duration' | 'width' | 'height' | 'left' | 'top'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'timestamp', label: 'timestamp', minWidth: 120 },
  { id: 'duration', label: 'duration', minWidth: 120 },
  { id: 'width', label: 'width', minWidth: 120 },
  { id: 'height', label: 'height', minWidth: 120 },
  { id: 'left', label: 'left', minWidth: 120 },
  { id: 'top', label: 'top', minWidth: 120 },
]

interface Data {
  timestamp: number
  duration: number
  width: number
  height: number
  left: number
  top: number
}

function createData(listValue: IEventList): Data {
  const timestamp = listValue.timestamp
  const duration = listValue.duration
  const width = listValue.zone.width
  const height = listValue.zone.height
  const left = listValue.zone.left
  const top = listValue.zone.top  
  return { timestamp, duration, width, height, left, top,}
}

export const DataTable: FC<TableProps> = ({list, playerRef}) => {

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const rows: Data[] = list.reduce<Data[]>((acc, item) => {
    acc.push(createData(item))
    return acc
  }, [])

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage)

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, padding: '16px 20px 10px 20px' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.timestamp}
                    onClick={() => playerRef.current.seekTo(row.timestamp)}
                  >
                    {columns.map((column) => {
                      let value: number | string

                      if (column.id === 'timestamp' || column.id === 'duration') {
                        value = convertTime(row[column.id])
                      }
                      else value = row[column.id];

                      return (
                        <TableCell key={column.id} align={column.align} style={{padding: '8px 20px'}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 50]}
        labelRowsPerPage='Число строк'
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