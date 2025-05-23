import React from 'react';
import ThreadCardColumn from './components/ThreadCardColumn/ThreadCardColumn';
import Footer from './components/Footer/Footer';
import MainContent from './components/MainContent/MainContent';
import styles from './App.module.css';
import Logo from './components/Logo';

function App() {
  return (
    <div className={styles.appRoot}>
      <div id="background-animation" className={styles.background}></div>
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
        </div>
        <div className={styles.rightColumn}>
          <ThreadCardColumn />
        </div>
      </div>
      <Footer />
      <div className={styles.cornerIcon}>
        <Logo height={38} baseDuration={12000} />
      </div>
    </div>
  );
}

export default App;
