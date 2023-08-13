import TableSkeleton from '../../components/TableSkeleton';
import { useQuery } from '@tanstack/react-query';
import { jobDataType, getJobApplications } from '../../api/JobApplications';
import JobsTables from '../../components/JobsTables';
import ErrorComponent from '../../components/ErrorComponent';
import AppProgress from '../../components/AppProgress';

function HomeDemo() {
  const {
    status,
    error,
    data: jobData,
  } = useQuery<jobDataType[]>(['jobs'], () =>
    getJobApplications(
      'https://ghrr97wg4j.execute-api.us-west-1.amazonaws.com/prod/demo'
    )
  );

  if (status === 'loading') {
    return (
      <div className="content">
        <TableSkeleton />
      </div>
    );
  }

  if (status == 'success') {
    return (
      <div className="content">
        <AppProgress jobData={jobData} />
        <JobsTables jobData={jobData} />
      </div>
    );
  }
}

export default HomeDemo;
