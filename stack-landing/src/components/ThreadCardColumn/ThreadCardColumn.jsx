import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';
import ThreadCard from '../ThreadCard/ThreadCard';
import styles from './ThreadCardColumn.module.css';
import threads from '../../data/threads.json';

const CARD_HEIGHT = 110; // Just the card height
const GAP = 6; // Base gap
const MIN_GAP = 4; // Minimum gap
const MAX_GAP = 8; // Maximum gap to prevent excessive spacing
const THREAD_COUNT = threads.length;

const ThreadCardColumn = () => {
  const containerRef = useRef(null);
  const scrollY = useMotionValue(0);
  // Make scroll directly responsive without spring
  const velocity = useVelocity(scrollY);

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
        scrollY.set(-80, { type: 'spring', stiffness: 40, damping: 30 });
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
        style={{ y: scrollY, display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        {threads.map((thread, idx) => {
          // Card position spring - gives cards their own weight
          const cardSpring = useSpring(scrollY, {
            stiffness: 50,  // Keep moderate stiffness for smooth movement
            damping: 35,    // Increased damping to reduce bounce
            mass: 1.2 + idx * 0.4, // Keep mass for inertia effect
          });

          // Calculate the offset from the base position
          const offset = useTransform(
            [cardSpring, scrollY],
            ([spring, scroll]) => spring - scroll
          );

          // Dynamic gap effect
          const dynamicGap = useTransform(
            [velocity, scrollY],
            ([v, y]) => {
              // Subtle gap compression based on velocity
              const velocityEffect = Math.abs(v) * 0.02;
              // Minimal scroll position effect
              const scrollEffect = Math.abs(y) * 0.0002;
              // Calculate gap with diminishing returns
              const calculatedGap = GAP - (velocityEffect + scrollEffect) * (1 - idx * 0.15);
              // Clamp the gap between MIN_GAP and MAX_GAP
              return Math.min(Math.max(calculatedGap, MIN_GAP), MAX_GAP);
            }
          );

          return (
            <motion.div
              key={idx + '-' + thread.id}
              style={{
                y: offset,
                position: 'relative',
                zIndex: THREAD_COUNT - idx,
                marginBottom: dynamicGap,
                ...(idx === 0 ? { marginTop: '20px' } : {}),
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
