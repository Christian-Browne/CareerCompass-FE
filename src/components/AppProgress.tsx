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
        return 'linear-gradient(to right, #8FB0D8, #A2C8F2, #8FB0D8)'; // Blue shades
      case 'Pending':
        return 'linear-gradient(to right, #FFBF80, #FFD1A1, #FFBF80)'; // Orange shades
      case 'Phone':
        return 'linear-gradient(to right, #FFF780, #FFFAA4, #FFF780)'; // Yellow shades
      case 'Onsite':
        return 'linear-gradient(to right, #92E088, #A8E6A1, #92E088)'; // Green shades
      case 'Offered':
        return 'linear-gradient(to right, #C5A5F7, #D9BDF8, #C5A5F7)'; // Purple shades
      case 'Rejected':
        return 'linear-gradient(to right, #FF8888, #FFA4A4, #FF8888)'; // Red shades
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
