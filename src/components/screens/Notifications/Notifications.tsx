import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Chevron } from '@/components/ui/Chevron';
import styles from './Notifications.module.css';

interface NotificationItem {
  id: string;
  text: string;
  date: string;
}

interface NotificationsProps {
  title: string;
  items: NotificationItem[];
  onClick?: () => void;
}

export const Notifications: React.FC<NotificationsProps> = ({
  title,
  items,
  onClick,
}) => {
  return (
    <div className={styles.notifications}>
      <Card variant="highlighted" className={styles.headerCard}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button
            className={styles.chevronButton}
            onClick={onClick}
            aria-label={`${title} 더보기`}
          >
            <Chevron direction="right" />
          </button>
        </div>
      </Card>
      {items.map((item) => (
        <Card key={item.id} className={styles.itemCard}>
          <div className={styles.itemContent}>
            <p className={styles.itemText}>{item.text}</p>
            <p className={styles.itemDate}>{item.date}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

interface AnnouncementItem {
  id: string;
  badge?: string;
  text: string;
  date: string;
}

interface AnnouncementsProps {
  title: string;
  items: AnnouncementItem[];
  onClick?: () => void;
}

export const Announcements: React.FC<AnnouncementsProps> = ({
  title,
  items,
  onClick,
}) => {
  return (
    <div className={styles.announcements}>
      <Card variant="highlighted" className={styles.headerCard}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button
            className={styles.chevronButton}
            onClick={onClick}
            aria-label={`${title} 더보기`}
          >
            <Chevron direction="right" />
          </button>
        </div>
      </Card>
      {items.map((item) => (
        <Card key={item.id} className={styles.itemCard}>
          <div className={styles.itemContent}>
            {item.badge && (
              <Badge variant="blue" className={styles.badge}>
                {item.badge}
              </Badge>
            )}
            <div className={styles.itemTextRow}>
              <p className={styles.itemText}>{item.text}</p>
              <p className={styles.itemDate}>{item.date}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

