import React from 'react';
import styles from './MainContent.module.css';

const MainContent = () => (
  <div className={styles.mainContent}>
    <h1 className={styles.headline}>A simpler way to turn thoughts into action</h1>
    <p className={styles.description}>
      Stack is an intuitive space to organise, reflect, and manifest.<br />
      A place to take thoughts from the spirit and put them to the touch.
    </p>
    <div className={styles.downloadRow}>
      <button className={styles.downloadBtn + ' ' + styles.active}>Mobile</button>
      <button className={styles.downloadBtn} disabled>Desktop</button>
      <button className={styles.downloadBtn} disabled>Web</button>
    </div>
    <div className={styles.storeRow}>
      <button className={styles.storeBtn}>🍏 Apple</button>
      <button className={styles.storeBtn}>🤖 Playstore</button>
    </div>
  </div>
);

export default MainContent; 