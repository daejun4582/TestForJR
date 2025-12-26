import React, { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Chevron } from '@/components/ui/Chevron';
import styles from './DashboardCards.module.css';

interface StatCardProps {
  title: string;
  icon?: string;
  stats: Array<{ label: string; value: string }>;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, icon, stats, onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className={styles.statCard} onClick={onClick} role="button" tabIndex={0}>
      <div className={styles.cardHeader}>
        {icon && !imageError && (
          <div className={styles.cardIcon}>
            <Image
              src={icon}
              alt=""
              width={34}
              height={36}
              style={{ objectFit: 'contain' }}
              onError={() => {
                setImageError(true);
              }}
              unoptimized
            />
          </div>
        )}
        <div className={styles.cardTitleRow}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <Chevron direction="right" className={styles.chevron} />
        </div>
      </div>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <p className={styles.statLabel}>{stat.label}</p>
            <p className={styles.statValue}>{stat.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

interface InfoCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, onClick }) => {
  return (
    <Card
      className={styles.infoCard}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <div className={styles.infoCardContent}>
        <div className={styles.infoCardText}>
          <h3 className={styles.infoCardTitle}>{title}</h3>
          <p className={styles.infoCardDescription}>{description}</p>
        </div>
        <Chevron direction="right" className={styles.chevron} />
      </div>
    </Card>
  );
};

export const DashboardCards: React.FC = () => {
  const studentStats = [
    { label: '총 원생', value: '76명' },
    { label: '재원생 수', value: '76명' },
    { label: '휴원생 수', value: '0명' },
  ];

  const teacherStats = [
    { label: '총 강사', value: '10명' },
    { label: '활동원 수', value: '8명' },
    { label: '휴직원 수', value: '2명' },
  ];

  return (
    <div className={styles.dashboardCards}>
      <StatCard
        title="원생 관리"
        icon="/images/student-icon.png"
        stats={studentStats}
        onClick={() => console.log('원생 관리 클릭')}
      />
      <StatCard
        title="강사 관리"
        icon="/images/teacher-icon.png"
        stats={teacherStats}
        onClick={() => console.log('강사 관리 클릭')}
      />
      <InfoCard
        title="통계리포트"
        description="전반적인 학원 데이터를 통계로 확인해보세요"
        onClick={() => console.log('통계리포트 클릭')}
      />
      <InfoCard
        title="수강료 만료 예정 원생"
        description="수강 기간 만료 예정 원생에게 일괄 청구해보세요"
        onClick={() => console.log('수강료 만료 예정 원생 클릭')}
      />
    </div>
  );
};

