import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const links = [
    { label: 'JOB', href: '#' },
    { label: '홈페이지', href: '#' },
    { label: '사용자 가이드', href: '#' },
    { label: '카카오톡 문의하기', href: '#' },
    { label: '약관 및 정책', href: '#' },
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerContent}>
        {links.map((link, index) => (
          <React.Fragment key={link.label}>
            {index > 0 && (
              <div className={styles.divider} aria-hidden="true">
                <svg
                  width="1"
                  height="16"
                  viewBox="0 0 1 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0.5"
                    y1="0"
                    x2="0.5"
                    y2="16"
                    stroke="#CACACA"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            )}
            <a
              href={link.href}
              className={styles.footerLink}
              aria-label={link.label}
            >
              {link.label}
            </a>
          </React.Fragment>
        ))}
      </div>
    </footer>
  );
};

