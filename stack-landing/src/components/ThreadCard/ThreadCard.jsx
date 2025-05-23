import React, { useState, useRef } from 'react';
import styles from './ThreadCard.module.css';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';

const getContrastingTextColor = (backgroundColor) => {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.3 ? '#000000' : '#FFFFFF';
};

const LabelButton = ({ labelName }) => (
  <button className={styles.labelButton}>{labelName}</button>
);

const DateButton = ({ date }) => (
  <button className={styles.dateButton}>{date}</button>
);

const ExpandButton = ({ isExpanded, onClick }) => (
  <div
    className={styles.expandButton}
    onClick={e => { e.stopPropagation(); onClick(); }}
    role="button"
    aria-label={isExpanded ? 'Collapse' : 'Expand'}
    tabIndex={0}
    onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onClick(); } }}
    style={{ outline: 'none', border: 'none', userSelect: 'none' }}
  >
    <span className={styles.animatedFade}>
      {isExpanded ? (
        <UnfoldLessIcon className={styles.expandIcon} key="less" />
      ) : (
        <UnfoldMoreIcon className={styles.expandIcon} key="more" />
      )}
    </span>
  </div>
);

const ThreadCard = ({
  title,
  description,
  labelId,
  labelName,
  date,
  color,
  stackName
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);
  const backgroundColor = color ? `#${color}` : '#000000';
  const textColor = getContrastingTextColor(backgroundColor);

  // Animate height on expand/collapse
  React.useEffect(() => {
    if (isExpanded && contentRef.current) {
      setHeight(contentRef.current.scrollHeight + 8);
    } else {
      setHeight(0);
    }
  }, [isExpanded, description]);

  return (
    <div
      className={styles.threadCard}
      style={{ backgroundColor, color: textColor }}
    >
      {stackName && (
        <div className={styles.stackTitle} style={{ color: textColor }}>
          {stackName}
        </div>
      )}
      <h2 className={styles.threadTitle} style={{ color: textColor }}>
        {title}
      </h2>
      {description && (
        <div
          className={styles.threadContent}
          style={{
            height: `${height}px`,
            opacity: isExpanded ? 1 : 0.7,
            transition: 'height 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s',
            overflow: 'hidden',
            willChange: 'height, opacity',
          }}
        >
          <div ref={contentRef} style={{ paddingBottom: '1px' }}>
            <p className={styles.threadDescription} style={{ color: textColor }}>
              {description}
            </p>
          </div>
        </div>
      )}
      {description && (
        <ExpandButton isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />
      )}
    </div>
  );
};

export default ThreadCard;
