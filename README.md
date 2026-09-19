# Assignment 2-1. Responsive CRUD Frontend Service

배산 · 22300344 · 오픈소스 스튜디오 02분반

## Service Topic

**책장**은 책 정보와 독서 상태를 기록하는 도서관리 페이지이다.
처음에는 샘플 도서 5권이 나오며, 책을 추가하거나 정보를 수정하고 삭제할 수 있다.
서버 없이 동작하는 과제이므로 데이터는 브라우저의 `localStorage`에 저장했다.

## Data Fields

| 항목 | 이름 | 설명 |
| --- | --- | --- |
| 도서명 | title | 책 제목 |
| 저자 | author | 책을 쓴 사람 |
| 출판사 | publisher | 책을 출판한 곳 |
| 출판년도 | year | 출판된 연도 |
| ISBN | isbn | 숫자 13자리의 도서 번호 |
| 카테고리 | category | 문학, IT / 기술, 인문 / 사회, 자기계발, 기타 |
| 독서 상태 | status | 읽고 싶어요, 읽는 중, 완독 |
| 등록일 | addedDate | 책을 등록한 날짜 |
| 메모 | memo | 책에 관한 기록, 선택 입력 |

입력 항목은 총 9개이다. `id`는 도서를 구분하기 위해 자동으로 만든다.

## List Page와 페이지 이동

목록에는 번호, 도서명, 저자, 카테고리, 출판년도, 독서 상태를 표시했다.
이 중 번호를 제외한 5개가 실제 도서 데이터 항목이다.

| 파일 | 기능 |
| --- | --- |
| index.html | 도서 목록과 전체·읽는 중·완독 수 표시 |
| add.html | 도서 추가, 저장 후 alert 표시 |
| view.html | 모든 항목 표시, 수정 링크와 삭제 confirm |
| edit.html | 기존 정보 불러오기, 수정 전 confirm |
| example.html | Bootstrap Heroes의 Centered hero 따라하기 |
| my.css | 모든 페이지의 공통 스타일 |
| js/app.js | 데이터 저장, 목록·상세 표시, 입력 검증 |

목록의 추가 버튼으로 `add.html`에 이동한다. 도서명을 누르면 `view.html?id=...`로 이동하고, 상세 페이지의 수정 버튼으로 같은 도서의 수정 폼을 연다.
모든 페이지에서 도서 목록으로 돌아갈 수 있다. 상세·수정 주소에 id가 없으면 첫 번째 도서를 보여준다.

## Validation

추가와 수정에서 같은 `validateBook()` 함수를 사용한다.
입력값의 앞뒤 공백을 제거한 다음 아래 조건을 확인한다.

| 항목 | 조건 |
| --- | --- |
| 도서명 | 필수, 2~100자 |
| 저자 | 필수, 1~50자 |
| 출판사 | 필수, 1~80자 |
| 출판년도 | 필수, 1450~2100 사이의 정수 |
| ISBN | 필수, 숫자 13자리 |
| 카테고리 | 정해진 선택지 중 하나 선택 |
| 독서 상태 | 정해진 선택지 중 하나 선택 |
| 등록일 | 필수, 실제로 존재하는 날짜 |
| 메모 | 선택, 최대 500자 |

잘못 입력하면 해당 항목 아래에 오류를 표시하고 첫 오류로 포커스를 옮긴다.
HTML에도 `required`, `minlength`, `maxlength`, `min`, `max`, `pattern`을 사용했다.
ISBN은 자리수와 숫자 여부만 검사하며, 실제 발급된 번호인지까지 확인하지는 않는다.

## RWD

모든 페이지에 viewport와 `my.css`를 적용했다.

- Desktop: 왼쪽에 메뉴를 두고 오른쪽에 내용을 배치했다. 폼과 상세 정보는 2열이다.
- Mobile: 768px 미만에서는 메뉴를 위로 올리고 폼과 상세 정보를 1열로 바꾼다.
- 목록 표는 `table-responsive`로 감싸서 좁은 화면에서 표만 가로로 스크롤하게 했다.
- 버튼은 최소 높이를 44px로 두었다.

## Bootstrap

Bootstrap 5.3.8 CSS를 CDN으로 불러온다.
`container`, `row`, `col-md-6`으로 레이아웃을 구성했고, `table`, `form-control`, `form-select`, `btn`, `card`, `alert`를 사용했다.
오류 표시에는 `is-invalid`와 `invalid-feedback`을 사용했다.

`example.html`은 [Heroes 예제](https://getbootstrap.com/docs/5.3/examples/heroes/)의 Centered hero를 참고했다.
가운데 제목, 설명, 버튼 2개를 배치하고 내용을 자기소개와 도서 목록 링크로 바꿨다.

## Problem & Solution

- 페이지가 나뉘어 있어 선택한 도서를 전달해야 했다. URL의 `id`로 도서를 찾고 `localStorage`에서 정보를 읽도록 했다.
- 표가 좁은 화면보다 넓어지는 문제는 표 영역 안에서 가로 스크롤하게 처리했다.
- 추가와 수정의 검증 코드가 달라지지 않도록 공통 함수를 사용했다.
- 메모에 HTML 태그를 입력해도 실행되지 않도록 특수문자를 변환해서 표시했다.
- 삭제된 도서의 주소로 접속하면 찾을 수 없다는 메시지를 보여준다.

## Reflection

여러 HTML 페이지에서도 CSS와 JavaScript 파일을 공유할 수 있다는 점을 확인했다.
입력 검증은 빈칸뿐 아니라 공백만 입력한 경우와 잘못된 날짜도 확인해야 한다.
`localStorage`는 새로고침 후에도 데이터를 유지하지만 다른 브라우저나 기기와 공유하지는 않는다.
나중에는 서버에 저장하는 방식과 어떤 차이가 있는지 더 알아보고 싶다.

## Submission Links

- [수업 GitHub Repository](https://github.com/2026-2-OSS/assign03-c02-22300344)
- [개인 GitHub Repository](https://github.com/distort1074/assign03-c02-22300344)
- [Vercel Deploy](https://assign03-c02-22300344.vercel.app)

## References

- [Bootstrap 시작하기](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Bootstrap Heroes 예제](https://getbootstrap.com/docs/5.3/examples/heroes/)
