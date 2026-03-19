# 개인 블로그 프로젝트 (Blog_mini_project)

**React**와 **Tailwind CSS**를 활용하여 제작한 깔끔하고 현대적인 디자인의 개인 블로그 애플리케이션입니다. 사용자 경험을 최우선으로 고려하여 일관성 있는 디자인 시스템(Gray & White)을 적용했습니다.

**배포**
- (Vercel 공식 사이트) 사용
- blog-mini-project-pi.vercel.app

## 핵심 기능

- **사용자 인증:** `AuthContext`를 통한 회원가입 및 로그인 시스템 (전역 상태 관리).
- **메시지 시스템:** 사용자 간 실시간 대화 느낌을 주는 메시지 송수신 기능 및 전용 보관함.
- **게시판 관리:** 게시글 작성, 조회, 수정, 삭제(CRUD) 기능 제공.
- **마이 보드:** 내가 작성한 글만 따로 모아보고 관리할 수 있는 전용 대시보드.
- **캘린더 뷰:** 날짜별 일정 및 게시 활동을 한눈에 확인할 수 있는 인터랙티브 캘린더.
- **데이터 영속성:** 브라우저의 `localStorage`를 활용하여 새로고침 후에도 데이터 유지.
- **반응형 디자인:** 모바일과 데스크탑 어디서든 최적화된 UI 제공.

---

## 사용 기술 (Tech Stack)

- **Frontend:** React (Hooks, Context API, Router)
- **Styling:** Tailwind CSS (Modern & Minimalist Design)
- **Deployment:** Vercel (자동 배포 시스템)
- **State Management:** 전역 사용자 상태 관리를 위한 custom Provider 활용.

---

## 디자인 포인트

- **색상 팔레트:** 연한 회색(Gray-50) 배경과 진한 회색(Gray-900) 포인트 컬러 사용.
- **타이포그래피:** 가독성 좋은 폰트와 대문자 트래킹을 활용한 세련된 라벨링.
- **인터랙티브 요소:** 버튼 클릭 시 `active:scale-95` 효과 등 생동감 있는 피드백 제공.




