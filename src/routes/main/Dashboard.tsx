import { useQuery } from '@tanstack/react-query';
import { styled } from '@mui/material/styles';
import { Skeleton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from '@mui/material';

import {
  errorLogin,
  getJobApplicationsByUser,
  jobDataType,
} from '../../api/JobApplications';
import SessionExpired from '../../components/SessionExpired';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
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
    backgroundColor: theme.palette.grey[300],
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type ColorKey = 'RED' | 'BLACK' | 'ORANGE' | 'TEAL' | 'BLUE';

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

function Dashboard() {
  const {
    status,
    error,
    data: jobData,
  } = useQuery<jobDataType[] | number | errorLogin>(['jobs'], () =>
    getJobApplicationsByUser(
      'https://ghrr97wg4j.execute-api.us-west-1.amazonaws.com/prod/home'
    )
  );
  console.log(jobData);

  if (status === 'loading') {
    return (
      <>
        <Skeleton
          variant="rounded"
          width={1700}
          height={70}
          animation="wave"
          sx={{ marginBottom: 2 }}
        />
        <Skeleton
          variant="rounded"
          width={1700}
          height={70}
          animation="wave"
          sx={{ marginBottom: 2 }}
        />
        <Skeleton
          variant="rounded"
          width={1700}
          height={70}
          animation="wave"
          sx={{ marginBottom: 2 }}
        />
        <Skeleton
          variant="rounded"
          width={1700}
          height={70}
          animation="wave"
          sx={{ marginBottom: 2 }}
        />
      </>
    );
  }

  if (status == 'success' && Array.isArray(jobData)) {
    return (
      <div className="content">
        <TableContainer component={Paper}>
          <Table
            stickyHeader
            sx={{ minWidth: 700 }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ width: '250px' }}>
                  Job Position
                </StyledTableCell>
                <StyledTableCell>Company</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell>Salary</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Post URL</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobData?.map((job: any) => {
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
                  <StyledTableRow key={job.id}>
                    <StyledTableCell>
                      <Link href="https://www.google.com">
                        <strong>
                          <span className="firstColumnText" style={style}>
                            {job.title}
                          </span>
                        </strong>
                      </Link>
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
        {typeof jobData === 'object' &&
          'code' in jobData &&
          jobData.code === 401 && <SessionExpired />}
      </div>
    );
  }
}

export default Dashboard;
