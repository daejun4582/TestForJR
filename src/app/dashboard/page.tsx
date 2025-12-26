'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Sidebar } from '@/components/screens/Sidebar';
import { DashboardCards } from '@/components/screens/DashboardCards';
import { WeeklySchedule } from '@/components/screens/WeeklySchedule';
import { AttendanceCard } from '@/components/screens/AttendanceCard';
import { Notifications, Announcements } from '@/components/screens/Notifications';
import { Footer } from '@/components/screens/Footer';
import styles from './page.module.css';

export default function DashboardPage() {
  const dividerRef = useRef<HTMLDivElement>(null);
  const dashboardCardsRef = useRef<HTMLDivElement>(null);
  const exclude2Ref = useRef<HTMLDivElement>(null);
  const [dividerTop, setDividerTop] = useState<number | null>(null);

  useEffect(() => {
    const updatePositions = () => {
      const sidebar = document.querySelector('[data-sidebar="true"]') as HTMLElement;
      const userSection = sidebar?.querySelector('[data-user-section="true"]') as HTMLElement;
      const mainContent = dividerRef.current?.closest('.mainContent') as HTMLElement;
      
      if (dashboardCardsRef.current && dividerRef.current && mainContent) {
        const dashboardCardsRect = dashboardCardsRef.current.getBoundingClientRect();
        const mainContentRect = mainContent.getBoundingClientRect();
        
        // 통계 리포트 컴포넌트(DashboardCards) 아래 60px 위치 계산
        const relativeTop = dashboardCardsRect.bottom - mainContentRect.top + 60;
        setDividerTop(relativeTop);
        
        // Exclude2를 구분선과 오른쪽 상단 교차점에 배치
        if (exclude2Ref.current && userSection) {
          const userSectionRect = userSection.getBoundingClientRect();
          exclude2Ref.current.style.top = `${userSectionRect.bottom}px`;
          exclude2Ref.current.style.right = '0px';
        }
      }
    };

    // 여러 번 시도하여 레이아웃이 완전히 렌더링된 후 계산
    updatePositions();
    const timeout1 = setTimeout(updatePositions, 100);
    const timeout2 = setTimeout(updatePositions, 300);
    
    window.addEventListener('resize', updatePositions);

    return () => {
      window.removeEventListener('resize', updatePositions);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);
  // Mock data - 실제로는 API에서 가져올 데이터
  const weeklyScheduleData = {
    week: '2025.12.셋째주',
    days: [
      {
        date: '17일 (월)',
        day: '월',
        groupCount: 3,
        individualCount: 0,
        schedules: [
          { time: '10:00-11:00', className: '축구반', color: 'red' as const },
          { time: '11:00-12:00', className: '농구반', color: 'green' as const },
          { time: '12:00-13:00', className: '수영반', color: 'blue' as const },
        ],
      },
      {
        date: '18일 (화)',
        day: '화',
        groupCount: 3,
        individualCount: 0,
        schedules: [
          { time: '10:00-11:00', className: '축구반', color: 'red' as const },
          { time: '11:00-12:00', className: '농구반', color: 'green' as const },
          { time: '12:00-13:00', className: '수영반', color: 'blue' as const },
        ],
      },
      {
        date: '19일 (수)',
        day: '수',
        isToday: true,
        groupCount: 3,
        individualCount: 0,
        schedules: [
          { time: '10:00-11:00', className: '축구반', color: 'red' as const },
          { time: '11:00-12:00', className: '농구반', color: 'green' as const },
        ],
      },
      {
        date: '20일 (목)',
        day: '목',
        groupCount: 3,
        individualCount: 0,
        schedules: [
          { time: '10:00-11:00', className: '축구반', color: 'red' as const },
          { time: '11:00-12:00', className: '농구반', color: 'green' as const },
        ],
      },
      {
        date: '21일 (금)',
        day: '금',
        groupCount: 3,
        individualCount: 0,
        schedules: [
          { time: '10:00-11:00', className: '축구반', color: 'red' as const },
          { time: '11:00-12:00', className: '농구반', color: 'green' as const },
          { time: '12:00-13:00', className: '수영반', color: 'blue' as const },
        ],
      },
      {
        date: '22일 (토)',
        day: '토',
        groupCount: 3,
        individualCount: 0,
        schedules: [
          { time: '10:00-11:00', className: '축구반', color: 'red' as const },
          { time: '12:00-13:00', className: '수영반', color: 'blue' as const },
        ],
      },
      {
        date: '23일 (일)',
        day: '일',
        groupCount: 3,
        individualCount: 0,
        schedules: [
          { time: '10:00-11:00', className: '축구반', color: 'red' as const },
          { time: '12:00-13:00', className: '수영반', color: 'blue' as const },
        ],
      },
    ],
  };

  const notificationItems = Array.from({ length: 8 }, (_, i) => ({
    id: `notification-${i}`,
    text: '[수납] 김하린님 6.12(수) 수강료 500원 APP 결제 완료',
    date: '2025.06.12',
  }));

  const announcementItems = Array.from({ length: 5 }, (_, i) => ({
    id: `announcement-${i}`,
    badge: '반공지',
    text: '연극반 수업 영상 공유드립니다.',
    date: '2025.06.12',
  }));

  return (
    <div className={styles.dashboard}>
      <Sidebar
        onMenuClick={(menuId) => {
          console.log('Menu clicked:', menuId);
        }}
        onEditProfile={() => {
          console.log('Edit profile clicked');
        }}
        onLogout={() => {
          console.log('Logout clicked');
        }}
        onHelp={() => {
          console.log('Help clicked');
        }}
      />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <header className={styles.header}>
            <h1 className={styles.title}>
              JOB에서 시작하는
              <br />
              간편한 학원관리
            </h1>
          </header>

          <div ref={dashboardCardsRef}>
            <DashboardCards />
          </div>

          <div 
            className={styles.dividerContainer}
            ref={dividerRef}
            style={dividerTop !== null ? { marginTop: `${dividerTop}px` } : {}}
          >
            <div className={styles.exclude2} ref={exclude2Ref}>
              <Image
                src="/images/Exclude2.svg"
                alt=""
                width={135}
                height={135}
                className={styles.excludeImage}
                priority
              />
            </div>
            <div className={styles.divider}></div>
          </div>

          <WeeklySchedule
            week={weeklyScheduleData.week}
            days={weeklyScheduleData.days}
          />

          <AttendanceCard
            date="2025.12.19(수)"
            stats={{
              total: '76명',
              present: '64명',
              late: '6명',
              absent: '6명',
            }}
          />

          <div className={styles.notificationsSection}>
            <Notifications
              title="알림"
              items={notificationItems}
              onClick={() => console.log('알림 더보기')}
            />
            <Announcements
              title="공지"
              items={announcementItems}
              onClick={() => console.log('공지 더보기')}
            />
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
}

