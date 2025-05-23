import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';
import ThreadCard from '../ThreadCard/ThreadCard';
import styles from './ThreadCardColumn.module.css';
import threads from '../../data/threads.json';

const CARD_HEIGHT = 110 + 20; // Card height + gap (20px)
const THREAD_COUNT = threads.length;
const LOOP_COUNT = 6; // Render 6x for seamless looping and to fill the column
const TOTAL_CARDS = THREAD_COUNT * LOOP_COUNT;

const ThreadCardColumn = () => {
  const containerRef = useRef(null);
  // Start at 0 so cards are visible
  const scrollY = useMotionValue(0);
  const ySpring = useSpring(scrollY, { stiffness: 60, damping: 18, mass: 0.5 });
  const velocity = useVelocity(ySpring);

  // Infinite looping logic
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      // If scrolled past end, reset to start
      if (latest < -CARD_HEIGHT * THREAD_COUNT * (LOOP_COUNT - 2)) {
        scrollY.set(latest + CARD_HEIGHT * THREAD_COUNT);
      }
      // If scrolled past start, reset to end
      if (latest > CARD_HEIGHT * THREAD_COUNT) {
        scrollY.set(latest - CARD_HEIGHT * THREAD_COUNT);
      }
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Wheel event for desktop/trackpad
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onWheel = (e) => {
      e.preventDefault();
      let next = scrollY.get() - e.deltaY;
      scrollY.set(next);
    };
    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [scrollY]);

  // Touch event for mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let startY = 0;
    let lastY = 0;
    let dragging = false;
    const onTouchStart = (e) => {
      dragging = true;
      startY = e.touches[0].clientY;
      lastY = scrollY.get();
    };
    const onTouchMove = (e) => {
      if (!dragging) return;
      const delta = e.touches[0].clientY - startY;
      let next = lastY + delta;
      scrollY.set(next);
    };
    const onTouchEnd = () => {
      dragging = false;
    };
    container.addEventListener('touchstart', onTouchStart, { passive: false });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: false });
    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, [scrollY]);

  // Render the cards LOOP_COUNT times for seamless looping
  const cardList = Array.from({ length: LOOP_COUNT }).flatMap(() => threads);

  return (
    <div
      className={styles.column}
      ref={containerRef}
      style={{ height: '100vh', width: '100%', touchAction: 'none', cursor: 'grab', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <motion.div
        className={styles.threadList}
        style={{ y: ySpring, display: 'flex', flexDirection: 'column' }}
      >
        {cardList.map((thread, idx) => {
          // Subtle lag: each card's y is offset by a small fraction of the scroll velocity and its index
          const lag = useTransform(velocity, v => v * 0.01 * (idx % THREAD_COUNT));
          return (
            <motion.div key={idx + '-' + thread.id} style={{ y: lag }}>
              <ThreadCard {...thread} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ThreadCardColumn;
