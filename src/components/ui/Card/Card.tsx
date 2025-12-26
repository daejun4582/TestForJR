import React from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'highlighted';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const cardClasses = [
    styles.card,
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

