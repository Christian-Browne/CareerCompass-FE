import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams, useLocation } from 'react-router';
import { useState } from 'react';
import {
  errorLogin,
  jobDataType,
  getJobByUser,
  getJob,
  postJobByUser,
  deleteJobByUser,
} from '../api/JobApplications';
import { useForm, SubmitHandler } from 'react-hook-form';
import SessionExpired from './SessionExpired';
import styles from './tablepanel.module.css';
import { ColorKey } from './JobsTables';

type Inputs = {
  title: string;
  company: string;
  logo: string;
  status: string;
  date: string;
  location: string;
  salary: number;
  color: ColorKey;
  postUrl: string;
  description: string;
};

const TablePanel = () => {
  const { id: stringId } = useParams();
  const id = String(stringId);

  const location = useLocation();

  const isDashboardPath = location.pathname.includes('dashboard');
  const queryKey = isDashboardPath ? 'job' : 'jobDemo';
  const fetchData = isDashboardPath ? () => getJobByUser(id) : () => getJob(id);
  const [jobData, setJobData] = useState<jobDataType | null>(null);

  const [showImageInput, setShowImageInput] = useState<boolean>(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isJobData = (data: any): data is jobDataType => {
    return data && typeof data === 'object' && 'title' in data;
  };

  const { register, handleSubmit } = useForm<Inputs>();

  const { status } = useQuery<jobDataType | number | errorLogin>(
    [queryKey, id],
    fetchData,
    {
      onSuccess: (data) => {
        if (isJobData(data)) {
          setJobData(data);
        }
      },
    }
  );

  const updateJobOnSubmit: SubmitHandler<Inputs> = (formData) => {
    if (isDashboardPath && isJobData(jobData)) {
      postJobByUser(jobData.id, {
        title: formData.title,
        company: formData.company,
        logo: formData.logo,
        status: formData.status,
        date: formData.date,
        location: formData.location,
        salary: formData.salary,
        color: formData.color,
        postUrl: formData.postUrl,
        description: formData.description,
      }).then(() => {
        queryClient.invalidateQueries(['jobs']);
        queryClient.invalidateQueries(['job', id]);
      });
    }
    isDashboardPath ? navigate('/dashboard') : navigate('/demo');
  };

  const deleteJob = () => {
    if (isDashboardPath && isJobData(jobData)) {
      deleteJobByUser(jobData.id);
      queryClient.invalidateQueries(['jobs']);
      queryClient.invalidateQueries(['job', id]);
      navigate('/dashboard');
    }
  };

  if (status == 'success' && isJobData(jobData)) {
    return (
      <div className="content">
        <form
          action="PUT"
          onSubmit={handleSubmit(updateJobOnSubmit)}
          className={styles.panel}
        >
          <img
            src={jobData?.logo}
            alt="logo"
            onClick={() => setShowImageInput(!showImageInput)}
            className={styles.logo}
          />
          {showImageInput && (
            <div className={styles.panelContent}>
              <div className={styles.inputAction}>
                <label htmlFor="title">Logo URL</label>
                <input
                  type="text"
                  {...register('logo')}
                  className={styles.inputLogo}
                  defaultValue={jobData?.logo}
                  placeholder="+ add a logo URL"
                />
              </div>
            </div>
          )}
          <h2 className={styles.headerH2}>{jobData?.title}</h2>
          <p className={styles.headerP}>{jobData?.company}</p>

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
              <select
                {...register('status')}
                defaultValue={jobData?.status}
                className={styles.input}
              >
                <option value="Applied">Applied</option>
                <option value="Pending">Pending</option>
                <option value="Phone">Phone</option>
                <option value="Onsite">Onsite</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">Rejected</option>
              </select>
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
              <label htmlFor="status">Deadline</label>
              <input
                type="text"
                {...register('date')}
                className={styles.input}
                defaultValue={jobData?.date}
                placeholder="+ add a deadline DD-MM-YY"
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
              <select
                {...register('color')}
                defaultValue={jobData?.color}
                className={styles.input}
              >
                <option value="RED">Red</option>
                <option value="BLACK">Black</option>
                <option value="ORANGE">Orange</option>
                <option value="TEAL">Teal</option>
                <option value="BLUE">Blue</option>
              </select>
            </div>

            <div className={styles.inputAction}>
              <label htmlFor="postUrl">Post URL</label>
              <input
                type="text"
                {...register('postUrl')}
                className={styles.input}
                defaultValue={jobData?.postUrl}
                placeholder="+ add a URL"
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
          <div className={styles.btnGroup}>
            <p className={styles.btnDelete} onClick={deleteJob}>
              Delete
            </p>
            <button className={styles.btn}>Submit</button>
          </div>
        </form>
      </div>
    );
  }

  if (
    jobData != null &&
    typeof jobData === 'object' &&
    'code' in jobData &&
    jobData?.code === 401
  ) {
    return <SessionExpired />;
  }
};

export default TablePanel;
