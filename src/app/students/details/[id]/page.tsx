"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Sidebar } from '@/components/screens/Sidebar';
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

// Image assets - these URLs are temporary (7 days), should be downloaded and stored locally
const imgTypeRightStatusDefault = "https://www.figma.com/api/mcp/asset/e3dc7dcc-7ab4-4312-a3ca-b199890c614d";
const imgVector167 = "https://www.figma.com/api/mcp/asset/62e5d625-6693-499a-b15a-330ab9957ffc";
const imgEllipse12 = "https://www.figma.com/api/mcp/asset/940ee343-64b1-4831-8096-b6c169421183";
const imgPerson = "https://www.figma.com/api/mcp/asset/de5e7c8e-aa54-471e-8899-2df9852e7e62";
const imgGroup1707481792 = "https://www.figma.com/api/mcp/asset/a2968c8c-207a-4f21-bb2e-aaf2da213403";

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

// Sample student data - in real app, this would come from an API
const sampleStudent = {
	id: "1",
	name: "김소정",
	phone: "010-1234-1234",
	guardianPhone: "010-1234-1234",
	birthYear: 2010,
	birthMonth: 2,
	birthDay: 10,
	school: "잡잡고등학교",
	grade: 2,
	class: 10,
	currentClasses: [
		{ id: 1, name: "토플1", teacher: "김소정" },
		{ id: 2, name: "토플2", teacher: "반대준" },
		{ id: 3, name: "스피킹1", teacher: "최지안" },
	],
	previousClasses: [
		{ id: 1, name: "토익1", teacher: "서종현" },
		{ id: 2, name: "토익2", teacher: "박성겸" },
	],
};

type TabType = "personal" | "attendance" | "payment";

