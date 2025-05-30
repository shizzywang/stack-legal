import ThreadCardColumn from './components/ThreadCardColumn/ThreadCardColumn';
import Footer from './components/Footer/Footer';
import MainContent from './components/MainContent/MainContent';
import styles from './App.module.css';
import Logo from './components/Logo';
import BackgroundAnimation from './components/BackgroundAnimation';

export default function App() {
  return (
    <div className={styles.appRoot}>
      <BackgroundAnimation />
      <div className={styles.logo}>
        <span>S</span>
        <span>t</span>
        <span>a</span>
        <span>c</span>
        <span>k</span>
      </div>
      <div className={styles.layout}>
        <div className={styles.leftColumn}>
          <MainContent />
          <Footer />
        </div>
        <div className={styles.rightColumn}>
          <ThreadCardColumn />
        </div>
      </div>
      <div className={styles.cornerIcon}>
        <Logo height={38} baseDuration={12000} />
      </div>
    </div>
  );
}
