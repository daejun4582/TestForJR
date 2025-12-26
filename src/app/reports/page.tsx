'use client';

import React from 'react';
import { Sidebar } from '@/components/screens/Sidebar';
import styles from './page.module.css';

export default function ReportsPage() {
  return (
    <div className={styles.container}>
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
          <div className={styles.messageContainer}>
            <h1 className={styles.title}>리포트</h1>
            <p className={styles.message}>추후 개발 예정입니다.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