// Grade Report Graph Component
function GradeReportGraph() {
	// Sample grade data for May to December 2025
	// Values are normalized to 0-100 scale for the graph
	const gradeData = [
		{ month: "2025년 5월", value: 25 }, // Between grid line 1 and 2
		{ month: "2025년 6월", value: 40 }, // Slightly above grid line 2
		{ month: "2025년 7월", value: 50 }, // Between grid line 2 and 3
		{ month: "2025년 8월", value: 65 }, // Between grid line 3 and 4
		{ month: "2025년 9월", value: 80 }, // Slightly above grid line 4
		{ month: "2025년 10월", value: 70 }, // Between grid line 3 and 4 (lower than September)
		{ month: "2025년 11월", value: 85 }, // Between grid line 4 and 5
		{ month: "2025년 12월", value: 95 }, // Close to the top edge
	];

	const graphWidth = 879;
	const graphHeight = 230;
	const padding = { top: 20, right: 20, bottom: 50, left: 20 };
	const chartWidth = graphWidth - padding.left - padding.right;
	const chartHeight = graphHeight - padding.top - padding.bottom;

	// Calculate x positions for each month (evenly spaced)
	const monthPositions = gradeData.map((_, index) => {
		const spacing = chartWidth / (gradeData.length - 1);
		return padding.left + index * spacing;
	});

	// Calculate y positions based on values (inverted because SVG y increases downward)
	const yPositions = gradeData.map((data) => {
		const normalizedValue = data.value / 100; // Normalize to 0-1
		return padding.top + chartHeight - (normalizedValue * chartHeight);
	});

	// Create path for the line
	const pathData = gradeData
		.map((_, index) => {
			const x = monthPositions[index];
			const y = yPositions[index];
			return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
		})
		.join(" ");

	// Grid lines (5 horizontal lines)
	const gridLines = Array.from({ length: 5 }, (_, i) => {
		const y = padding.top + (chartHeight / 4) * i;
		return { y, value: 100 - (i * 25) };
	});

	// Calculate column widths for month backgrounds
	const columnWidth = 121;
	const columnStartPositions = monthPositions.map((x) => x - columnWidth / 2);

	return (
		<div className={styles.gradeReportGraphContainer}>
			<svg
				width={graphWidth}
				height={graphHeight}
				viewBox={`0 0 ${graphWidth} ${graphHeight}`}
				className={styles.gradeReportSvg}
			>
				{/* Background */}
				<rect
					width={graphWidth}
					height={graphHeight}
					fill="rgba(243, 250, 255, 0.7)"
					className={styles.graphBackground}
				/>

				{/* Month column backgrounds */}
				{columnStartPositions.map((startX, index) => {
					const isFirst = index === 0;
					return (
						<g key={`column-${index}`}>
							{/* Create 5 rectangles per column (rows) */}
							{Array.from({ length: 5 }, (_, rowIndex) => {
								const rectY = padding.top + (chartHeight / 5) * rowIndex;
								const rectHeight = chartHeight / 5;
								return (
									<g key={`rect-${index}-${rowIndex}`}>
										{/* Background rectangle */}
										<rect
											x={startX}
											y={rectY}
											width={columnWidth}
											height={rectHeight}
											fill="rgba(243, 250, 255, 0.7)"
											className={styles.monthColumn}
										/>
										{/* Borders - only draw specific borders */}
										{!isFirst && (
											<line
												x1={startX}
												y1={rectY}
												x2={startX}
												y2={rectY + rectHeight}
												stroke="#CBD5E1"
												strokeWidth="1"
											/>
										)}
										{rowIndex === 0 && (
											<line
												x1={startX}
												y1={rectY}
												x2={startX + columnWidth}
												y2={rectY}
												stroke="#CBD5E1"
												strokeWidth="1"
											/>
										)}
										<line
											x1={startX}
											y1={rectY + rectHeight}
											x2={startX + columnWidth}
											y2={rectY + rectHeight}
											stroke="#CBD5E1"
											strokeWidth="1"
										/>
									</g>
								);
							})}
						</g>
					);
				})}

				{/* Grid lines */}
				{gridLines.map((grid, index) => (
					<line
						key={`grid-h-${index}`}
						x1={padding.left}
						y1={grid.y}
						x2={graphWidth - padding.right}
						y2={grid.y}
						stroke="#CBD5E1"
						strokeWidth="1"
						className={styles.gridLine}
					/>
				))}

				{/* Vertical grid lines for months */}
				{monthPositions.map((x, index) => (
					<line
						key={`grid-v-${index}`}
						x1={x}
						y1={padding.top}
						x2={x}
						y2={graphHeight - padding.bottom}
						stroke="#CBD5E1"
						strokeWidth="1"
						className={styles.gridLine}
					/>
				))}

				{/* Line connecting data points */}
				<path
					d={pathData}
					fill="none"
					stroke="#3B6CFF"
					strokeWidth="2"
					className={styles.graphLine}
				/>

				{/* Data points (yellow circles) */}
				{gradeData.map((_, index) => (
					<circle
						key={`point-${index}`}
						cx={monthPositions[index]}
						cy={yPositions[index]}
						r="6"
						fill="#FFDE87"
						stroke="#FFDE87"
						strokeWidth="2"
						className={styles.dataPoint}
					/>
				))}
			</svg>

			{/* Month labels */}
			<div className={styles.monthLabelsContainer}>
				{gradeData.map((data, index) => (
					<div
						key={`label-${index}`}
						className={styles.monthLabel}
						style={{
							left: `${(monthPositions[index] / graphWidth) * 100}%`,
							transform: "translateX(-50%)",
						}}
					>
						{data.month}
					</div>
				))}
			</div>
		</div>
	);
}

