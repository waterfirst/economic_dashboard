# 🇺🇸 🇰🇷 한·미 매크로 경제 지표 대쉬보드 & Firebase 배포 프로젝트

Firebase를 활용하여 웹 서비스를 설계하고 배포하는 프로젝트 저장소입니다.  
클라이언트 브라우저 단에서 실시간 금융 데이터를 직접 바인딩하여 작동하는 매크로 경제 지표 대쉬보드를 제공하며, Firebase의 두 가지 핵심 배포 아키텍처(정적 호스팅 및 동적 서버 렌더링)에 대응할 수 있도록 설정되어 있습니다.

---

## 🏗️ 프로젝트 아키텍처 구성

이 프로젝트는 상황에 따라 다음 두 가지 배포 아키텍처 중 하나를 선택하여 운영할 수 있습니다.

### 1. 정적 호스팅 (Static Hosting) - *현재 배포 방식*
* **개요:** HTML, CSS, JavaScript 및 브라우저 기반 TradingView 차트 위젯을 구글 CDN 서버를 통해 사용자에게 직접 전달합니다.
* **비용:** 무료 요금제(Spark)에서 100% 무료로 배포할 수 있으며, 서버 부하가 전혀 없어 매우 속도가 빠릅니다.
* **배포 파일:** `public/index.html`

### 2. 동적 서버 렌더링 (Cloud Functions V2 + Express)
* **개요:** 사용자의 요청 시점마다 Node.js 백엔드 엔진(Cloud Functions)이 서버 단에서 실시간 계산(예: 서버 시간 출력 등) 및 HTML 템플릿 조립을 수행하여 완성본을 반환(SSR)합니다.
* **비용:** Blaze(종량제) 요금제가 필요합니다.
* **배포 파일:** `functions/index.js` (Express.js 연동)

---

## 📁 주요 폴더 구조

```text
├── public/                # 정적 호스팅 파일 저장 폴더
│   └── index.html         # 실시간 한미 매크로 대쉬보드 메인 페이지 (CDN 서빙)
├── functions/             # Cloud Functions Node.js 백엔드 폴더
│   ├── index.js           # 동적 웹페이지 생성 Express 서버 로직
│   └── package.json       # 백엔드 의존성 및 설정 파일
├── firebase.json          # Firebase 배포 및 라우팅 설정 파일
├── .firebaserc            # Firebase 프로젝트 설정 바인딩 파일
└── README.md              # 프로젝트 안내서
```

---

## 🚀 시작하기 & 배포 방법

### 1. 로컬 환경에서 실행 및 테스트
Firebase Local Emulator를 활용해 상용 서버에 올리기 전 동작을 최종적으로 검증합니다.

```bash
# 에뮬레이터 실행
firebase emulators:start
```
* 에뮬레이터 실행 후 출력되는 로컬 호스팅 주소(`http://127.0.0.1:5000`)로 접속해 테스트할 수 있습니다.

### 2. Firebase 호스팅에 배포 (Spark 무료 요금제 대응)
정적 대쉬보드 기능만 상용 서버에 반영하려면 아래 명령어를 사용합니다.

```bash
firebase deploy --only hosting
```

### 3. Cloud Functions 포함 전체 배포 (Blaze 요금제 필수)
백엔드 로직까지 포함하여 배포하려면 Blaze 요금제 업그레이드 후 아래 명령어를 실행합니다.

```bash
firebase deploy
```

---

## 📅 한·미 매크로 대쉬보드 주요 기능
* **실시간 환율 차트:** TradingView 실시간 원/달러(USD/KRW) 환율 동향 연동
* **주요 거시경제 지표 테이블:** 한국과 미국의 기준금리, CPI(물가상승률), GDP 성장률, 실업률 비교
* **실시간 글로벌 경제 일정:** 전 세계 주요 경제 이벤트를 실시간 피드로 표시
* **양국 증시 종합 차트:** S&P 500 및 KOSPI 지수 차트 실시간 표기
