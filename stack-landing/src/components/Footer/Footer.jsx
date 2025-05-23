import React from 'react';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <a href="/privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
    <span className={styles.dot}>•</span>
    <a href="/terms.html" target="_blank" rel="noopener noreferrer">Terms of Service</a>
  </footer>
);

export default Footer;
