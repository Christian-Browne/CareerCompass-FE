import { useState } from 'react';
import { checkTokenExpiration } from '../../api/JobApplications';
import { useQuery } from '@tanstack/react-query';
import { getJobApplications, jobDataType } from '../../api/JobApplications';
import SessionExpired from '../../components/SessionExpired';

function Dashboard() {
  let [status, setStatus] = useState<number | null>();

  //   const {
  //     status,
  //     error,
  //     data: jobData,
  //   } = useQuery<jobDataType[]>(['jobs'], () => getJobApplications());

  return (
    <div className="content">
      <div>Dashboard</div>
      <button>test</button>
      {status == 403 && <SessionExpired />}
    </div>
  );
}

export default Dashboard;