export default function StudentDetailsPage() {
	const params = useParams();
	const studentId = params.id as string;
	const [activeTab, setActiveTab] = useState<TabType>("personal");

	// Format phone number for display
	const formatPhoneNumber = (phone: string) => {
		// Remove any existing formatting
		const cleaned = phone.replace(/\s+/g, "").replace(/-/g, "");
		// Format as 010 - 1234 - 1234
		if (cleaned.length === 11) {
			return `${cleaned.slice(0, 3)} - ${cleaned.slice(3, 7)} - ${cleaned.slice(7)}`;
		}
		// If already formatted, return as is
		return phone;
	};

	const phoneParts = (phone: string) => {
		const formatted = formatPhoneNumber(phone);
		return formatted.split(" - ");
	};

	return (
		<div className={styles.container}>
			<Sidebar
				activeMenu="학생 관리"
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

			{/* Main Content */}
			<div className={styles.mainContent}>
				<h1 className={styles.title}>선택 학생 정보 관리</h1>

				{/* Tabs */}
				<div className={styles.tabsContainer}>
					<button
						className={`${styles.tab} ${activeTab === "personal" ? styles.tabActive : ""}`}
						onClick={() => setActiveTab("personal")}
					>
						학생 인적 사항
					</button>
					<button
						className={`${styles.tab} ${activeTab === "attendance" ? styles.tabActive : ""}`}
						onClick={() => setActiveTab("attendance")}
					>
						학습 및 출결
					</button>
					<button
						className={`${styles.tab} ${activeTab === "payment" ? styles.tabActive : ""}`}
						onClick={() => setActiveTab("payment")}
					>
						수납
					</button>
					<button className={styles.editButton}>
						<span>수정하기</span>
						<div className={styles.editButtonArrow}>
							<Arrow />
						</div>
					</button>
				</div>

				{/* Tab Content */}
				{activeTab === "personal" && (
					<>
						{/* Student Information Section */}
						<div className={styles.studentInfoSection}>
							{/* Profile Picture */}
							<div className={styles.profilePicture}>
								<Image
									src={imgEllipse12}
									alt=""
									width={208}
									height={208}
									className={styles.profileCircle}
									unoptimized
								/>
								<div className={styles.personIcon}>
									<Image
										src={imgPerson}
										alt=""
										width={100}
										height={100}
										unoptimized
									/>
								</div>
							</div>

							{/* Student Details */}
							<div className={styles.studentDetails}>
								{/* Student Name */}
								<div className={styles.studentNameSection}>
									<p className={styles.detailLabel}>이름</p>
									<p className={styles.detailValue}>{sampleStudent.name}</p>
								</div>
								<div className={styles.detailRow}>
									<p className={styles.detailLabel}>학생 전화번호</p>
									<div className={styles.phoneNumber}>
										<span>{phoneParts(sampleStudent.phone)[0]}</span>
										<div className={styles.phoneDivider}>
											<Image
												src={imgVector167}
												alt=""
												width={8}
												height={1}
												unoptimized
											/>
										</div>
										<span>{phoneParts(sampleStudent.phone)[1]}</span>
										<div className={styles.phoneDivider}>
											<Image
												src={imgVector167}
												alt=""
												width={8}
												height={1}
												unoptimized
											/>
										</div>
										<span>{phoneParts(sampleStudent.phone)[2]}</span>
									</div>
								</div>
							</div>
						</div>

						{/* Class Enrollment Section */}
						<div className={styles.classSection}>
							<h2 className={styles.sectionTitle}>수강 클래스</h2>
							<div className={styles.classListsContainer}>
								<div className={styles.classList}>
									<p className={styles.classListTitle}>현재 수강 목록</p>
									<div className={styles.classListTable}>
										<div className={styles.classListHeader}>
											<p className={styles.classListHeaderCell}>번호</p>
											<p className={styles.classListHeaderCell}>클래스 명</p>
											<p className={styles.classListHeaderCell}>선생님</p>
											<div className={styles.classListHeaderCell}></div>
										</div>
										{sampleStudent.currentClasses.map((classItem, index) => (
											<div key={classItem.id} className={styles.classListRow}>
												<p className={styles.classListCell}>{index + 1}</p>
												<p className={styles.classListCell}>{classItem.name}</p>
												<p className={styles.classListCell}>{classItem.teacher}</p>
												<div className={styles.classListCell}>
													<div className={styles.classListArrow}>
														<div className={styles.arrowRotated}>
															<Arrow />
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>

								<div className={styles.classList}>
									<p className={styles.classListTitle}>이전 수강 목록</p>
									<div className={styles.classListTable}>
										<div className={styles.classListHeader}>
											<p className={styles.classListHeaderCell}>번호</p>
											<p className={styles.classListHeaderCell}>클래스 명</p>
											<p className={styles.classListHeaderCell}>선생님</p>
											<div className={styles.classListHeaderCell}></div>
										</div>
										{sampleStudent.previousClasses.map((classItem, index) => (
											<div key={classItem.id} className={styles.classListRow}>
												<p className={styles.classListCell}>{index + 1}</p>
												<p className={styles.classListCell}>{classItem.name}</p>
												<p className={styles.classListCell}>{classItem.teacher}</p>
												<div className={styles.classListCell}>
													<div className={styles.classListArrow}>
														<div className={styles.arrowRotated}>
															<Arrow />
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Additional Student Information */}
						<div className={styles.additionalInfoSection}>
							<div className={styles.additionalInfoRow}>
								<p className={styles.detailLabel}>보호자 전화번호</p>
								<div className={styles.phoneNumber}>
									<span>{phoneParts(sampleStudent.guardianPhone)[0]}</span>
									<div className={styles.phoneDivider}>
										<Image
											src={imgVector167}
											alt=""
											width={8}
											height={1}
											unoptimized
										/>
									</div>
									<span>{phoneParts(sampleStudent.guardianPhone)[1]}</span>
									<div className={styles.phoneDivider}>
										<Image
											src={imgVector167}
											alt=""
											width={8}
											height={1}
											unoptimized
										/>
									</div>
									<span>{phoneParts(sampleStudent.guardianPhone)[2]}</span>
								</div>
							</div>

							<div className={styles.additionalInfoRow}>
								<p className={styles.detailLabel}>학생 생년월일</p>
								<div className={styles.birthDate}>
									<span>{sampleStudent.birthYear}</span>
									<span>년</span>
									<span>{sampleStudent.birthMonth}</span>
									<span>월</span>
									<span>{sampleStudent.birthDay}</span>
									<span>일</span>
								</div>
							</div>

							<div className={styles.additionalInfoRow}>
								<p className={styles.detailLabel}>학교/학년 정보</p>
								<div className={styles.schoolInfo}>
									<span>{sampleStudent.school}</span>
									<span>{sampleStudent.grade}학년</span>
									<span>{sampleStudent.class}반</span>
								</div>
							</div>
						</div>
					</>
				)}

				{activeTab === "attendance" && (
					<>
						{/* Class Enrollment Section */}
						<div className={styles.classSection}>
							<div className={styles.studentNameSection}>
								<p className={styles.detailLabel}>이름</p>
								<p className={styles.detailValue}>{sampleStudent.name}</p>
							</div>
							<div style={{ marginBottom: "40px" }} />
							<h2 className={styles.sectionTitle}>수강 클래스</h2>
							<div className={styles.classListsContainer}>
								<div className={styles.classList}>
									<p className={styles.classListTitle}>현재 수강 목록</p>
									<div className={styles.classListTable}>
										<div className={styles.classListHeader}>
											<p className={styles.classListHeaderCell}>번호</p>
											<p className={styles.classListHeaderCell}>클래스 명</p>
											<p className={styles.classListHeaderCell}>선생님</p>
											<div className={styles.classListHeaderCell}></div>
										</div>
										{sampleStudent.currentClasses.map((classItem, index) => (
											<div key={classItem.id} className={styles.classListRow}>
												<p className={styles.classListCell}>{index + 1}</p>
												<p className={styles.classListCell}>{classItem.name}</p>
												<p className={styles.classListCell}>{classItem.teacher}</p>
												<div className={styles.classListCell}>
													<div className={styles.classListArrow}>
														<div className={styles.arrowRotated}>
															<Arrow />
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>

								<div className={styles.classList}>
									<p className={styles.classListTitle}>이전 수강 목록</p>
									<div className={styles.classListTable}>
										<div className={styles.classListHeader}>
											<p className={styles.classListHeaderCell}>번호</p>
											<p className={styles.classListHeaderCell}>클래스 명</p>
											<p className={styles.classListHeaderCell}>선생님</p>
											<div className={styles.classListHeaderCell}></div>
										</div>
										{sampleStudent.previousClasses.map((classItem, index) => (
											<div key={classItem.id} className={styles.classListRow}>
												<p className={styles.classListCell}>{index + 1}</p>
												<p className={styles.classListCell}>{classItem.name}</p>
												<p className={styles.classListCell}>{classItem.teacher}</p>
												<div className={styles.classListCell}>
													<div className={styles.classListArrow}>
														<div className={styles.arrowRotated}>
															<Arrow />
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Attendance Calendar Section */}
						<div className={styles.attendanceCalendarSection}>
							<h2 className={styles.sectionTitle}>출결 캘린더</h2>
							<div className={styles.calendarHeader}>
								<div className={styles.calendarLegend}>
									<div className={styles.legendItem}>
										<div className={`${styles.legendColor} ${styles.legendColorAbsent}`}></div>
										<span>미등원</span>
									</div>
									<div className={styles.legendItem}>
										<div className={`${styles.legendColor} ${styles.legendColorPresent}`}></div>
										<span>정상 등원</span>
									</div>
									<div className={styles.legendItem}>
										<div className={`${styles.legendColor} ${styles.legendColorLate}`}></div>
										<span>지각/조퇴</span>
									</div>
								</div>
								<div className={styles.calendarMonthSelector}>
									<p>2025년 12월</p>
									<Arrow className={styles.calendarArrow} />
								</div>
							</div>
							<div className={styles.calendarGrid}>
								{/* Calendar days - December 2025 starts on Monday (Nov 30 is Sunday) */}
								{/* First day is Nov 30 */}
								<div className={`${styles.calendarDay} ${styles.calendarDayOtherMonth}`}>
									<p className={styles.calendarDayNumber}>30</p>
								</div>
								{/* December days 1-31 */}
								{[...Array(31)].map((_, index) => {
									const day = index + 1;
									const isPresent = [2, 4, 5, 9, 11, 12, 16, 19, 23, 25, 26].includes(day);
									const isLate = [18, 30].includes(day);

									return (
										<div
											key={day}
											className={`${styles.calendarDay} ${isLate ? styles.calendarDayLate :
												isPresent ? styles.calendarDayPresent :
													styles.calendarDayAbsent
												}`}
										>
											<p className={styles.calendarDayNumber}>{day}</p>
											{isPresent && <p className={styles.calendarDayTime}>17:58 등원</p>}
											{isLate && <p className={styles.calendarDayTime}>18:58 등원</p>}
										</div>
									);
								})}
								{/* Next month days 1-3 */}
								{[...Array(3)].map((_, index) => {
									const day = index + 1;
									return (
										<div
											key={`next-${day}`}
											className={`${styles.calendarDay} ${styles.calendarDayOtherMonth}`}
										>
											<p className={styles.calendarDayNumber}>{day}</p>
										</div>
									);
								})}
							</div>
						</div>

						{/* Grade Report Section */}
						<div className={styles.gradeReportSection}>
							<h2 className={styles.sectionTitle}>성적 리포트</h2>
							<div className={styles.gradeReportContainer}>
								<div className={styles.gradeReportGraph}>
									<GradeReportGraph />
								</div>
							</div>
						</div>
					</>
				)}

				{activeTab === "payment" && (
					<div className={styles.paymentSection}>
						<p>수납 정보가 여기에 표시됩니다.</p>
					</div>
				)}
			</div>
		</div>
	);
}

