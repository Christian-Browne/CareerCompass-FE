import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { errorLogin, jobDataType, getJobByUser } from '../api/JobApplications';
import { useForm, SubmitHandler } from 'react-hook-form';
import SessionExpired from './SessionExpired';
import styles from './tablepanel.module.css';

type Inputs = {
  title: string;
  company: string;
  status: string;
  location: string;
  salary: number;
  color: string;
  postUrl: string;
  description: string;
};

const TablePanel = () => {
  const { id: stringId } = useParams();
  const id = String(stringId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const {
    status,
    error,
    data: jobData,
  } = useQuery<jobDataType | number | errorLogin>(['jobs'], () =>
    getJobByUser(
      `https://ghrr97wg4j.execute-api.us-west-1.amazonaws.com/prod/job/`,
      id
    )
  );

  const isJobData = (data: any): data is jobDataType => {
    return data && typeof data === 'object' && 'title' in data;
  };

  if (status == 'success' && isJobData(jobData)) {
    return (
      <div className="content">
        <div className={styles.panel}>
          <h2>{jobData?.title}</h2>
          <p>{jobData?.company}</p>
          <div className={styles.panelContent}>
            <div className={styles.inputAction}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                {...register('title')}
                className={styles.input}
                defaultValue={jobData?.title}
                placeholder="+ add a job title"
              />
            </div>

            <div className={styles.inputAction}>
              <label htmlFor="company">Company</label>
              <input
                type="text"
                {...register('company')}
                className={styles.input}
                defaultValue={jobData?.company}
                placeholder="+ add a comapny"
              />
            </div>

            <div className={styles.inputAction}>
              <label htmlFor="status">Status</label>
              <input
                type="text"
                {...register('status')}
                className={styles.input}
                defaultValue={jobData?.status}
                placeholder="+ add a status"
              />
            </div>

            <div className={styles.inputAction}>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                {...register('location')}
                className={styles.input}
                defaultValue={jobData?.location}
                placeholder="+ add a location"
              />
            </div>

            <div className={styles.inputAction}>
              <label htmlFor="color">Color</label>
              <input
                type="text"
                {...register('color')}
                className={styles.input}
                defaultValue={jobData?.color}
              />
            </div>

            <div className={styles.inputAction}>
              <label htmlFor="salary">Salary</label>
              <input
                type="text"
                {...register('salary')}
                className={styles.input}
                defaultValue={jobData?.salary}
                placeholder="+ add a salary"
              />
            </div>

            <div className={styles.inputAction}>
              <label htmlFor="postUrl">Post Url</label>
              <input
                type="text"
                {...register('postUrl')}
                className={styles.input}
                defaultValue={jobData?.postUrl}
                placeholder="+ add a url"
              />
            </div>

            <div className={styles.inputAction}>
              <label htmlFor="description">Description</label>
              <textarea
                {...register('description')}
                className={styles.input}
                defaultValue={jobData?.description}
                placeholder="+ add a description"
              ></textarea>
            </div>
          </div>
          <button className={styles.btn}>Submit</button>
        </div>
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
};

export default TablePanel;
