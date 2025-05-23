import React from 'react';
import ThreadCardColumn from './components/ThreadCardColumn/ThreadCardColumn';
import Footer from './components/Footer/Footer';
import MainContent from './components/MainContent/MainContent';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appRoot}>
      <div id="background-animation" className={styles.background}></div>
      <div className={styles.layout}>
        <div className={styles.leftColumn}>
          <MainContent />
        </div>
        <div className={styles.rightColumn}>
          <ThreadCardColumn />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
