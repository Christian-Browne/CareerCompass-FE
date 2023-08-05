import { Backdrop } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './sessionexpired.module.css';

const SessionExpired = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={() => setOpen(false)}
    >
      <div className={styles.modal}>
        <h2>Session Expired</h2>
        <p>Your session has expired.</p>
        <p>You will be redirected to the Login page.</p>
        <button className={styles.btn} onClick={() => navigate('/login')}>
          Ok
        </button>
      </div>
    </Backdrop>
  );
};

export default SessionExpired;
