import { useEffect, useRef } from 'react';

const BackgroundAnimation = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'mousemove',
          x: event.clientX,
          y: event.clientY
        }, '*');
      }
    };

    const handleTouchMove = (event) => {
      if (event.touches.length > 0 && iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'touchmove',
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        }, '*');
      }
    };

    // Add listeners to the window to capture all mouse/touch events
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="/attractors-bg.html"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        border: 'none',
        pointerEvents: 'none',
        userSelect: 'none',
        overflow: 'hidden',
        background: 'transparent',
        display: 'block',
      }}
      tabIndex={-1}
      aria-hidden="true"
      title="Background Animation"
    />
  );
};

export default BackgroundAnimation; 