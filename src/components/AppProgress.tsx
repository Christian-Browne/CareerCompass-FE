import React from 'react';
import { jobDataType } from '../api/JobApplications';
import styles from './appprogress.module.css';

type Props = {
  jobData: jobDataType[];
};

const AppProgress: React.FC<Props> = ({ jobData }) => {
  const counts: any = {
    Applied: 0,
    Pending: 0,
    Phone: 0,
    Onsite: 0,
    Offered: 0,
    Rejected: 0,
  };

  jobData.forEach((job) => {
    if (counts[job.status] != undefined) {
      counts[job.status] += 1;
    }
  });

  const totalCount = jobData.length;

  const getColorForStatus = (status: keyof typeof counts) => {
    switch (status) {
      case 'Applied':
        return 'radial-gradient(circle at 12.3% 19.3%, rgb(85, 88, 218) 0%, rgb(95, 209, 249) 100.2%)'; // Blue shades
      case 'Pending':
        return 'linear-gradient(-60deg, #ff5858 0%, #f09819 100%)'; // Orange shades
      case 'Phone':
        return 'linear-gradient(109.6deg, rgb(255, 219, 47) 11.2%, rgb(244, 253, 0) 100.2%)'; // Yellow shades
      case 'Onsite':
        return 'linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))'; // Green shades
      case 'Offered':
        return 'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)'; // Purple shades
      case 'Rejected':
        return 'linear-gradient(102.2deg, rgb(250, 45, 66) 9.6%, rgb(245, 104, 104) 96.1%)'; // Red shades
      default:
        return 'linear-gradient(to right, #D0D0D0, #EAEAEA, #D0D0D0)'; // Grey shades
    }
  };

  if (Object.values(counts).every((count) => count === 0)) return null;

  return (
    <div className={styles.bar}>
      {Object.entries(counts).map(([status, count]) => {
        const widthPercentage = ((count as number) / totalCount) * 100;
        return (
          <div
            key={status}
            style={{
              flex: widthPercentage,
              height: '100%',
              paddingBottom: '5px',
              paddingLeft: (count as number) > 0 ? '1em' : '0',
              paddingTop: '5px',
              background: getColorForStatus(status as keyof typeof counts),
              borderRadius:
                status === 'Applied'
                  ? '50px 0px 0px 50px'
                  : status === 'Rejected'
                  ? '0px 50px 50px 0px'
                  : '0px',
              overflow: 'hidden',
            }}
            title={`${status}: ${count}`}
          >
            {widthPercentage > 5 ? `${count} ${status}` : ''}
            {/* Only show status text if there's room */}
          </div>
        );
      })}
    </div>
  );
};

export default AppProgress;
