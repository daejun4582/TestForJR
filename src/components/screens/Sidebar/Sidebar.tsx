'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import styles from './Sidebar.module.css';

export interface SidebarProps {
  /** 사용자 이름 */
  userName?: string;
  /** 학원 이름 */
  academyName?: string;
  /** 현재 활성화된 메뉴 ID */
  activeMenu?: string;
  /** 메뉴 항목 클릭 핸들러 */
  onMenuClick?: (menuId: string) => void;
  /** 내 정보 수정 버튼 클릭 핸들러 */
  onEditProfile?: () => void;
  /** 로그아웃 버튼 클릭 핸들러 */
  onLogout?: () => void;
  /** 도움말 버튼 클릭 핸들러 */
  onHelp?: () => void;
  /** 로고 이미지 경로 */
  logoPath?: string;
  /** 사이드바 배경 이미지 경로 (선택사항) */
  backgroundImagePath?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  userName = '홍길동님',
  academyName = 'JOB영어학원',
  activeMenu,
  onMenuClick,
  onEditProfile,
  onLogout,
  onHelp,
  logoPath = '/images/logo.png',
  backgroundImagePath,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const menuItems = [
    { id: '홈', label: '홈', href: '/dashboard' },
    { id: '학생 관리', label: '학생 관리', href: '/students' },
    { id: '수업 관리', label: '수업 관리', href: '/class-management' },
    { id: '리포트', label: '리포트', href: '/reports' },
    { id: '마이페이지', label: '마이페이지', href: '/mypage' },
  ];

  // 경로에 따른 메뉴 매핑
  const pathToMenuMap: Record<string, string> = {
    '/dashboard': '홈',
    '/students': '학생 관리',
    '/class-management': '수업 관리',
    '/reports': '리포트',
    '/mypage': '마이페이지',
  };

  // activeMenu가 prop으로 제공되면 사용, 없으면 경로 기반으로 자동 결정
  const currentActiveMenu = useMemo(() => {
    if (activeMenu) {
      return activeMenu;
    }
    return pathToMenuMap[pathname] || '홈';
  }, [activeMenu, pathname]);

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, menuId: string, href: string) => {
    e.preventDefault();
    onMenuClick?.(menuId);
    router.push(href);
  };

  const exclude1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateExclude1Position = () => {
      const userSection = document.querySelector('[data-user-section="true"]') as HTMLElement;
      
      if (userSection && exclude1Ref.current) {
        const userSectionRect = userSection.getBoundingClientRect();
        // Exclude1을 왼쪽 아래 교차점에 배치 (사이드바 왼쪽과 구분선 교차점)
        exclude1Ref.current.style.bottom = `${window.innerHeight - userSectionRect.bottom}px`;
        exclude1Ref.current.style.left = '0px';
      }
    };

    updateExclude1Position();
    const timeout1 = setTimeout(updateExclude1Position, 100);
    const timeout2 = setTimeout(updateExclude1Position, 300);
    
    window.addEventListener('resize', updateExclude1Position);

    return () => {
      window.removeEventListener('resize', updateExclude1Position);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <aside className={styles.sidebar} role="navigation" aria-label="메인 네비게이션" data-sidebar="true">
      <div className={styles.exclude1} ref={exclude1Ref}>
        <Image
          src="/images/Exclude1.svg"
          alt=""
          width={135}
          height={135}
          className={styles.excludeImage}
          priority
        />
      </div>
      <div className={styles.logo}>
        <Image
          src={logoPath}
          alt="JOB 로고"
          width={104.268}
          height={60.179}
          className={styles.logoImage}
          priority
        />
      </div>

      <nav className={styles.menu} aria-label="메뉴">
        {menuItems.map((item) => {
          const isActive = currentActiveMenu === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={(e) => handleMenuClick(e, item.id, item.href)}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.userSection} data-user-section="true">
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{userName}</h2>
          <p className={styles.academyName}>{academyName}</p>
        </div>
        <div className={styles.userActions}>
          <Button
            variant="primary"
            size="large"
            className={styles.editButton}
            onClick={onEditProfile}
            aria-label="내 정보 수정"
          >
            내 정보 수정
          </Button>
          <button
            type="button"
            className={styles.logoutButton}
            onClick={onLogout}
            aria-label="로그아웃"
          >
            로그아웃
          </button>
        </div>
      </div>

      <div className={styles.helpSection}>
        {/* <div className={styles.helpBg}>
          <Image
            src="/images/Exclude.svg"
            alt=""
            width={135}
            height={135}
            className={styles.bgImage}
            priority
          />
        </div> */}
        <button
          type="button"
          className={styles.helpButton}
          onClick={onHelp}
          aria-label="도움말"
        >
          <div className={styles.helpIcon} aria-hidden="true">
            <Image
              src="/images/help.svg"
              alt=""
              width={17}
              height={17}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <span className={styles.helpText}>도움말</span>
        </button>
      </div>
    </aside>
  );
};
