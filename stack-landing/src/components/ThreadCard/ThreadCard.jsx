import React, { useState } from 'react';
import styles from './ThreadCard.module.css';

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
  <button className={styles.expandButton} onClick={e => { e.stopPropagation(); onClick(); }}>
    {isExpanded ? '−' : '+'}
  </button>
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
  const backgroundColor = color ? `#${color}` : '#000000';
  const textColor = getContrastingTextColor(backgroundColor);

  return (
    <div
      className={styles.threadCard}
      style={{ backgroundColor, color: textColor }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {stackName && (
        <div className={styles.stackTitle} style={{ color: textColor }}>
          {stackName}
        </div>
      )}
      <h2 className={styles.threadTitle} style={{ color: textColor }}>
        {title}
      </h2>
      <div className={`${styles.threadContent} ${isExpanded ? styles.expanded : styles.collapsed}`}>
        {description && (
          <p className={styles.threadDescription} style={{ color: textColor }}>
            {description}
          </p>
        )}
        <div className={styles.threadMeta}>
          {labelId && labelName && <LabelButton labelName={labelName} />}
          {date && <DateButton date={date} />}
        </div>
      </div>
      {(labelId || date || description) && (
        <ExpandButton isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />
      )}
    </div>
  );
};

export default ThreadCard;
