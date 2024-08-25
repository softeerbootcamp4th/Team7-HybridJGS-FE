# ⚡️ TEAM 하이브리드정각세

## 팀원 소개

| 주효정                      | 최수연                      | 김성진                      | 배정우                      |
| --------------------------- | --------------------------- | --------------------------- | --------------------------- |
| ![alt text](images/jhj.png) | ![alt text](images/csy.png) | ![alt text](images/ksj.png) | ![alt text](images/bjw.png) |
| FE                          | FE                          | BE                          | BE                          |
| [@jhj2713](https://github.com/jhj2713)       | [@sooyeoniya](https://github.com/sooyeoniya)       | [@k000927](https://github.com/k000927)                    | [@wjddn2165](https://github.com/wjddn2165)                |

## 서비스 소개

### 서비스명
캐스퍼 일렉트릭 출시 기념 이벤트 웹 사이트

### 시연 영상

https://youtu.be/DEIrSgmXlkE

### 메인 서비스

**랜딩 페이지**
![메인](https://github.com/user-attachments/assets/b5c3814b-5d45-4eae-a6ec-c2f4dd62a318)


추첨 이벤트와 선착순 밸런스 게임 이벤트를 소개합니다.

**캐스퍼 봇 만들기 추첨 이벤트**

![추첨이벤트](https://github.com/user-attachments/assets/779f925c-fa33-46ee-98b5-3b3c024e23c2)



캐스퍼 일렉트릭의 특징에 대해 소개합니다.

![image](https://github.com/user-attachments/assets/fef8917c-6487-4f74-bee9-6f5149e7fcbc)

캐스퍼 일렉트릭 봇 만들기를 통해 추첨 이벤트에 참여할 수 있습니다.

**선착순 밸런스 게임 이벤트**

![선착순이벤트](https://github.com/user-attachments/assets/f7ba173a-5590-43f1-8939-edb29720e20f)

캐스퍼 일렉트릭의 장점에 대해 소개합니다.

![선착순이벤트](https://github.com/user-attachments/assets/82b1ed99-eb66-4446-8557-aa52894f3d8e)


캐스퍼 일렉트릭의 장점과 관련된 밸런스 게임을 통해 선착순 이벤트에 참여할 수 있습니다.

### 어드민 서비스

**선착순 밸런스 게임 이벤트 관리**

![image](https://github.com/user-attachments/assets/ba57d8d1-0dcc-458f-913e-11e27d3bb89d)

선착순 이벤트를 관리할 수 있습니다.

![image](https://github.com/user-attachments/assets/c17a045c-d718-4a81-9825-a9697daa8499)

선착순 밸런스 게임 이벤트에 참여한 참여자 목록을 조회할 수 있습니다.

**캐스퍼 봇 만들기 추첨 이벤트 관리**

![image](https://github.com/user-attachments/assets/674b49fc-c66b-475a-bacd-a24ad03562c1)

추첨 이벤트를 관리할 수 있습니다.

![image](https://github.com/user-attachments/assets/d0f02e91-bb4d-4508-b866-91ca909a0732)

캐스퍼 봇 만들기 추첨 이벤트에 참여한 참여자 목록을 조회할 수 있습니다.

## 협업 전략

### 커밋 컨벤션

```
feat: 기능 구현
chore: 사소한 변경 사항
design: 스타일(css) 변경
refactor: 리팩토링
fix: 오류 수정
docs: 문서 작성
```

### 브랜치 컨벤션

```
main
dev
feat/#1-button
fix/#2-category
...
```

### FE 폴더 구조

```jsx
├── src
│   ├── apis
│   ├── components
│   ├── constants
│   ├── contexts
│   ├── features
│   ├── hooks
│   ├── pages
│   ├── types
└── └── utils
```

### BE 폴더 구조

```jsx
├── main
│   ├── generated
│   ├── java
│   │   └── JGS
│   │       └── CasperEvent
│   │           ├── domain
│   │           │   ├── event
│   │           │   │   ├── controller
│   │           │   │   │   ├── adminController
│   │           │   │   │   └── eventController
│   │           │   │   ├── dto
│   │           │   │   │   ├── request
│   │           │   │   │   │   ├── lotteryEventDto
│   │           │   │   │   │   └── rushEventDto
│   │           │   │   │   └── response
│   │           │   │   │       ├── lottery
│   │           │   │   │       └── rush
│   │           │   │   ├── entity
│   │           │   │   │   ├── admin
│   │           │   │   │   ├── casperBot
│   │           │   │   │   ├── event
│   │           │   │   │   └── participants
│   │           │   │   ├── repository
│   │           │   │   │   ├── eventRepository
│   │           │   │   │   └── participantsRepository
│   │           │   │   └── service
│   │           │   │       ├── adminService
│   │           │   │       ├── eventService
│   │           │   │       └── redisService
│   │           │   ├── health
│   │           │   │   └── api
│   │           │   └── url
│   │           │       ├── controller
│   │           │       ├── dto
│   │           │       ├── entity
│   │           │       ├── repository
│   │           │       └── service
│   │           └── global
│   │               ├── config
│   │               ├── entity
│   │               ├── enums
│   │               ├── error
│   │               │   └── exception
│   │               ├── interceptor
│   │               ├── jwt
│   │               │   ├── dto
│   │               │   ├── filter
│   │               │   ├── repository
│   │               │   ├── service
│   │               │   └── util
│   │               ├── response
│   │               ├── service
│   │               └── util
│   └── resources
└── test
    ├── java
    │   └── JGS
    │       └── CasperEvent
    │           ├── LotteryEventTests
    │           ├── domain
    │           │   ├── event
    │           │   │   ├── controller
    │           │   │   │   ├── adminController
    │           │   │   │   └── eventController
    │           │   │   └── service
    │           │   │       ├── adminService
    │           │   │       └── eventService
    │           │   └── url
    │           │       ├── controller
    │           │       └── service
    │           └── global
    │               ├── jwt
    │               │   └── service
    │               └── service
    └── resources
```

### Pull Requests 템플릿

```
## 🖥️ Preview

close #{issue number}

## ✏️ 한 일

## ❗️ 발생한 이슈 (해결 방안)

## ❓ 논의가 필요한 사항
```

### Issues 템플릿

```
## 🖥️ 어떤 기능인가요?

## ✏️ 작업 상세 내용

## ❗️ 참고 자료 (선택)
```

```
## 🖥️ 어떤 버그인가요?

## ❗️ 참고 자료 (선택)
```

## 그라운드 룰

### 소통과 피드백 💬

1. **반대 의견을 두려워하지 말기**
    - 의견에 반대할 때에는 ‘좋은 의견입니다’ + ‘이 의견이 좋은 이유’ 말하고 시작하기
    - *~~(인프피과다그룹)~~*
2. **어려움은 솔직하게 공유하기**
    - 불편함이 느껴지면 곧바로 공유하기
    - 상처받았으면 상처받았다고 말하고 사과하기
3. **편안한 커뮤니케이션을 위해 노력하기**
    - 경청하기
    - 생각하고 말하기
4. **온라인 커뮤니케이션**
    - 업무 메시지는 무조건 두괄식
    - 메시지를 읽으면 이모지 남기기

### 약속과 시간 관리 ⏰

1. **시간 약속은 꼭 지키기**
    - 회의 시간에 3분 이상 늦으면 팀 내 1명에게 랜덤으로 커피 쿠폰 쏘기
    - 지키기 어려울 때는 최대한 빠르게 알리기
2. **회의가 길어질 경우 잠시 휴식을 취하고, 유동적으로 시간 관리하기**

### 회의 효율성 📄

1. **회의의 목표를 분명히 하기**
    - 목표를 모두가 공유하고 시작하기
    - 회의가 끝났을 때에는 결과가 있을 것 (아이디어, 의사 결정, Action Item)
    - *~~"아무쪼록 다같이 열심히 해봐요 ^\\\^ ” 금지~~*
2. **회의록 잘 관리하기**
    - 회의록 꼭 작성하고 공유하기
    - 회의 진행자는 회의 아젠다를 회의록에 미리 정리하기
    - 회의 참여자는 아젠다 체크하고 이모지로 확인하기

### 팀 문화 🥰

- 웃으며 일하기!
- 프로덕트의 비전과 미션을 주기적으로 상기
- 친해지기 위해 노력하기. (밥 같이 먹기 등)

## 기획/디자인 링크

[Figma](https://www.figma.com/design/RjcSZf0akqXegZpLM400IJ/Handoff_%ED%95%98%EC%9D%B4%EB%B8%8C%EB%A6%AC%EB%93%9C%EC%A0%95%EA%B0%81%EC%84%B8?node-id=2542-5422&t=SxvR5Gn63FeFrEli-1)

## Git Project

[github](https://github.com/orgs/softeerbootcamp4th/projects/8)

## 노션

[notion](https://www.notion.so/0f847f8e83e9423394eeb95e460a0840?pvs=21)

## 개발 이슈

[notion](https://www.notion.so/941aa9df9b7b4bc69d0219e05a105077?pvs=21)

### 백엔드 ER 다이어그램

![image](https://github.com/user-attachments/assets/b2a9050e-a565-441f-98c3-25ec1b6547c1)
