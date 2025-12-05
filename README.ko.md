# @kaori-killer/port

현재 실행 중인 포트를 확인하고 프로세스를 종료할 수 있는 CLI 도구입니다.

> [English](README.md) | [한국어](README.ko.md)

## 설치

### 전역 설치 (권장)

```bash
npm install -g @kaori-killer/port
```

### 로컬 설치

```bash
npm install @kaori-killer/port
```

전역 설치 후 어디서든 `port` 명령어를 사용할 수 있습니다.

## 사용법

### 포트 목록 확인

모든 사용 중인 포트 목록 보기:

```bash
port ls
```

### 특정 포트 확인

```bash
port check 3000
```

### 프로세스 종료

```bash
port kill 3000
```

## 왜 port를 사용하나요?

### 직접 명령어 vs port

| 작업 | 직접 명령어 | port |
|------|------------|------|
| 포트 목록 | `lsof -i -P -n \| grep LISTEN` | `port ls` |
| 포트 확인 | `lsof -i :3000 -P -n` | `port check 3000` |
| 프로세스 종료 | `lsof -ti :3000 \| xargs kill` | `port kill 3000` |

### 주요 장점

1. **간단한 명령어**: 복잡한 `lsof` 명령어 대신 직관적인 `port` 명령어
2. **읽기 쉬운 출력**: 원시 데이터 대신 포맷된 테이블로 표시
3. **친절한 에러 처리**: 프로세스가 없을 때 명확한 안내 메시지
4. **일관된 구조**: 모든 작업이 `port <action>` 형식으로 통일
5. **종료 확인**: 프로세스 종료 후 자동으로 확인 메시지 표시

## 개발

### 린트

```bash
npm run lint
```

### 자동 수정

```bash
npm run lint:fix
```

### 포맷팅

```bash
npm run format
```

### 실행

```bash
npm start
```

## 라이선스

MIT
