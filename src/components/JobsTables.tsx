import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { jobDataType } from '../api/JobApplications';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import '../index.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '',
    color: theme.palette.common.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontWeight: '400',
    color: theme.palette.grey[600],
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&': {
    backgroundColor: theme.palette.augmentColor,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export type ColorKey = 'RED' | 'BLACK' | 'ORANGE' | 'TEAL' | 'BLUE';

const colorMap: Record<ColorKey, string> = {
  RED: '#E3371E',
  BLACK: '#151F30',
  ORANGE: '#FF7A48',
  TEAL: '#0593A2',
  BLUE: '#103778',
};

function getContrastTextColor(backgroundColor: string) {
  const color = backgroundColor.substring(1); // Remove the #
  const red = parseInt(color.substring(0, 2), 16);
  const green = parseInt(color.substring(2, 4), 16);
  const blue = parseInt(color.substring(4, 6), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  return brightness > 155 ? 'black' : 'white'; // Threshold can be adjusted
}

type Props = {
  jobData: jobDataType[];
};

const JobsTables: React.FC<Props> = ({ jobData }) => {
  const navigate = useNavigate();

  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedJobData = [...jobData].sort((a: any, b: any) => {
    let compareA, compareB;

    if (typeof a.salary === 'string') {
      compareA = parseFloat(a.salary.replace(/[^0-9.-]+/g, '')) || 0;
      compareB = parseFloat(b.salary.replace(/[^0-9.-]+/g, '')) || 0;
    } else {
      compareA = a.salary || 0;
      compareB = b.salary || 0;
    }

    if (sortDirection === 'asc') {
      return compareA - compareB;
    } else {
      return compareB - compareA;
    }
  });

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{ maxHeight: '81vh' }}>
        <Table stickyHeader sx={{ minWidth: 700 }} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: '250px' }}>
                Job Position
              </StyledTableCell>
              <StyledTableCell>Company</StyledTableCell>
              <StyledTableCell sx={{ width: '200px' }}>
                Location
              </StyledTableCell>
              <StyledTableCell
                onClick={() => {
                  setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
                }}
              >
                {sortDirection === 'asc' ? (
                  <IconButton
                    size="small"
                    sx={{ paddingLeft: '0px', marginRight: '5px' }}
                  >
                    <ArrowUpwardIcon fontSize="inherit" />
                  </IconButton>
                ) : (
                  <IconButton
                    size="small"
                    sx={{ paddingLeft: '0px', marginRight: '5px' }}
                  >
                    <ArrowDownwardIcon fontSize="inherit" />
                  </IconButton>
                )}
                Salary
              </StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Post URL</StyledTableCell>
              <StyledTableCell onClick={() => handleSort('date')}>
                {sortDirection === 'asc' ? (
                  <IconButton
                    size="small"
                    sx={{ paddingLeft: '0px', marginRight: '5px' }}
                  >
                    <ArrowUpwardIcon fontSize="inherit" />
                  </IconButton>
                ) : (
                  <IconButton
                    size="small"
                    sx={{ paddingLeft: '0px', marginRight: '5px' }}
                  >
                    <ArrowDownwardIcon fontSize="inherit" />
                  </IconButton>
                )}
                Date
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedJobData?.map((job: any) => {
              const backgroundColor = colorMap[job.color as ColorKey];
              const textColor = backgroundColor
                ? getContrastTextColor(backgroundColor)
                : undefined;
              const style =
                textColor === 'black' || textColor === 'white'
                  ? {
                      backgroundColor: backgroundColor,
                      color: textColor,
                    }
                  : {};

              return (
                <StyledTableRow
                  key={job.id}
                  className="rowHover"
                  onClick={() => {
                    navigate(`job/${job.id}`);
                  }}
                >
                  <StyledTableCell>
                    <strong>
                      <span className="firstColumnText" style={style}>
                        {job.title}
                      </span>
                    </strong>
                  </StyledTableCell>
                  <StyledTableCell>{job.company}</StyledTableCell>
                  <StyledTableCell>{job.location}</StyledTableCell>
                  <StyledTableCell>{job.salary}</StyledTableCell>
                  <StyledTableCell>{job.status}</StyledTableCell>
                  <StyledTableCell>{job.postUrl}</StyledTableCell>
                  <StyledTableCell>{job.date}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default JobsTables;
