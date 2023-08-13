import { Outlet, useNavigate } from 'react-router';
import styles from './root.module.css';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

function Root() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className={styles.topNav}>
          <h1>Career Compass Board</h1>
          <button className={styles.btn} onClick={() => navigate('job/add')}>
            <AddIcon />
            Add New Job
          </button>
        </div>

        <div className={styles.sideNavbar}>
          <Link to={'/'} className={styles.link}>
            <li className={styles.navItemImage}>
              <img
                src="../src/assets/careercompasslogo.png"
                alt="logo"
                className={styles.logoImage}
              />
            </li>
          </Link>
          <Link to={'/'} className={styles.link}>
            <li className={styles.navItem}>Home</li>
          </Link>
          <Link to={'/dashboard'} className={styles.link}>
            <li className={styles.navItem}>Dashboard</li>
          </Link>
          <Link to={'/demo'} className={styles.link}>
            <li className={styles.navItem}>Demo</li>
          </Link>
          <Link to={'/login'} className={styles.link}>
            <li className={styles.navItem}>Login</li>
          </Link>
          <Link to={'/signup'} className={styles.link}>
            <li className={styles.navItem}>Signup</li>
          </Link>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Root;
