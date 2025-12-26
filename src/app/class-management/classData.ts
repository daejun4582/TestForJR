const cardImage =
  "https://www.figma.com/api/mcp/asset/d00a8e88-3b10-4fa2-a423-8125c688386e";

export type ClassCard = {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  schedule: string[];
  classTypes: string[];
  students: string;
  teacher: string;
  phone: string;
  isNew: boolean;
  image: string;
};

export const teacherList = [
  { name: "반대준 강사", phone: "010-0000-0000" },
  { name: "최지안 강사", phone: "010-1234-5678" },
  { name: "서종현 강사", phone: "010-2345-6789" },
  { name: "이은호 강사", phone: "010-3456-7890" },
];

const baseClasses = [
  { title: "English Start(기초반)" },
  { title: "English Start(기초반)" },
  { title: "English Boost(회화)", tags: ["#회화", "#중급", "#집중"] },
  { title: "Business English", tags: ["#비즈니스", "#프레젠테이션"] },
  { title: "TOEIC 실전 특강", tags: ["#토익", "#실전", "#고득점"] },
  { title: "Grammar Intensive", tags: ["#문법", "#기초탄탄"] },
  { title: "Writing Clinic", tags: ["#라이팅", "#에세이"] },
  { title: "Conversation Lab", tags: ["#스피킹", "#디베이트"] },
  { title: "Reading Master", tags: ["#리딩", "#속독"] },
  { title: "Listening Focus", tags: ["#리스닝", "#쉐도잉"] },
  { title: "Pronunciation Lab", tags: ["#발음", "#교정"] },
  { title: "영어 면접 대비", tags: ["#면접", "#취업"] },
  { title: "Kids English Fun", tags: ["#키즈", "#스토리텔링"] },
  { title: "IELTS Starter", tags: ["#IELTS", "#입문"] },
  { title: "English for Travel", tags: ["#여행영어", "#필수표현"] },
];

export const classCards: ClassCard[] = baseClasses.map((item, idx) => {
  const teacher = teacherList[idx % teacherList.length];
  return {
    id: `class-${idx + 1}`,
    title: item.title,
    subtitle: "영어가 처음이어도 부담 없이 시작하는 기초 회화 수업",
    tags: item.tags ?? ["#영어기초", "#왕초보", "#영어입문"],
    schedule: ["매주 금요일", "15:00-17:00", "종일 X"],
    classTypes: ["Writing", "Reading"],
    students: "76명",
    teacher: teacher.name,
    phone: teacher.phone,
    isNew: true,
    image: cardImage,
  };
});

