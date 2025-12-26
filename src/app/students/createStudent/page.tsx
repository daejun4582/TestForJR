"use client";

import { Sidebar } from '@/components/screens/Sidebar';
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

// Image assets - these URLs are temporary (7 days), should be downloaded and stored locally
const imgTypeRightStatusDefault = "https://www.figma.com/api/mcp/asset/10e711ca-c0dc-4edf-9919-e101d7fab069";
const imgEllipse2 = "https://www.figma.com/api/mcp/asset/fad6fd97-47d6-4730-8a15-4ba2d11d7b15";
const imgTablerSearch = "https://www.figma.com/api/mcp/asset/4926b667-37b9-4706-bd21-dc718d14368b";
const imgEllipse12 = "https://www.figma.com/api/mcp/asset/1cfa1737-0468-4d1e-a735-193607a5a32b";
const imgPerson = "https://www.figma.com/api/mcp/asset/e48fa56f-7212-421d-9574-89483085f36d";
const imgCamera = "https://www.figma.com/api/mcp/asset/0cdc8cd0-7c95-4dc1-af49-3199574e81da";
const imgVector166 = "https://www.figma.com/api/mcp/asset/5aae02ed-b106-4755-bc32-f95d0e5441c3";

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

export default function CreateStudentPage() {
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
				<h1 className={styles.title}>신규 학생 등록</h1>

				{/* Required Fields Section */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>필수 입력 정보</h2>

					{/* Name Field */}
					<div className={styles.fieldGroup}>
						<label className={styles.fieldLabel}>
							이름
							<span className={styles.requiredDot}></span>
						</label>
						<div className={styles.inputWrapper}>
							<input
								type="text"
								placeholder="Text Field"
								className={styles.textInput}
							/>
						</div>
					</div>

					{/* Student Phone Number Field */}
					<div className={styles.fieldGroup}>
						<label className={styles.fieldLabel}>
							학생 전화번호
							<span className={styles.requiredDot}></span>
						</label>
						<div className={styles.inputWrapper}>
							<input
								type="tel"
								placeholder="Text Field"
								className={styles.textInput}
							/>
						</div>
					</div>

					{/* Class Field */}
					<div className={styles.fieldGroup}>
						<label className={styles.fieldLabel}>
							수강 클래스
							<span className={styles.requiredDot}></span>
						</label>
						<div className={styles.dropdownWrapper}>
							<span className={styles.dropdownText}>클래스 이름</span>
							<Arrow className={styles.dropdownArrow} />
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className={styles.divider}></div>

				{/* Optional Fields Section */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>선택 입력 정보</h2>

					{/* Guardian Phone Number Field */}
					<div className={styles.fieldGroup}>
						<label className={styles.fieldLabel}>보호자 전화번호</label>
						<div className={styles.inputWrapper}>
							<input
								type="tel"
								placeholder="Text Field"
								className={styles.textInput}
							/>
						</div>
					</div>

					{/* Birth Date Field */}
					<div className={styles.fieldGroup}>
						<label className={styles.fieldLabel}>학생 생년월일</label>
						<div className={styles.dateGroup}>
							<div className={styles.dateDropdown}>
								<span className={styles.dropdownText}>년</span>
								<Arrow className={styles.dropdownArrow} />
							</div>
							<div className={styles.dateDropdown}>
								<span className={styles.dropdownText}>월</span>
								<Arrow className={styles.dropdownArrow} />
							</div>
							<div className={styles.dateDropdown}>
								<span className={styles.dropdownText}>일</span>
								<Arrow className={styles.dropdownArrow} />
							</div>
						</div>
					</div>

					{/* School Information Field */}
					<div className={styles.fieldGroup}>
						<label className={styles.fieldLabel}>학교 정보</label>
						<div className={styles.schoolInfoGroup}>
							<div className={styles.schoolNameInput}>
								<input
									type="text"
									placeholder="학교 명을 입력하세요"
									className={styles.schoolNameField}
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
							<div className={styles.schoolDropdowns}>
								<div className={styles.schoolDropdown}>
									<span className={styles.dropdownText}>학년</span>
									<Arrow className={styles.dropdownArrow} />
								</div>
								<div className={styles.schoolDropdown}>
									<span className={styles.dropdownText}>반</span>
									<Arrow className={styles.dropdownArrow} />
								</div>
							</div>
						</div>
					</div>

					{/* Photo Upload Field */}
					<div className={styles.fieldGroup}>
						<label className={styles.fieldLabel}>사진 등록</label>
						<div className={styles.photoUploadGroup}>
							<div className={styles.photoPlaceholder}>
								<Image
									src={imgEllipse12}
									alt=""
									width={160}
									height={160}
									className={styles.photoCircle}
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
							<button className={styles.addImageButton}>
								<Image
									src={imgCamera}
									alt=""
									width={24}
									height={24}
									unoptimized
								/>
								<span>이미지 추가</span>
							</button>
						</div>
					</div>
				</div>

				{/* Save Button */}
				<div className={styles.saveButtonWrapper}>
					<button className={styles.saveButton}>저장하기</button>
				</div>
				<div className={styles.sizedBox} />
			</div>
		</div>
	);
}
