import { Link } from 'react-router-dom';
import styles from './landingPage.module.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const LandingPage = () => {
  return (
    <>
      <div className={styles.landingPage}>
        <div className={styles.hero}></div>

        <div className={styles.ctaSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Career Compass</h1>
            <p className={styles.heroSubtitle}>
              Join us on a journey to discover new horizons.
            </p>
            <img
              src="src/assets/careercompasslogo.png"
              alt="Logo"
              className={styles.heroImage}
            />
          </div>
          <Link to={'login'}>
            <button className={styles.btn}>Log in</button>
          </Link>
          <Link to={'signup'}>
            <button className={styles.btn2}>Sign up</button>
          </Link>
          <Link to={'demo'} className={styles.ctaLink}>
            <PlayArrowIcon />
            <p>VIEW DEMO APP</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
