import React from 'react';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.links}>
      <a href="https://shizzywang.github.io/stack-legal/legal/privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
      <span className={styles.dot}>•</span>
      <a href="https://shizzywang.github.io/stack-legal/legal/terms.html" target="_blank" rel="noopener noreferrer">Terms of Service</a>
    </div>
    <span className={styles.copyright}>
      © {new Date().getFullYear()} Stack Productivity
    </span>
  </footer>
);

export default Footer;
