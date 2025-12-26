import React, { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Chevron } from '@/components/ui/Chevron';
import styles from './AttendanceCard.module.css';

interface AttendanceCardProps {
  date: string;
  stats: {
    total: string;
    present: string;
    late: string;
    absent: string;
  };
  onClick?: () => void;
}

export const AttendanceCard: React.FC<AttendanceCardProps> = ({
  date,
  stats,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card
      className={styles.attendanceCard}
      variant="highlighted"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <div className={styles.cardContent}>
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            {!imageError && (
              <div className={styles.cardIcon}>
                <Image
                  src="/images/student-icon.png"
                  alt=""
                  width={38}
                  height={36}
                  style={{ objectFit: 'contain' }}
                  onError={() => {
                    setImageError(true);
                  }}
                  unoptimized
                />
              </div>
            )}
            <h3 className={styles.cardTitle}>출결 관리</h3>
          </div>
          <Chevron direction="right" className={styles.chevron} />
        </div>
        <div className={styles.infoRow}>
          <p className={styles.cardDate}>{date}</p>
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>총 원생</p>
              <p className={styles.statValue}>{stats.total}</p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>출석</p>
              <p className={styles.statValue}>{stats.present}</p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>지각</p>
              <p className={styles.statValue}>{stats.late}</p>
            </div>
            <div className={styles.statItem}>
              <p className={styles.statLabel}>결석</p>
              <p className={styles.statValue}>{stats.absent}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

