import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Legal from './pages/Legal';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ThreadCardColumn from './components/ThreadCardColumn/ThreadCardColumn';
import Footer from './components/Footer/Footer';
import MainContent from './components/MainContent/MainContent';
import styles from './App.module.css';
import Logo from './components/Logo';
import BackgroundAnimation from './components/BackgroundAnimation';

export default function App() {
  return (
    <BrowserRouter basename="/stack-legal/stack-landing">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/legal/privacy" element={<Privacy />} />
        <Route path="/legal/terms" element={<Terms />} />
      </Routes>
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
    </BrowserRouter>
  );
}
