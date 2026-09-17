# Assignment 2-1 · Responsive CRUD Frontend Service

배산 · 22300344 · 오픈소스 스튜디오 02분반

## 이전 과제 활용

`PROJECT1/assign02-c02-22300344`의 파일을 현재 저장소의 시작점으로 사용했다. 첫 커밋에는 복사한 원본 5개를 보존하고 다음 커밋에 이번 과제의 확장과 정리를 기록한다.

- `bootstrap_ex.html`의 기존 Heroes 마크업, 소개와 버튼을 `example.html`로 옮겼다.
- `style1.html`의 초록색 헤더, 좌측 메뉴와 회색 푸터 규칙을 `my.css`에 옮겨 모든 페이지에 적용했다. 모바일에서는 메뉴가 위로 이동한다.
- `index.html`은 기존 진입 페이지를 도서 목록으로 확장했다.
- 역할을 마친 `nostyle.html`, `style1.html`, `style2.html`, `bootstrap_ex.html`은 삭제했다. 원본은 Git 첫 커밋에서 확인할 수 있다.

## Service Topic

**책장(Book Shelf)**: 개인 도서 정보와 독서 상태를 관리하는 Multi-Page CRUD Frontend Service.
샘플 도서 5권을 제공하며, JavaScript와 localStorage로 추가·조회·수정·삭제 결과를 같은 브라우저에 저장한다. 서버나 계정 기능은 없으며 다른 기기와 동기화되지 않는다. 처음에는 샘플 데이터가 표시되고, 모든 도서를 삭제하면 빈 목록을 유지한다.

## Data Fields

| Field | 설명 |
| --- | --- |
| id | 자동 생성되는 Record 식별자, 수정 불가 |
| title | 도서명 |
| author | 저자 |
| publisher | 출판사 |
| year | 출판년도 |
| isbn | 숫자 13자리의 도서 식별번호 |
| category | 문학, IT / 기술, 인문 / 사회, 자기계발, 기타 |
| status | 읽고 싶어요, 읽는 중, 완독 |
| addedDate | 등록일 |
| memo | 선택 입력하는 독서 메모 |

사용자 입력 필드는 9개이며 모두 수정할 수 있다. id는 내부 식별자로 상세 페이지에 표시한다.

## Pages & Navigation

- `example.html`: Bootstrap 공식 Heroes의 Centered hero 예제를 참고한 페이지.
- `index.html`: 번호, 도서명, 저자, 카테고리, 출판년도, 독서 상태의 6개 열과 도서 통계. Add 버튼은 `add.html`, 도서명은 `view.html?id=...`로 이동한다.
- `add.html`: 도서 등록 폼. 성공 시 alert 메시지와 함께 상세 페이지로 이동한다.
- `view.html`: 전체 필드 표시. Edit 버튼으로 수정 폼에 이동하고 Delete 버튼은 confirm 후 삭제한다.
- `edit.html`: 기존 값이 채워진 수정 폼. 검증 통과 후 confirm으로 수정 여부를 확인한다.
- 모든 페이지에서 목록으로 돌아갈 수 있다. 상세/수정 페이지에 id 없이 직접 접속하면 첫 도서를 표시하고, 존재하지 않는 id는 안내한다.
- `my.css`: 공통 스타일. `js/app.js`: 데이터, 검증, 화면 렌더링 및 저장 로직.

## Validation

add.html과 edit.html은 같은 JavaScript 검증 함수를 사용한다. 각 필드 아래에 오류를 표시하고 첫 오류 필드로 포커스를 이동한다.

1. 도서명: 공백 제거 후 필수, 2~100자.
2. 저자: 공백 제거 후 필수, 1~50자.
3. 출판사: 공백 제거 후 필수, 1~80자.
4. 출판년도: 필수, 1450~2100 사이의 정수.
5. ISBN: 숫자 13자리. 체크섬 검증은 하지 않는다.
6. 카테고리: 정해진 선택지 중 하나를 선택.
7. 독서 상태: 정해진 선택지 중 하나를 선택.
8. 등록일: 필수, 실제 존재하는 YYYY-MM-DD 날짜.
9. 메모: 선택, 최대 500자.

HTML의 required, minlength, maxlength, min, max, pattern도 설정했다. novalidate로 브라우저 기본 오류 팝업을 끄고 JavaScript에서 일관된 오류 메시지를 제공한다.

## RWD

viewport를 설정했다. Desktop에서는 폼을 `col-md-6`으로 2열 배치하고, 768px 미만에서는 1열로 표시한다. 공통 CSS의 Media Query로 Desktop의 좌측 메뉴를 모바일에서 상단으로 이동하고 여백과 제목 크기를 줄인다. 버튼은 최소 44px 높이이며 모바일 폼 하단 버튼은 같은 너비로 배치한다. 표는 `table-responsive` 안에서 가로 스크롤하여 전체 페이지의 가로 넘침을 방지한다. 상세 정보와 Footer는 모바일에서 1열로 표시한다.

## Bootstrap

