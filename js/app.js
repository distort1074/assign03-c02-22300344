'use strict';
const STORAGE_KEY = 'baesan-books-v1';
const categories = ['문학', 'IT / 기술', '인문 / 사회', '자기계발', '기타'];
const statuses = ['읽고 싶어요', '읽는 중', '완독'];
const sampleBooks = [
  {id:'1', title:'모던 자바스크립트 Deep Dive', author:'이웅모', publisher:'위키북스', year:2020, isbn:'9791158392239', category:'IT / 기술', status:'읽는 중', addedDate:'2026-09-14', memo:'자바스크립트의 기본 개념부터 차근차근 공부하기.'},
  {id:'2', title:'소년이 온다', author:'한강', publisher:'창비', year:2014, isbn:'9788936434120', category:'문학', status:'완독', addedDate:'2026-09-14', memo:'읽은 뒤에도 오래 생각하게 되는 이야기.'},
  {id:'3', title:'클린 코드', author:'로버트 C. 마틴', publisher:'인사이트', year:2013, isbn:'9788966260959', category:'IT / 기술', status:'읽고 싶어요', addedDate:'2026-09-15', memo:''},
  {id:'4', title:'아주 작은 습관의 힘', author:'제임스 클리어', publisher:'비즈니스북스', year:2019, isbn:'9791162540640', category:'자기계발', status:'읽는 중', addedDate:'2026-09-16', memo:'매일 조금씩 읽는 습관 만들기.'},
  {id:'5', title:'사피엔스', author:'유발 하라리', publisher:'김영사', year:2015, isbn:'9788934972464', category:'인문 / 사회', status:'읽고 싶어요', addedDate:'2026-09-17', memo:''}
];
const fieldLabels = {title:'도서명', author:'저자', publisher:'출판사', year:'출판년도', isbn:'ISBN', category:'카테고리', status:'독서 상태', addedDate:'등록일', memo:'메모'};
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
function validateBook(book) {
  const errors = {};
  if (!book.title || book.title.length < 2 || book.title.length > 100) errors.title = '도서명을 2~100자로 입력하세요.';
  if (!book.author || book.author.length > 50) errors.author = '저자를 1~50자로 입력하세요.';
  if (!book.publisher || book.publisher.length > 80) errors.publisher = '출판사를 1~80자로 입력하세요.';
  if (!String(book.year).trim() || !Number.isInteger(Number(book.year)) || Number(book.year) < 1450 || Number(book.year) > 2100) errors.year = '출판년도를 1450~2100 사이의 정수로 입력하세요.';
  if (!/^\d{13}$/.test(book.isbn)) errors.isbn = 'ISBN은 숫자 13자리로 입력하세요.';
  if (!categories.includes(book.category)) errors.category = '카테고리를 선택하세요.';
  if (!statuses.includes(book.status)) errors.status = '독서 상태를 선택하세요.';
  const date = new Date(`${book.addedDate}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(book.addedDate) || Number.isNaN(date.getTime()) || date.toISOString().slice(0,10) !== book.addedDate) errors.addedDate = '유효한 등록일을 입력하세요.';
  if (book.memo.length > 500) errors.memo = '메모는 500자 이내로 입력하세요.';
  return errors;
}
function loadBooks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) return sampleBooks.map(book => ({...book}));
  const books = JSON.parse(saved);
  if (!Array.isArray(books) || !books.every(book => book && typeof book.id === 'string' && Object.keys(fieldLabels).every(key => key in book) && Object.keys(validateBook(book)).length === 0)) throw new Error('Invalid saved data');
  return books;
}
function saveBooks(books) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(books)); return true; }
  catch { alert('브라우저 저장소에 저장하지 못했습니다. 저장소 권한과 용량을 확인하세요.'); return false; }
}
function badge(status) {
  const cls = status === '완독' ? 'status-done' : status === '읽는 중' ? 'status-reading' : '';
  return `<span class="status-badge ${cls}">${escapeHTML(status)}</span>`;
}
function missingRecord() {
  document.getElementById('page-message').innerHTML = '<div class="alert alert-warning">해당 도서를 찾을 수 없습니다. <a href="index.html">목록으로 돌아가기</a></div>';
  const content = document.getElementById('book-form') || document.getElementById('book-detail');
  content.hidden = true;
}
function init() {
  const page = document.body.dataset.page;
  if (!['list','view','add','edit'].includes(page)) return;
  let books;
  try { books = loadBooks(); }
  catch {
    const warning = document.createElement('div');
    warning.className = 'alert alert-danger'; warning.setAttribute('role','alert');
    warning.textContent = '저장된 도서를 읽을 수 없습니다. 브라우저 저장소 설정 또는 데이터를 확인하세요.';
    document.getElementById('main').prepend(warning);
    const form = document.getElementById('book-form');
    if (form) form.hidden = true;
    return;
  }
  const id = new URLSearchParams(location.search).get('id');
  // 직접 view.html / edit.html에 접속하면 첫 번째 Record를 표시한다.
  const book = id === null ? books[0] : books.find(item => item.id === id);
  if (page === 'list') {
    document.getElementById('total-count').textContent = books.length;
    document.getElementById('reading-count').textContent = books.filter(b => b.status === '읽는 중').length;
    document.getElementById('done-count').textContent = books.filter(b => b.status === '완독').length;
    document.getElementById('book-list').innerHTML = books.length ? books.map((b,i) => `<tr><td>${i+1}</td><td><a href="view.html?id=${encodeURIComponent(b.id)}">${escapeHTML(b.title)}</a></td><td>${escapeHTML(b.author)}</td><td>${escapeHTML(b.category)}</td><td>${escapeHTML(b.year)}</td><td>${badge(b.status)}</td></tr>`).join('') : '<tr><td colspan="6" class="text-center py-5">책장이 비어 있습니다. 도서를 추가해 보세요.</td></tr>';
  }
  if (page === 'view') {
    if (!book) return missingRecord();
    const urlId = encodeURIComponent(book.id);
    document.getElementById('book-detail').innerHTML = `<div>${badge(book.status)}</div><h2 class="detail-title mt-3">${escapeHTML(book.title)}</h2><dl class="detail-grid"><div><dt>번호</dt><dd>${escapeHTML(book.id)}</dd></div>${Object.entries(fieldLabels).map(([key,label]) => `<div class="${key === 'memo' ? 'detail-wide' : ''}"><dt>${label}</dt><dd>${escapeHTML(book[key] || '등록된 메모가 없습니다.')}</dd></div>`).join('')}</dl><div class="form-actions"><a class="btn btn-outline-secondary" href="index.html">목록</a><button class="btn btn-outline-danger" id="delete-button" type="button">Delete · 삭제</button><a class="btn btn-primary" href="edit.html?id=${urlId}">Edit · 수정</a></div>`;
    document.getElementById('delete-button').addEventListener('click', () => {
      if (confirm('이 도서를 삭제할까요? 삭제 후에는 되돌릴 수 없습니다.') && saveBooks(books.filter(b => b.id !== book.id))) location.href = 'index.html';
    });
  }
  if (page === 'add' || page === 'edit') {
    const form = document.getElementById('book-form');
    if (page === 'edit') {
      if (!book) return missingRecord();
      Object.keys(fieldLabels).forEach(key => { form.elements[key].value = book[key]; });
      document.getElementById('cancel-link').href = `view.html?id=${encodeURIComponent(book.id)}`;
    }
    form.addEventListener('submit', event => {
      event.preventDefault();
      const values = Object.fromEntries(Object.keys(fieldLabels).map(key => [key,form.elements[key].value.trim()]));
      const errors = validateBook(values);
      Object.keys(fieldLabels).forEach(key => {
        const input = form.elements[key];
        input.classList.toggle('is-invalid', Boolean(errors[key]));
        input.setAttribute('aria-invalid', Boolean(errors[key]) ? 'true' : 'false');
        document.getElementById(`${key}-error`).textContent = errors[key] || '';
      });
      if (Object.keys(errors).length) { form.elements[Object.keys(errors)[0]].focus(); return; }
      values.year = Number(values.year);
      if (page === 'edit' && !confirm('도서 정보를 수정할까요?')) return;
      const record = {...values, id: page === 'edit' ? book.id : crypto.randomUUID()};
      const updated = page === 'edit' ? books.map(b => b.id === book.id ? record : b) : [...books,record];
      if (!saveBooks(updated)) return;
      alert(page === 'add' ? '도서가 추가됩니다.' : '도서 정보가 수정되었습니다.');
      location.href = `view.html?id=${encodeURIComponent(record.id)}`;
    });
  }
}
init();
