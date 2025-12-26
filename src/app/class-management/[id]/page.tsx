"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Sidebar } from '@/components/screens/Sidebar';
import styles from "../create-class/createClass.module.css";
import { classCards } from "../classData";

export default function ClassDetailPage() {
  const params = useParams<{ id?: string | string[] }>();
  const classId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const card = classCards.find((item) => item.id === classId);

  if (!card) {
    return (
      <div className={styles.page}>
        <Sidebar activeMenu="수업 관리" />
        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>수업을 찾을 수 없습니다</h1>
            <Link href="/class-management" className={styles.submitButton}>
              목록으로
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Sidebar
        activeMenu="수업 관리"
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

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>수업 조회</h1>
          <Link href="/class-management" className={styles.submitButton}>
            목록으로
          </Link>
        </div>

        <div className={styles.layout}>
          <div className={styles.preview}>
            <img src={card.image} alt={`${card.title} 이미지`} />
          </div>

          <div className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>수업명</label>
              <div className={styles.readonlyBox}>{card.title}</div>
              <p className={styles.readonlySub}>{card.subtitle}</p>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>태그</label>
              <div className={styles.featureTags}>
                {card.tags.map((tag) => (
                  <span key={tag} className={styles.featureTag}>
                    <span className={styles.featureTagText}>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>수업 일정</label>
              <div className={styles.scheduleChips}>
                {card.schedule.map((item) => (
                  <span key={item} className={styles.readonlyPill}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>수업 정보</label>
              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>유형</span>
                  <span className={styles.metaValue}>{card.classTypes.join(", ")}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>수강생</span>
                  <span className={styles.metaValue}>{card.students}</span>
                </div>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>강사 정보</label>
              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>강사</span>
                  <div className={styles.metaValueRow}>
                    <span className={styles.metaValue}>{card.teacher}</span>
                    {card.isNew && <span className={styles.newBadge}>NEW</span>}
                  </div>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>연락처</span>
                  <span className={styles.metaValue}>{card.phone}</span>
                </div>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>수업 소개</label>
              <div className={styles.readonlyBox}>{card.subtitle}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

