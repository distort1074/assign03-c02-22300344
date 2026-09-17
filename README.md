# Assignment 2-1. Responsive CRUD Frontend Service

배산 · 22300344 · 오픈소스 스튜디오 02분반

## Service Topic

**책장(Book Shelf)**은 도서 정보와 독서 상태를 관리하는 서비스이다. 샘플 도서 5권을 제공하고 목록 조회, 도서 추가, 상세 조회, 정보 수정, 삭제 기능을 구현했다. 데이터는 localStorage에 저장하여 같은 브라우저에서 새로고침해도 유지된다.

## Data Fields

| 항목 | Field | 설명 |
| --- | --- | --- |
| 도서명 | title | 등록할 책의 제목 |
| 저자 | author | 책의 저자 |
| 출판사 | publisher | 책을 출판한 출판사 |
| 출판년도 | year | 책이 출판된 연도 |
| ISBN | isbn | 숫자 13자리의 도서 번호 |
| 카테고리 | category | 문학, IT / 기술, 인문 / 사회, 자기계발, 기타 |
| 독서 상태 | status | 읽고 싶어요, 읽는 중, 완독 |
| 등록일 | addedDate | 도서를 등록한 날짜 |
| 메모 | memo | 책에 대한 생각이나 독서 기록, 선택 입력 |

9개 항목을 입력하고 수정할 수 있다. 각 Record에는 페이지 간 조회에 사용하는 식별자 `id`를 자동으로 부여한다.

## List Page

`index.html`에는 번호, 도서명, 저자, 카테고리, 출판년도, 독서 상태의 6개 열을 표시한다. 번호는 목록의 순서를 나타낸다. 전체 도서 수, 읽는 중인 도서 수, 완독한 도서 수도 표시한다.

도서 추가 버튼은 `add.html`로 연결되고, 각 도서명은 해당 Record의 `view.html`로 연결된다. 기본 배포 URL에서는 목록 페이지가 표시된다.

## Pages & Navigation

| 페이지 | 기능 |
| --- | --- |
| example.html | Bootstrap Heroes의 Centered hero를 참고한 예제 |
| index.html | 샘플 데이터와 저장된 도서의 목록 조회 |
| add.html | 9개 입력 항목으로 새 도서 등록, 성공 시 alert 메시지 표시 |
| view.html | 모든 데이터 항목 표시, Edit로 수정 페이지 이동, Delete는 confirm 후 삭제 |
| edit.html | 기존 값을 표시하고 9개 항목 수정, 저장 전 confirm 표시 |

각 페이지의 내비게이션에서 목록으로 돌아갈 수 있다. 상세 페이지와 수정 페이지는 URL의 `id`로 같은 Record를 조회한다. `id` 없이 직접 접속하면 첫 번째 도서를 표시하며, 해당 도서가 없으면 안내 메시지를 표시한다.

## Validation

`add.html`과 `edit.html`에 동일한 JavaScript 검증을 적용했다. 검증에 실패하면 저장하지 않고 필드 아래에 오류를 표시하며, 첫 번째 오류 필드로 포커스를 이동한다.

| 항목 | 검증 조건 |
| --- | --- |
| 도서명 | 앞뒤 공백 제거 후 필수, 2~100자 |
| 저자 | 앞뒤 공백 제거 후 필수, 1~50자 |
| 출판사 | 앞뒤 공백 제거 후 필수, 1~80자 |
| 출판년도 | 필수, 1450~2100 사이의 정수 |
| ISBN | 필수, 숫자 13자리 |
| 카테고리 | 지정된 선택지 중 하나 선택 |
| 독서 상태 | 지정된 선택지 중 하나 선택 |
| 등록일 | 필수, 실제 존재하는 날짜 |
| 메모 | 선택 입력, 최대 500자 |

HTML에도 `required`, `minlength`, `maxlength`, `min`, `max`, `pattern`을 설정했다. JavaScript에서 폼 제출을 처리하여 공백 입력과 잘못된 선택값도 검사한다.

## RWD

모든 페이지에 viewport를 설정하고 `my.css`를 공통 적용했다.

