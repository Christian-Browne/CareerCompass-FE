import { Outlet, useNavigate } from 'react-router';
import styles from './root.module.css';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

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
                src="../public/careercompasslogo.png"
                alt="logo"
                className={styles.logoImage}
              />
            </li>
          </Link>
          <Link to={'/'} className={styles.link}>
            <HomeIcon />
            <li className={styles.navItem}>Home</li>
          </Link>
          <Link to={'/dashboard'} className={styles.link}>
            <DashboardIcon />
            <li className={styles.navItem}>Dashboard</li>
          </Link>
          <Link to={'/demo'} className={styles.link}>
            <PlayArrowIcon />
            <li className={styles.navItem}>Demo</li>
          </Link>
          <Link to={'/login'} className={styles.link}>
            <PersonIcon />
            <li className={styles.navItem}>Login</li>
          </Link>
          <Link to={'/signup'} className={styles.link}>
            <PersonAddIcon />
            <li className={styles.navItem}>Signup</li>
          </Link>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Root;
