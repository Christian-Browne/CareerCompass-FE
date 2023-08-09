import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import {
  errorLogin,
  getJobApplicationsByUser,
  jobDataType,
} from '../../api/JobApplications';
import SessionExpired from '../../components/SessionExpired';
import JobsTables from '../../components/JobsTables';
import TableSkeleton from '../../components/TableSkeleton';

function Dashboard() {
  const { status, data: jobData } = useQuery<
    jobDataType[] | number | errorLogin
  >(
    ['jobs'],
    () =>
      getJobApplicationsByUser(
        'https://ghrr97wg4j.execute-api.us-west-1.amazonaws.com/prod/home'
      ),
    { staleTime: 0 }
  );

  const navigate = useNavigate();

  if (!sessionStorage.getItem('token')) {
    navigate('/login');
  }

  if (status === 'loading') {
    return (
      <div className="content">
        <TableSkeleton />
      </div>
    );
  }

  if (status == 'success' && Array.isArray(jobData)) {
    return (
      <div className="content">
        <JobsTables jobData={jobData} />
      </div>
    );
  }

  if (
    typeof jobData === 'object' &&
    'code' in jobData &&
    jobData.code === 401
  ) {
    return <SessionExpired />;
  }
}

export default Dashboard;
