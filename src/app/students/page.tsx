"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sidebar } from '@/components/screens/Sidebar';
import styles from "./page.module.css";
import Image from "next/image";

// Image assets - these URLs are temporary (7 days), should be downloaded and stored locally
const imgMicrosoftExcel20132019LogoSvg1 = "https://www.figma.com/api/mcp/asset/ed8990c7-71b0-42ed-bd0a-4b45af76b6d8";
const imgTypeRightStatusDefault = "https://www.figma.com/api/mcp/asset/6d528c4e-2688-448f-b98d-9a507908a3f6";
const imgTypeRightStatusDefaultTable = "https://www.figma.com/api/mcp/asset/99789391-848c-43c4-85b0-441a94fd812f";
const imgUser = "https://www.figma.com/api/mcp/asset/d6f6a270-0ce4-4c6c-8ddf-69b6c737b11d";
const imgEdit = "https://www.figma.com/api/mcp/asset/b2ad3016-50ec-4d7c-be75-f89e203e4ea5";
const imgTablerSearch = "https://www.figma.com/api/mcp/asset/024f07fc-8866-441f-b476-7b866df3007a";

function Arrow({ className }: { className?: string }) {
	return (
		<div className={className}>
			<Image
				src={imgTypeRightStatusDefault}
				alt=""
				width={24}
				height={24}
				className={styles.arrowIcon}
				unoptimized
			/>
		</div>
	);
}

// Sample student data
const students = [
	{ id: 1, name: "김소정", class: 9, grade: 3, status: "출석", progress: "50%" },
	{ id: 2, name: "이영희", class: 8, grade: 2, status: "출석", progress: "75%" },
	{ id: 3, name: "박민수", class: 7, grade: 1, status: "출석", progress: "60%" },
	{ id: 4, name: "최지훈", class: 9, grade: 3, status: "결석", progress: "40%" },
	{ id: 5, name: "정수진", class: 8, grade: 2, status: "출석", progress: "80%" },
	{ id: 6, name: "강동원", class: 7, grade: 1, status: "출석", progress: "65%" },
	{ id: 7, name: "윤서연", class: 9, grade: 3, status: "출석", progress: "55%" },
];

export default function StudentsPage() {
	const router = useRouter();
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

			{/* Main Content */}
			<div className={styles.mainContent}>
				<h1 className={styles.title}>학생 관리</h1>

				{/* Filters and Search */}
				<div className={styles.filtersSection}>
					<div className={styles.filterGroup}>
						<div className={styles.filterDropdown}>
							<span className={styles.filterLabel}>반</span>
							<div className={styles.filterArrow}>
								<Arrow />
							</div>
						</div>
						<div className={styles.filterDropdown}>
							<span className={styles.filterLabel}>학년</span>
							<div className={styles.filterArrow}>
								<Arrow />
							</div>
						</div>
						<div className={styles.filterDropdown}>
							<span className={styles.filterLabel}>상태</span>
							<div className={styles.filterArrow}>
								<Arrow />
							</div>
						</div>
						<div className={styles.searchInput}>
							<input
								type="text"
								placeholder="검색어를 입력하세요"
								className={styles.searchField}
							/>
							<Image
								src={imgTablerSearch}
								alt="Search"
								width={24}
								height={24}
								className={styles.searchIcon}
								unoptimized
							/>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className={styles.actionButtonsSection}>
					<button className={styles.actionButtonPrimary}>
						<Image
							src={imgUser}
							alt=""
							width={24}
							height={24}
							unoptimized
						/>
						<div className={styles.actionButtonText}>
							<p>선택 학생</p>
							<p>정보 관리</p>
						</div>
					</button>
					<button className={styles.actionButtonPrimary}>
						<Image
							src={imgEdit}
							alt=""
							width={24}
							height={24}
							unoptimized
						/>
						<div className={styles.actionButtonText}>
							<p>선택 학생</p>
							<p>수업 관리</p>
						</div>
					</button>
					<button className={styles.actionButtonSecondary} onClick={() => router.push('/students/createStudent')}>신규 학생 등록</button>
					<button className={styles.actionButtonSecondary}>수업 신규 배정</button>
					<button className={styles.actionButtonSecondary}>반 배정</button>
				</div>

				{/* Table Controls */}
				<div className={styles.tableControls}>
					<div className={styles.exportExcel}>
						<Image
							src={imgMicrosoftExcel20132019LogoSvg1}
							alt="Excel"
							width={24}
							height={23}
							unoptimized
						/>
						<span>엑셀로 내보내기</span>
					</div>
					<div className={styles.selectAll}>
						<div className={styles.checkboxSimple} />
						<span>전체 선택</span>
					</div>
				</div>

				{/* Student Table */}
				<div className={styles.tableContainer}>
					<div className={styles.tableHeader}>
						<div className={styles.tableHeaderCell}>선택</div>
						<div className={styles.tableHeaderCell}>번호</div>
						<div className={styles.tableHeaderCell}>학생 이름</div>
						<div className={styles.tableHeaderCell}>반</div>
						<div className={styles.tableHeaderCell}>학년</div>
						<div className={styles.tableHeaderCell}>상태</div>
						<div className={styles.tableHeaderCell}>진행률</div>
						<div className={styles.tableHeaderCell}></div>
					</div>
					{students.map((student) => (
						<div key={student.id} className={styles.tableRow} onClick={() => router.push(`/students/details/${student.id}`)}>
							<div 
								className={styles.tableCell}
								onClick={(e) => e.stopPropagation()}
							>
								<div className={styles.checkboxWrapper}>
									<div className={styles.checkbox} />
								</div>
							</div>
							<div className={styles.tableCell}>{student.id}</div>
							<div className={styles.tableCell}>{student.name}</div>
							<div className={styles.tableCell}>{student.class}</div>
							<div className={styles.tableCell}>{student.grade}</div>
							<div className={styles.tableCell}>{student.status}</div>
							<div className={styles.tableCell}>{student.progress}</div>
							<div className={styles.tableCell}>
								<Link href={`/students/details/${student.id}`} className={styles.rowArrow}>
									<div className={styles.arrowRotated}>
										<Image
											src={imgTypeRightStatusDefaultTable}
											alt=""
											width={24}
											height={24}
											className={styles.arrowIcon}
											unoptimized
										/>
									</div>
								</Link>
							</div>
						</div>
					))}
				</div>

				{/* Pagination */}
				<div className={styles.pagination}>
					<button className={styles.paginationButton}>
						<div className={styles.paginationArrowPrev}>
							<Arrow />
						</div>
					</button>
					<button className={`${styles.paginationNumber} ${styles.paginationNumberActive}`}>1</button>
					<button className={styles.paginationNumber}>2</button>
					<button className={styles.paginationNumber}>3</button>
					<button className={styles.paginationNumber}>4</button>
					<button className={styles.paginationNumber}>5</button>
					<button className={styles.paginationButton}>
						<div className={styles.paginationArrowNext}>
							<Arrow />
						</div>
					</button>
				</div>
			</div>
		</div>
	);
}

