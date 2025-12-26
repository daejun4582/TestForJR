import React from 'react';
import { Card } from '@/dashboard/src/components/ui/Card';
import styles from './WeeklySchedule.module.css';

interface ScheduleItem {
  time: string;
  className: string;
  color: 'red' | 'green' | 'blue';
}

interface DaySchedule {
  date: string;
  day: string;
  isToday?: boolean;
  groupCount: number;
  individualCount: number;
  schedules: ScheduleItem[];
}

interface WeeklyScheduleProps {
  week: string;
  days: DaySchedule[];
}

const ScheduleBlock: React.FC<{ item: ScheduleItem }> = ({ item }) => {
  const colorMap = {
    red: {
      bg: '#FFECEE',
      border: '#FF939F',
    },
    green: {
      bg: '#EAF1EE',
      border: '#78C4A3',
    },
    blue: {
      bg: '#ECF4FF',
      border: '#9EC9FB',
    },
  };

  const colors = colorMap[item.color];

  return (
    <div
      className={styles.scheduleBlock}
      style={{
        backgroundColor: colors.bg,
        borderLeft: `3px solid ${colors.border}`,
      }}
    >
      <p className={styles.scheduleTime}>{item.time}</p>
      <p className={styles.scheduleClassName}>{item.className}</p>
    </div>
  );
};

const DayColumn: React.FC<{ day: DaySchedule }> = ({ day }) => {
  return (
    <div className={styles.dayColumn}>
      <div
        className={`${styles.dayHeader} ${
          day.isToday ? styles.dayHeaderToday : ''
        }`}
      >
        <p className={styles.dayDate}>{day.date}</p>
      </div>
      <div className={styles.dayStats}>
        <div className={styles.stat}>
          <span>그룹</span>
          <span>{day.groupCount}</span>
        </div>
        <div className={styles.stat}>
          <span>개인</span>
          <span>{day.individualCount}</span>
        </div>
      </div>
      <div
        className={`${styles.daySchedules} ${
          day.isToday ? styles.daySchedulesToday : ''
        }`}
      >
        {day.schedules.map((schedule, index) => (
          <ScheduleBlock key={index} item={schedule} />
        ))}
      </div>
    </div>
  );
};

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ week, days }) => {
  return (
    <section className={styles.weeklySchedule} aria-label="주간 일정">
      <div className={styles.scheduleHeader}>
        <h2 className={styles.scheduleTitle}>주간 일정</h2>
        <p className={styles.scheduleWeek}>{week}</p>
      </div>
      <div className={styles.scheduleGrid}>
        {days.map((day, index) => (
          <DayColumn key={index} day={day} />
        ))}
      </div>
    </section>
  );
};

