"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Sidebar } from '@/components/screens/Sidebar';
import NewInstructorModal from "./components/NewInstructorModal";
import styles from "./createClass.module.css";

const cardImage =
  "https://www.figma.com/api/mcp/asset/db21b248-a05a-4539-9d28-d8c788e5bac0";

const teachers = [
  { name: "반대준 강사", phone: "010-0000-0000" },
  { name: "최지안 강사", phone: "010-1234-5678" },
  { name: "서종현 강사", phone: "010-2345-6789" },
  { name: "이은호 강사", phone: "010-3456-7890" },
];

const fees = ["₩120,000", "₩150,000", "₩180,000", "₩200,000"];

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

export default function CreateClassPage() {
  const [selectedDays, setSelectedDays] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [schedules, setSchedules] = useState([
    {
      days: [true, false, false, false, false, false, false],
      start: "",
      end: "",
      allDay: false,
    },
  ]);
  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);
  const [isTeacherOpen, setIsTeacherOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [isFeeOpen, setIsFeeOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<string | null>(null);
  const [feeInput, setFeeInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const timeRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const teacherDropdownRef = useRef<HTMLDivElement | null>(null);
  const feeDropdownRef = useRef<HTMLDivElement | null>(null);

  const formatCurrency = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "");
    if (!digitsOnly) return "";
    return Number(digitsOnly).toLocaleString("ko-KR");
  };

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        isTeacherOpen &&
        teacherDropdownRef.current &&
        !teacherDropdownRef.current.contains(target)
      ) {
        setIsTeacherOpen(false);
      }
      if (
        isFeeOpen &&
        feeDropdownRef.current &&
        !feeDropdownRef.current.contains(target)
      ) {
        setIsFeeOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [isTeacherOpen, isFeeOpen]);

  const toggleDay = (scheduleIndex: number, dayIndex: number) => {
    setSchedules((prev) =>
      prev.map((item, idx) =>
        idx === scheduleIndex
          ? {
              ...item,
              days: item.days.map((v, i) => (i === dayIndex ? !v : v)),
            }
          : item
      )
    );
  };

  const addSchedule = () => {
    setSchedules((prev) => [
      ...prev,
      {
        days: [false, false, false, false, false, false, false],
        start: "",
        end: "",
        allDay: false,
      },
    ]);
  };

  const removeSchedule = (scheduleIndex: number) => {
    setSchedules((prev) => prev.filter((_, idx) => idx !== scheduleIndex));
  };

  const updateTime = (
    scheduleIndex: number,
    field: "start" | "end",
    value: string
  ) => {
    setSchedules((prev) =>
      prev.map((item, idx) =>
        idx === scheduleIndex ? { ...item, [field]: value } : item
      )
    );
  };

  const toggleAllDay = (scheduleIndex: number) => {
    setSchedules((prev) =>
      prev.map((item, idx) =>
        idx === scheduleIndex
          ? {
              ...item,
              allDay: !item.allDay,
              start: item.allDay ? item.start : "",
              end: item.allDay ? item.end : "",
            }
          : item
      )
    );
  };

  const setTimeRef = (key: string) => (el: HTMLInputElement | null) => {
    timeRefs.current[key] = el;
  };

  const focusTime = (key: string, disabled: boolean) => {
    if (disabled) return;
    const target = timeRefs.current[key];
    target?.focus();
    const picker = (target as HTMLInputElement & { showPicker?: () => void })
      ?.showPicker;
    if (typeof picker === "function") {
      picker.call(target);
    } else {
      // showPicker를 지원하지 않는 브라우저에서는 기본 클릭으로 대체
      target?.click();
    }
  };

  const addFeature = () => {
    const value = featureInput.trim();
    if (!value) return;
    setFeatures((prev) => (prev.includes(value) ? prev : [...prev, value]));
    setFeatureInput("");
  };

  const removeFeature = (value: string) => {
    setFeatures((prev) => prev.filter((f) => f !== value));
  };

  return (
    <div className={styles.page}>
      <Sidebar
        activeMenu="수업 관리"
        onMenuClick={(menuId) => {
          console.log('Menu clicked:', menuId);
          // 실제 라우팅 로직 추가
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
          <h1 className={styles.title}>수업 추가</h1>
        </div>

        <div className={styles.layout}>
          <div className={styles.preview}>
            <img src={cardImage} alt="수업 이미지" />
          </div>

          <div className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>수업명</label>
              <input
                className={`${styles.textInput} ${styles.fullWidth}`}
                placeholder="Text Field"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>수업 일정</label>
              {schedules.map((schedule, scheduleIdx) => (
                <div key={scheduleIdx} className={styles.scheduleBlock}>
                  <div className={styles.daysRowWrap}>
                    <div className={styles.daysRow}>
                      {["월", "화", "수", "목", "금", "토", "일"].map(
                        (day, idx) => (
                          <button
                            key={day}
                            className={`${styles.dayButton} ${
                              schedule.days[idx] ? styles.dayActive : ""
                            }`}
                            type="button"
                            onClick={() => toggleDay(scheduleIdx, idx)}
                          >
                            {day}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                  <div className={styles.timeRow}>
                    <label
                      className={styles.timeInput}
                      onClick={() =>
                        focusTime(`${scheduleIdx}-start`, schedule.allDay)
                      }
                    >
                      <span className={styles.timeLabel}>시작</span>
                      <input
                        type="time"
                        value={schedule.start}
                        onChange={(e) =>
                          updateTime(scheduleIdx, "start", e.target.value)
                        }
                        disabled={schedule.allDay}
                        className={styles.timeInputControl}
                        aria-label="시작 시간"
                        placeholder="시작 시간"
                        ref={setTimeRef(`${scheduleIdx}-start`)}
                      />
                    </label>
                    <div className={styles.separator}>-</div>
                    <label
                      className={styles.timeInput}
                      onClick={() =>
                        focusTime(`${scheduleIdx}-end`, schedule.allDay)
                      }
                    >
                      <span className={styles.timeLabel}>끝</span>
                      <input
                        type="time"
                        value={schedule.end}
                        onChange={(e) =>
                          updateTime(scheduleIdx, "end", e.target.value)
                        }
                        disabled={schedule.allDay}
                        className={styles.timeInputControl}
                        aria-label="종료 시간"
                        placeholder="종료 시간"
                        ref={setTimeRef(`${scheduleIdx}-end`)}
                      />
                    </label>
                    <div className={styles.checkboxRow}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={schedule.allDay}
                          onChange={() => toggleAllDay(scheduleIdx)}
                          className={styles.checkboxInput}
                        />
                        <span className={styles.checkboxBox}>
                          {schedule.allDay ? "✓" : ""}
                        </span>
                        <span className={styles.fieldLabel}>종일 여부</span>
                      </label>
                    </div>
                  </div>
                  {scheduleIdx > 0 && (
                    <button
                      type="button"
                      className={styles.deleteScheduleBtn}
                      onClick={() => removeSchedule(scheduleIdx)}
                    >
                      삭제하기
                    </button>
                  )}
                </div>
              ))}
              <button className={styles.addSchedule} type="button" onClick={addSchedule}>
                <span className={styles.plusIcon}>+</span>
                수업 일정 추가
              </button>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>강사 선택</label>
              <div className={styles.instructorRow}>
              <div className={styles.dropdownWrapper} ref={teacherDropdownRef}>
                  <button
                    className={styles.dropdownButton}
                    type="button"
                    onClick={() => setIsTeacherOpen((prev) => !prev)}
                  >
                    <span>{selectedTeacher ?? "등록된 강사"}</span>
                    <ChevronDownIcon className={styles.icon} />
                  </button>
                  {isTeacherOpen && (
                    <div className={styles.dropdownMenu}>
                      <div className={styles.dropdownList}>
                        {teachers.map((teacher) => (
                          <button
                            key={teacher.name}
                            className={styles.dropdownItem}
                            type="button"
                            onClick={() => {
                              setSelectedTeacher(teacher.name);
                              setIsTeacherOpen(false);
                            }}
                          >
                            {teacher.name} ({teacher.phone})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  className={styles.primarySolid}
                  type="button"
                  onClick={() => setIsInstructorModalOpen(true)}
                >
                  <span className={styles.plusIcon}>+</span>
                  신규 강사 등록
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr className={styles.dividerLine} />

        <div className={styles.sectionRow}>
          <div className={styles.sectionLabel}>수강료</div>
          <div>
            <div className={styles.inlineHeaders}>
              <span className={styles.subLabel}>기존 수강료</span>
              <span className={styles.subLabel}>신규 수강료 등록</span>
            </div>
            <div className={styles.feeRow}>
              <div className={styles.dropdownWrapper} ref={feeDropdownRef}>
                <button
                  className={styles.dropdownButton}
                  type="button"
                  onClick={() => setIsFeeOpen((prev) => !prev)}
                >
                  <span>{selectedFee ?? "등록된 수강료 목록"}</span>
                  <ChevronDownIcon className={styles.icon} />
                </button>
                {isFeeOpen && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownList}>
                      {fees.map((fee) => (
                        <button
                          key={fee}
                          className={styles.dropdownItem}
                          type="button"
                          onClick={() => {
                            setSelectedFee(fee);
                            setFeeInput(fee);
                            setIsFeeOpen(false);
                          }}
                        >
                          {fee}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input
                className={`${styles.textInput} ${styles.fullWidth}`}
                placeholder="금액을 입력해주세요"
                  type="text"
                  inputMode="numeric"
                  value={feeInput}
                  onChange={(e) => {
                    const formatted = formatCurrency(e.target.value);
                    setFeeInput(formatted);
                  }}
              />
            </div>
          </div>
        </div>

        <div className={styles.sectionRow}>
          <div className={styles.sectionLabel}>수업 특징</div>
          <div className={styles.featureColumn}>
            <div className={styles.featureInputRow}>
              <input
                className={`${styles.textInput} ${styles.featureInput}`}
                placeholder="해시태그로 수업의 특징을 알려주세요!"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.nativeEvent.isComposing) return;
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
              />
              <button type="button" className={styles.featureAddButton} onClick={addFeature}>
                추가
              </button>
            </div>
            <div className={styles.featureTags}>
              {features.map((tag) => (
                <span key={tag} className={styles.featureTag}>
                  <span className={styles.featureTagText}>{tag}</span>
                  <button
                    type="button"
                    className={styles.featureTagRemove}
                    onClick={() => removeFeature(tag)}
                    aria-label={`${tag} 삭제`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sectionRow}>
          <div className={styles.sectionLabel}>수업 소개</div>
          <input
            className={`${styles.textInput} ${styles.wideInput}`}
            placeholder="수업 소개 글을 작성 해 주세요 :)"
          />
        </div>

        <div className={styles.submitRow}>
          <Link href="/class-management" className={styles.submitButton}>
            수업 생성하기
          </Link>
        </div>
        <NewInstructorModal
          open={isInstructorModalOpen}
          onClose={() => setIsInstructorModalOpen(false)}
        />
      </main>
    </div>
  );
}

