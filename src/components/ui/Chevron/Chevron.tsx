import React from 'react';
import styles from './Chevron.module.css';

interface ChevronProps {
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const Chevron: React.FC<ChevronProps> = ({
  direction = 'right',
  className = '',
}) => {
  const rotationMap = {
    up: '180deg',
    down: '0deg',
    left: '90deg',
    right: '270deg',
  };

  return (
    <div
      className={`${styles.chevron} ${className}`}
      style={{ transform: `rotate(${rotationMap[direction]})` }}
      aria-hidden="true"
    >
      <svg
        width="16"
        height="8"
        viewBox="0 0 16 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L8 7L15 1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