- **Desktop**: 초록색 헤더, 좌측 내비게이션, 우측 콘텐츠 영역으로 구성한다. 입력 폼과 상세 정보는 2열로 배치한다.
- **Mobile**: 768px 미만에서 내비게이션을 콘텐츠 위로 이동하고 입력 폼과 상세 정보를 1열로 배치한다. 제목 크기와 여백을 줄이고 폼 하단 버튼의 너비를 균등하게 배분한다.
- **목록**: `table-responsive`로 표 영역만 가로 스크롤할 수 있게 하여 작은 화면에서도 모든 열을 확인한다.
- **버튼**: 최소 높이를 44px로 설정하여 터치하기 쉽도록 했다.

## Bootstrap

Bootstrap 5.3.8 CSS CDN과 CSS Media Query를 사용했다.

| 용도 | Component / Class |
| --- | --- |
| 레이아웃 | container, row, col-md-6, col-lg-6, g-4 |
| 목록 | table, table-responsive |
| 폼 | form-control, form-select, form-label, form-text |
| 검증 | is-invalid, invalid-feedback |
| 버튼 | btn, btn-primary, btn-outline-secondary, btn-outline-danger |
| 안내 및 영역 | alert, card |
| Heroes 예제 | display-5, lead, d-grid, d-sm-flex, text-center |

`example.html`은 중앙 정렬 제목, 설명, 두 버튼으로 구성한 Heroes 예제이다.

## Problem & Solution

- **페이지 이동 후 데이터 유지**: localStorage에 도서를 저장하고 URL의 식별자로 상세·수정 페이지의 Record를 찾도록 했다.
- **모바일에서 넓은 표 표시**: 표를 `table-responsive`로 감싸 표 영역 안에서 가로 스크롤하도록 했다.
- **추가와 수정의 검증 조건 일치**: 공통 `validateBook()` 함수를 사용하여 두 페이지에 같은 조건을 적용했다.
- **입력 문자열의 HTML 해석**: 사용자 입력을 HTML 이스케이프하여 텍스트로 표시했다.
- **삭제된 도서 접근 및 저장 실패**: 없는 Record나 브라우저 저장소 오류를 안내하고 저장되지 않은 변경을 성공으로 처리하지 않도록 했다.

## Reflection

여러 HTML 페이지에서도 공통 CSS와 JavaScript로 스타일과 데이터 처리를 통일할 수 있다. Bootstrap Grid와 Media Query는 폼과 내비게이션을 화면 크기에 맞게 바꾸는 데 유용하다. 입력 검증에서는 필수 여부뿐 아니라 공백, 숫자 범위, 날짜와 선택값도 확인해야 한다. localStorage에 저장한 도서는 브라우저별로 분리되므로, 여러 기기에서 같은 데이터를 사용하려면 서버와 데이터베이스가 필요하다.

## Weekly Question

### 1. 객관식

Bootstrap의 `table-responsive`를 표의 부모 요소에 적용하는 주요 목적은 무엇인가?

① 표 데이터를 자동으로 삭제한다.
② 좁은 화면에서 표 영역을 가로 스크롤할 수 있도록 한다.
③ 모든 열을 숨긴다.
④ 표를 입력 폼으로 바꾼다.

**정답: ②.** 좁은 화면에서 표의 전체 내용을 확인할 수 있도록 표 영역에 가로 스크롤을 제공한다.

### 2. OX

필수 입력 항목에 공백만 들어 있어도 문자열 길이가 0보다 크면 항상 유효한 입력으로 처리해야 한다.

**정답: X.** `trim()`으로 앞뒤 공백을 제거한 뒤 실제 내용이 있는지 검증해야 한다.

## Submission Links

- [수업 GitHub Repository](https://github.com/2026-2-OSS/assign03-c02-22300344)
- [개인 GitHub Repository](https://github.com/distort1074/assign03-c02-22300344)
- [Vercel Deploy](https://assign03-c02-22300344.vercel.app)

## References

- [Bootstrap 시작하기](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Bootstrap Heroes 예제](https://getbootstrap.com/docs/5.3/examples/heroes/)
