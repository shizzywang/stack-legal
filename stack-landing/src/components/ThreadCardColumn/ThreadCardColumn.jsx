import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';
import ThreadCard from '../ThreadCard/ThreadCard';
import styles from './ThreadCardColumn.module.css';
import threads from '../../data/threads.json';

const CARD_HEIGHT = 110; // Just the card height
const GAP = 10; // Ensure gap is exactly 10px
const MIN_GAP = 10; // Minimum gap when cards are following
const THREAD_COUNT = threads.length;

const ThreadCardColumn = () => {
  const containerRef = useRef(null);
  const scrollY = useMotionValue(0);
  const ySpring = useSpring(scrollY, { stiffness: 60, damping: 30, mass: 0.5 });
  const velocity = useVelocity(ySpring);

  // Calculate min and max scroll values
  const totalHeight = THREAD_COUNT * (CARD_HEIGHT + GAP) - GAP; // total height of all cards + gaps
  const [containerHeight, setContainerHeight] = React.useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, []);

  // Animate scroll on mount to hint scrollability
  useEffect(() => {
    let hasScrolled = false;
    const onUserScroll = () => { hasScrolled = true; };
    window.addEventListener('wheel', onUserScroll, { passive: true });
    window.addEventListener('touchmove', onUserScroll, { passive: true });
    // Only animate if user hasn't scrolled
    setTimeout(() => {
      if (!hasScrolled && scrollY.get() === 0) {
        scrollY.set(-80, { type: 'spring', stiffness: 40, damping: 18 });
      }
    }, 400);
    return () => {
      window.removeEventListener('wheel', onUserScroll);
      window.removeEventListener('touchmove', onUserScroll);
    };
  }, []);

  const minScroll = Math.min(0, containerHeight - totalHeight);
  const maxScroll = 0;

  // Clamp helper
  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

  // Wheel event for desktop/trackpad
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onWheel = (e) => {
      e.preventDefault();
      let next = scrollY.get() - e.deltaY;
      next = clamp(next, minScroll, maxScroll);
      scrollY.set(next);
    };
    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [scrollY, minScroll, maxScroll]);

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
      next = clamp(next, minScroll, maxScroll);
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
  }, [scrollY, minScroll, maxScroll]);

  // Clamp scrollY on mount and when containerHeight changes
  useEffect(() => {
    scrollY.set(clamp(scrollY.get(), minScroll, maxScroll));
  }, [containerHeight, minScroll, maxScroll]);

  return (
    <div
      className={styles.column}
      ref={containerRef}
      style={{ height: '100vh', width: '100%', touchAction: 'none', cursor: 'grab', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <motion.div
        className={styles.threadList}
        style={{ y: ySpring, display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        {threads.map((thread, idx) => {
          // Enhanced inertia/lag effect
          const velocitySpring = useSpring(0, {
            stiffness: 120, // lower for more drag
            damping: 18,    // lower for more follow-through
            mass: 1 + idx * 0.35, // more mass per card for more lag
          });

          useEffect(() => {
            const unsubscribe = velocity.onChange((v) => {
              velocitySpring.set(v);
            });
            return () => unsubscribe();
          }, [velocity, velocitySpring]);

          const lagOffset = useTransform(velocitySpring, (v) => {
            // More pronounced lag multiplier
            const scaledVelocity = v * 0.022 * (idx + 1);
            return Math.max(scaledVelocity, -(CARD_HEIGHT + GAP - MIN_GAP));
          });

          return (
            <motion.div
              key={idx + '-' + thread.id}
              style={{
                y: lagOffset,
                position: 'relative',
                zIndex: THREAD_COUNT - idx,
              }}
            >
              <ThreadCard {...thread} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ThreadCardColumn;