Bootstrap 5.3.8 CSS CDN을 사용한다. 사용 클래스: `container`, `row`, `col-md-6`, `col-lg-6`, `g-4`, `table`, `table-responsive`, `card`, `form-control`, `form-select`, `form-label`, `invalid-feedback`, `is-invalid`, `btn`, `btn-primary`, `btn-outline-secondary`, `btn-outline-danger`, `alert`, `d-grid`, `d-sm-flex`, `display-5`, `lead`.

- [Bootstrap 시작하기](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Heroes 예제](https://getbootstrap.com/docs/5.3/examples/heroes/)

## Problem & Solution

- **여러 페이지에서 같은 데이터 유지**: 공통 JavaScript와 localStorage를 사용하고 URL의 id로 Record를 찾는다.
- **모바일 표의 가로 넘침**: 표만 가로 스크롤할 수 있도록 table-responsive를 사용한다.
- **추가와 수정의 검증 중복**: 공통 validateBook 함수로 두 폼에 같은 조건을 적용한다.
- **입력 내용이 HTML로 해석되는 문제**: 텍스트를 HTML 이스케이프한 후 출력한다.
- **저장소 오류와 없는 Record**: 오류를 안내하고 잘못된 저장이나 수정이 진행되지 않도록 처리한다.

## Reflection

CSS Grid와 Bootstrap Grid를 함께 사용하면 화면의 목적에 따라 배치를 구성하기 편하다. 폼의 HTML 속성뿐 아니라 JavaScript로 공백, 선택값, 날짜의 유효성을 검증해야 한다는 점을 배웠다. localStorage는 브라우저 안에서 동작하는 간단한 CRUD에 유용하지만, 여러 사용자가 데이터를 공유하려면 서버와 데이터베이스가 필요하다.

## Local Run & Verification

```sh
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000`에 접속한다. Bootstrap CDN을 불러오려면 인터넷 연결이 필요하다.

로컬 정적 검사로 다섯 페이지의 공통 CSS, viewport, 내부 링크, 중복 ID를 확인했다. JavaScriptCore에서 샘플 데이터, 9개 검증 조건, 연도 범위, HTML 이스케이프, 추가·수정·삭제 저장, 빈 목록 유지, 손상된 저장소 처리를 확인했다. 2026-09-17 배포 URL의 `/`, `/example.html`, `/add.html`, `/view.html`, `/edit.html`, `/my.css`, `/js/app.js`가 모두 HTTP 200으로 응답하고 프로젝트 내용이 제공되는 것을 확인했다. 실제 브라우저의 Desktop/Mobile 화면과 confirm/alert 동작은 아직 검증하지 않았다.

제출 전 브라우저에서 확인할 항목:

- Desktop(예: 1440px), Mobile(예: 390px)에서 다섯 페이지, 내비게이션, 표 스크롤 확인.
- 빈 입력, 짧은 도서명, 범위 밖 연도, 잘못된 ISBN, 미선택 필드, 누락된 날짜로 저장이 차단되는지 확인.
- 정상 추가 → 상세 → 수정 취소/확인 → 새로고침 → 삭제 취소/확인 확인.
- 모든 도서를 삭제한 후 빈 목록이 유지되는지 확인.

## Deployment & Submission

- 수업 GitHub Repository: https://github.com/2026-2-OSS/assign03-c02-22300344
- 개인 GitHub Repository: https://github.com/distort1074/assign03-c02-22300344
- 배포 브랜치: `master`. Vercel 프로젝트의 Production Branch도 `master`로 설정한다.
- 이중 배포를 위해 `origin`의 push URL에 두 저장소를 등록했다. `git push origin master`로 두 저장소에 같은 커밋을 전송한다. `personal` remote는 개인 저장소를 개별 조회하거나 push할 때 사용한다. 각 배포 사이트가 해당 저장소를 연결해야 자동 배포된다.
- Vercel Deploy URL: https://assign03-c02-22300344.vercel.app
- Vercel에서는 GitHub 저장소를 연결하고 Framework Preset을 Other로 설정한다. 정적 HTML 프로젝트이므로 별도 빌드 명령이 필요하지 않다.
- 배포 후 `/`, `/example.html`, `/add.html`, `/view.html`, `/edit.html` 접근과 Desktop/Mobile 화면을 확인한다.
- Google Form 퀴즈 제출: 아직 미제출. 아래 초안으로 직접 제출한다.

## Weekly Question · 제출용 초안

### 1. 객관식

Bootstrap의 `table-responsive`를 표의 부모 요소에 적용하는 주요 목적은 무엇인가?

① 표 데이터를 자동으로 삭제한다. ② 좁은 화면에서 표 영역을 가로 스크롤할 수 있도록 한다. ③ 모든 열을 숨긴다. ④ 표를 입력 폼으로 바꾼다.

**정답: ②.** 좁은 화면에서 표의 내용을 확인할 수 있도록 표 영역에 가로 스크롤을 제공한다.

### 2. OX

필수 입력 항목에 공백만 들어 있어도 문자열 길이가 0보다 크면 항상 유효한 입력으로 처리해야 한다.

**정답: X.** trim()으로 앞뒤 공백을 제거하고 실제 내용이 있는지 검증해야 한다.

제출 링크: https://forms.gle/QoxoyWP8ZiJTyJu67
