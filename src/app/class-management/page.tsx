"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Sidebar } from '@/components/screens/Sidebar';
import styles from "./classManagement.module.css";
import { classCards, teacherList } from "./classData";

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M7 10l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M15 5l-7 7 7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ClassManagementPage() {
  const [isTeacherOpen, setIsTeacherOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const classTypes = ["전체", "Reading", "Writing", "Speaking", "Listening", "Vocab"];
  const cards = classCards;
  const typeDropdownRef = useRef<HTMLDivElement | null>(null);
  const teacherDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        isTypeOpen &&
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(target)
      ) {
        setIsTypeOpen(false);
      }
      if (
        isTeacherOpen &&
        teacherDropdownRef.current &&
        !teacherDropdownRef.current.contains(target)
      ) {
        setIsTeacherOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [isTypeOpen, isTeacherOpen]);

  const filteredCards = cards.filter((card) => {
    if (!searchText.trim()) return true;
    const q = searchText.trim().toLowerCase();
    return (
      card.title.toLowerCase().includes(q) ||
      card.subtitle.toLowerCase().includes(q) ||
      card.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      card.teacher.toLowerCase().includes(q)
    );
  });

  const fullyFilteredCards = filteredCards.filter((card) => {
    const typeMatch =
      !selectedType ||
      selectedType === "전체" ||
      card.classTypes.some((t) => t === selectedType);
    const teacherMatch =
      !selectedTeacher ||
      selectedTeacher === "전체" ||
      card.teacher === selectedTeacher;
    return typeMatch && teacherMatch;
  });

  const totalPages = Math.max(1, Math.ceil(fullyFilteredCards.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedCards = fullyFilteredCards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className={styles.page}>
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

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>수업 관리</h1>
          <Link href="/class-management/create-class" className={styles.primaryButton}>
            <span className={styles.plusIcon}>+</span>
            수업추가
          </Link>
        </div>

        <div className={styles.filters}>
          <div className={styles.search}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="검색어를 입력하세요"
              aria-label="검색"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setPage(1);
              }}
            />
            <img src="/search.svg" alt="검색" className={styles.icon} />
          </div>
          <div className={styles.selectWrapper} ref={typeDropdownRef}>
            <button
              type="button"
              className={`${styles.select} ${styles.selectWide}`}
              onClick={() => setIsTypeOpen((prev) => !prev)}
            >
              <span>{selectedType ?? "수업 유형"}</span>
              <ChevronDownIcon className={styles.icon} />
            </button>
            {isTypeOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownList}>
                  {classTypes.map((type) => (
                    <button
                      key={type}
                      className={styles.dropdownItem}
                      type="button"
                      onClick={() => {
                        setSelectedType(type === "전체" ? null : type);
                        setIsTypeOpen(false);
                        setPage(1);
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={styles.selectWrapper} ref={teacherDropdownRef}>
            <button
              type="button"
              className={`${styles.select} ${styles.selectNarrow}`}
              onClick={() => setIsTeacherOpen((prev) => !prev)}
            >
              <span>{selectedTeacher ?? "강사"}</span>
              <ChevronDownIcon className={styles.icon} />
            </button>
            {isTeacherOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownList}>
                  {["전체", ...teacherList.map((t) => t.name)].map((name) => (
                    <button
                      key={name}
                      className={styles.dropdownItem}
                      type="button"
                      onClick={() => {
                        setSelectedTeacher(name === "전체" ? null : name);
                        setIsTeacherOpen(false);
                        setPage(1);
                      }}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <section className={styles.cardGrid} aria-label="수업 목록">
          {paginatedCards.map((card, index) => (
            <Link
              key={card.id}
              href={`/class-management/${card.id}`}
              className={styles.cardLink}
              aria-label={`${card.title} 상세 보기`}
            >
              <article className={styles.card}>
                <div className={styles.cardImage}>
                  <img src={card.image} alt="수업 이미지" />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <div>
                      <div className={styles.cardTitle}>{card.title}</div>
                      <p className={styles.cardSubtitle}>{card.subtitle}</p>
                    </div>
                    <ArrowRightIcon className={styles.arrow} />
                  </div>

                  <div className={styles.tags}>
                    {card.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.schedule}>
                    {card.schedule.map((item, idx) => (
                      <span key={item} className={styles.scheduleItem}>
                        {idx > 0 && (
                          <span className={styles.divider} aria-hidden />
                        )}
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className={styles.row}>
                    <span>수업 유형</span>
                    <span className={styles.linkText}>{card.classTypes.join(", ")}</span>
                  </div>

                  <div className={styles.row}>
                    <span>수강생</span>
                    <span className={styles.strongBlue}>{card.students}</span>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.teacher}>
                      <span className={styles.labelStrong}>{card.teacher}</span>
                      {card.isNew && <span className={styles.badge}>NEW</span>}
                    </div>
                    <span>{card.phone}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </section>

        <div className={styles.pagination} aria-label="페이지네이션">
          <button
            className={styles.arrowBtn}
            aria-label="이전 페이지"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ArrowLeftIcon />
          </button>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
            (pageNumber) => (
            <button
              key={pageNumber}
              className={`${styles.pageBtn} ${
                pageNumber === currentPage ? styles.pageActive : ""
              }`}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className={styles.arrowBtn}
            aria-label="다음 페이지"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </main>

    </div>
  );
}

