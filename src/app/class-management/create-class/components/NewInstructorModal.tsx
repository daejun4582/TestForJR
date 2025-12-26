"use client";

import styles from "./newInstructorModal.module.css";

type NewInstructorModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: { name: string; phone: string }) => void;
};

export default function NewInstructorModal({
  open,
  onClose,
  onSubmit,
}: NewInstructorModalProps) {
  if (!open) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    onSubmit?.({ name, phone });
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label="신규 강사 등록"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.title}>신규 강사 등록</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="name">
              신규 강사 이름
            </label>
            <input
              id="name"
              name="name"
              className={styles.input}
              placeholder="이름을 작성해 주세요"
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="phone">
              전화 번호
            </label>
            <input
              id="phone"
              name="phone"
              className={styles.input}
              placeholder="010-0000-0000"
              required
            />
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.primary}>
              등록하기
            </button>
            <button type="button" className={styles.secondary} onClick={onClose}>
              취소하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

