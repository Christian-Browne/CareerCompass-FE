import styles from '../../components/tablepanel.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router';

import { ColorKey } from '../../components/JobsTables';
import { addJobByUser } from '../../api/JobApplications';

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

const AddJob = () => {
  const location = useLocation();

  const isDashboardPath = location.pathname.includes('dashboard');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<Inputs>();

  const createJobOnSubmit: SubmitHandler<Inputs> = (formData) => {
    if (isDashboardPath) {
      addJobByUser({
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
        queryClient.invalidateQueries(['job']);
      });
    }
    isDashboardPath ? navigate('/dashboard') : navigate('/demo');
  };

  return (
    <div className="content">
      <form
        action="PUT"
        onSubmit={handleSubmit(createJobOnSubmit)}
        className={styles.panel}
      >
        <div className={styles.panelContent}>
          <div className={styles.inputAction}>
            <label htmlFor="title">Logo URL</label>
            <input
              type="text"
              {...register('logo')}
              className={styles.inputLogo}
              placeholder="+ add a logo URL"
            />
          </div>
        </div>

        <div className={styles.panelContent}>
          <div className={styles.inputAction}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              {...register('title')}
              className={styles.input}
              placeholder="+ add a job title"
            />
          </div>

          <div className={styles.inputAction}>
            <label htmlFor="company">Company</label>
            <input
              type="text"
              {...register('company')}
              className={styles.input}
              placeholder="+ add a comapny"
            />
          </div>

          <div className={styles.inputAction}>
            <label htmlFor="status">Status</label>
            <select {...register('status')} className={styles.input}>
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
              placeholder="+ add a salary"
            />
          </div>

          <div className={styles.inputAction}>
            <label htmlFor="status">Deadline</label>
            <input
              type="text"
              {...register('date')}
              className={styles.input}
              placeholder="+ add a deadline DD-MM-YY"
            />
          </div>

          <div className={styles.inputAction}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              {...register('location')}
              className={styles.input}
              placeholder="+ add a location"
            />
          </div>

          <div className={styles.inputAction}>
            <label htmlFor="color">Color</label>
            <select {...register('color')} className={styles.input}>
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
              placeholder="+ add a URL"
            />
          </div>

          <div className={styles.inputAction}>
            <label htmlFor="description">Description</label>
            <textarea
              {...register('description')}
              className={styles.input}
              placeholder="+ add a description"
            ></textarea>
          </div>
        </div>
        <div className={styles.btnGroup}>
          <button className={styles.btn}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
