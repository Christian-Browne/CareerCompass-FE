import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CircularProgress, Alert } from '@mui/material';
import styles from './signup.module.css';
import { useNavigate, Link } from 'react-router-dom';

type Inputs = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [status, setStatus] = useState<number | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const loginOnSubmit: SubmitHandler<Inputs> = async (formData) => {
    setStatus(202);

    const response = await fetch(
      'https://ghrr97wg4j.execute-api.us-west-1.amazonaws.com/prod/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
          role: 'USER',
        }),
      }
    );

    if (response.status == 403) {
      setStatus(403);
    }

    if (response.status == 200) {
      setStatus(200);
      const data = await response.json();
      sessionStorage.setItem('token', data.token);
      navigate('/dashboard');
    }

    setStatus(null);
  };

  return (
    <form
      action="POST"
      onSubmit={handleSubmit(loginOnSubmit)}
      className={styles.form}
    >
      <div className={styles.header}>
        <Link to={'/'}>
          <img
            src="src/assets/careercompasslogo.png"
            alt="logo"
            className={styles.logo}
          />
        </Link>
        <h2>Create account</h2>
        <p>to continue to Career Compass</p>
      </div>

      <div className={styles.content}>
        <input
          type="text"
          {...register('firstname')}
          className={styles.input}
          placeholder="First Name"
        />
        <input
          type="text"
          {...register('lastname')}
          className={styles.input}
          placeholder="Last Name"
        />
        <input
          type="text"
          {...register('email')}
          className={styles.input}
          placeholder="Email"
        />
        <input
          type="text"
          {...register('password')}
          className={styles.input}
          placeholder="Password"
        />

        <button type="submit" className={styles.btn}>
          {status == 202 ? <CircularProgress color="inherit" /> : 'Submit'}
        </button>
        {status === 403 && (
          <Alert severity="error">
            The email address or password you've entered doesn't match any
            account
          </Alert>
        )}
      </div>
    </form>
  );
};

export default Signup;
