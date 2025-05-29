import React from 'react';
import styles from './MainContent.module.css';

const MainContent = () => (
  <div className={styles.mainContent}>
    <h1 className={styles.headline}>A simpler way to organise thoughts into action</h1>
    <p className={styles.description}>
      Stack is the place to take thoughts from the spirit and put them to the touch - a tactile space to quickly capture your ideas, notes, and to-dos.
    </p>
    <div className={styles.downloadRow}>
      <button className={styles.downloadBtn + ' ' + styles.active}>Mobile</button>
      <button className={styles.downloadBtn} disabled>Desktop</button>
      <button className={styles.downloadBtn} disabled>Web</button>
    </div>
    <div className={styles.storeRow}>
      <a href="https://apps.apple.com/gb/app/stack-productivity/id6745231952" target="_blank" rel="noopener noreferrer" className={styles.storeBtn}>🍏 Apple</a>
      <button className={styles.downloadBtn} disabled>🤖 Playstore</button>
    </div>
  </div>
);

export default MainContent; 