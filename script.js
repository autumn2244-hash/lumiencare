(function(){
  // ── 아이콘 렌더링 (lucide 아이콘 데이터를 로컬에 내장 - CDN 불필요) ──
  var ICONS = {
    "phone": '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',
    "menu": '<path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>',
    "x": '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    "chevron-right": '<path d="m9 18 6-6-6-6"/>',
    "chevron-left": '<path d="m15 18-6-6 6-6"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    "star": '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
    "check-circle-2": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    "shield": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    "clock": '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    "heart": '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',
    "sparkles": '<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>',
    "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    "bath": '<path d="M10 4 8 6"/><path d="M17 19v2"/><path d="M2 12h20"/><path d="M7 19v2"/><path d="M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>',
    "home": '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    "wind": '<path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>',
    "refrigerator": '<path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z"/><path d="M5 10h14"/><path d="M15 7v6"/>'
  };

  function renderIcons(){
    document.querySelectorAll('[data-lucide]').forEach(function(el){
      var name = el.getAttribute('data-lucide');
      var inner = ICONS[name];
      if (!inner) return;
      var w = el.getAttribute('width') || '24';
      var h = el.getAttribute('height') || '24';
      var cls = el.getAttribute('class');
      var style = el.getAttribute('style');
      var id = el.id;
      var svgNS = 'http://www.w3.org/2000/svg';
      var wrapper = document.createElementNS(svgNS, 'svg');
      wrapper.setAttribute('width', w);
      wrapper.setAttribute('height', h);
      wrapper.setAttribute('viewBox', '0 0 24 24');
      wrapper.setAttribute('fill', 'none');
      wrapper.setAttribute('stroke', 'currentColor');
      wrapper.setAttribute('stroke-width', '2');
      wrapper.setAttribute('stroke-linecap', 'round');
      wrapper.setAttribute('stroke-linejoin', 'round');
      wrapper.innerHTML = inner;
      if (cls) wrapper.setAttribute('class', cls);
      if (style) wrapper.setAttribute('style', style);
      if (id) wrapper.id = id;
      el.replaceWith(wrapper);
    });
  }
  renderIcons();

  // ── 브랜드 색상 (FAQ 팝업에서도 사용) ──
  var C = {
    brown: "#3b2a1a", tan: "#b8916a", tanLight: "#d4b08a",
    cream: "#faf7f2", creamDark: "#f5ede0", muted: "#ede4d6",
    mutedText: "#7e6a55", white: "#ffffff"
  };

  // ── FAQ 데이터 ──
  var FAQ_ITEMS = [
    { q: "예약은 어떻게 하나요?", a: "전화(1588-1588) 또는 카카오톡 상담으로 원하시는 서비스와 방문 희망일을 알려주시면 빠르게 일정을 확정해 드립니다." },
    { q: "사용하는 세제는 안전한가요?", a: "인체에 무해한 친환경 인증 세제만 사용하고 있어 아이와 반려동물이 있는 가정에서도 안심하고 이용하실 수 있습니다." },
    { q: "정기 구독은 언제든 해지할 수 있나요?", a: "네, 위약금 없이 언제든 해지 가능합니다. 다음 방문일 3일 전까지 고객센터로 연락해 주시면 처리해 드립니다." },
    { q: "당일 예약도 가능한가요?", a: "지역과 일정에 따라 당일 예약이 가능할 수 있습니다. 고객센터(1588-1588)로 문의해 주시면 바로 안내해 드립니다." },
    { q: "방문 케어는 얼마나 걸리나요?", a: "선택하신 패키지에 따라 평균 1~2시간 정도 소요되며, 정확한 소요 시간은 상담 시 안내해 드립니다." },
    { q: "이웃과 함께 신청하면 할인되나요?", a: "같은 아파트·단지에서 3세대 이상 동시 신청 시 세대당 월 5,000원이 할인됩니다." }
  ];

  function openFaqWindow(){
    var rows = FAQ_ITEMS.map(function(item){
      return '<div class="faq-item">' +
        '<button class="faq-q" onclick="this.parentElement.classList.toggle(\'open\')">' +
        '<span>' + item.q + '</span><span class="faq-arrow">›</span></button>' +
        '<div class="faq-a"><p>' + item.a + '</p></div></div>';
    }).join('');

    var html = '<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8" />' +
      '<title>자주 묻는 질문 | 루미엔케어</title><style>' +
      '*{box-sizing:border-box;}' +
      'body{margin:0;background:' + C.cream + ';font-family:\'Noto Sans KR\', sans-serif;color:' + C.brown + ';}' +
      '.wrap{max-width:560px;margin:0 auto;padding:48px 24px 80px;}' +
      '.top-label{font-size:12px;letter-spacing:.3em;color:' + C.tan + ';font-weight:700;text-transform:uppercase;}' +
      'h1{font-size:26px;margin:10px 0 32px;}' +
      '.faq-item{border-bottom:1px solid rgba(59,42,26,0.12);}' +
      '.faq-q{width:100%;text-align:left;background:none;border:none;padding:18px 0;font-size:15px;font-weight:600;color:' + C.brown + ';display:flex;justify-content:space-between;align-items:center;cursor:pointer;}' +
      '.faq-arrow{transition:transform .2s;color:' + C.tan + ';font-size:20px;}' +
      '.faq-item.open .faq-arrow{transform:rotate(90deg);}' +
      '.faq-a{max-height:0;overflow:hidden;transition:max-height .25s ease;}' +
      '.faq-item.open .faq-a{max-height:200px;}' +
      '.faq-a p{margin:0 0 18px;font-size:14px;line-height:1.7;color:' + C.mutedText + ';}' +
      '</style></head><body><div class="wrap"><span class="top-label">FAQ</span>' +
      '<h1>자주 묻는 질문</h1>' + rows + '</div></body></html>';

    var win = window.open("", "_blank", "width=520,height=760");
    if (win) { win.document.open(); win.document.write(html); win.document.close(); }
  }

  // ── CLEAN CASE 갤러리 ──
  // ★ 사진 추가 방법: images 폴더에 파일을 넣고, 아래 배열에 한 줄만 추가하면 됩니다.
  var CASE_GALLERY = [
    { src: "images/bathroom-main.jpg", label: "욕실 케어" },
    { src: "images/livingroom-main.jpg", label: "거실+방 케어" },
    { src: "images/aircon-main.jpg", label: "에어컨 케어" },
    { src: "images/예시1.jpg", label: "예시 케어" }
  ];

  function openCleanCaseGallery(){
    var cards = CASE_GALLERY.map(function(item){
      return '<div class="gal-card">' +
        '<img src="' + item.src + '" alt="' + item.label + '" />' +
        '<div class="gal-label">' + item.label + '</div>' +
        '</div>';
    }).join('');

    var html = '<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8" />' +
      '<title>클린 케이스 갤러리 | 루미엔케어</title><style>' +
      '*{box-sizing:border-box;}' +
      'body{margin:0;background:' + C.cream + ';font-family:\'Noto Sans KR\', sans-serif;color:' + C.brown + ';}' +
      '.wrap{max-width:1100px;margin:0 auto;padding:40px 24px 60px;}' +
      '.top-label{font-size:12px;letter-spacing:.3em;color:' + C.tan + ';font-weight:700;text-transform:uppercase;}' +
      'h1{font-size:26px;margin:10px 0 8px;}' +
      'p.sub{font-size:14px;color:' + C.mutedText + ';margin:0 0 28px;}' +
      '.gal-scroll{display:flex;flex-direction:column;gap:16px;overflow-y:auto;scroll-snap-type:y mandatory;max-height:70vh;padding-right:8px;}' +
      '.gal-card{flex:0 0 auto;scroll-snap-align:start;position:relative;border-radius:6px;overflow:hidden;background:#fff;box-shadow:0 4px 16px rgba(59,42,26,.10);}' +
'.gal-card img{width:100%;height:320px;object-fit:cover;display:block;}' +
      '.gal-label{padding:10px 12px;font-size:13px;font-weight:600;}' +
      '@media(max-width:800px){.gal-card img{height:240px;}}' +
      '.gal-nav{display:flex;justify-content:flex-end;gap:8px;margin-top:16px;}' +
      '.gal-btn{width:36px;height:36px;border-radius:50%;border:1px solid rgba(59,42,26,.2);background:#fff;cursor:pointer;font-size:16px;}' +
      '.gal-btn:hover{background:' + C.brown + ';color:#fff;}' +
      '</style></head><body><div class="wrap">' +
      '<span class="top-label">CLEAN CASE</span>' +
      '<h1>클린 케이스 갤러리</h1>' +
      '<p class="sub">전문가의 손길로 달라진 케어 사례들을 확인해 보세요.</p>' +
      '<div class="gal-scroll" id="galScroll">' + cards + '</div>' +
      '<div class="gal-nav">' +
      '<button class="gal-btn" id="galPrev">‹</button>' +
      '<button class="gal-btn" id="galNext">›</button>' +
      '</div>' +
      '</div>' +
      '<script>' +
      'var s=document.getElementById("galScroll");' +
      'document.getElementById("galPrev").onclick=function(){s.scrollBy({top:-340,behavior:"smooth"});};' +
'document.getElementById("galNext").onclick=function(){s.scrollBy({top:340,behavior:"smooth"});};' +
      '<\/script>' +
      '</body></html>';

    var win = window.open("", "_blank", "width=1000,height=720");
    if (win) { win.document.open(); win.document.write(html); win.document.close(); }
  }

  // ── 헤더 스크롤 상태 ──
  var header = document.getElementById('siteHeader');
  function onScroll(){
    if (window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // ── 모바일 메뉴 ──
  var mobileOpen = false;
  var mobileToggle = document.getElementById('mobileToggle');
  var mobilePanel = document.getElementById('mobilePanel');
  var iconMenu = document.getElementById('iconMenu');
  var iconClose = document.getElementById('iconClose');

  function setMobileOpen(open){
    mobileOpen = open;
    mobilePanel.classList.toggle('open', mobileOpen);
    iconMenu.style.display = mobileOpen ? 'none' : 'block';
    iconClose.style.display = mobileOpen ? 'block' : 'none';
  }
  mobileToggle.addEventListener('click', function(){ setMobileOpen(!mobileOpen); });

  // ── 부드러운 스크롤 이동 (nav / footer / hero 버튼 공용) ──
  function go(href){
    var target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  }
  document.querySelectorAll('[data-nav]').forEach(function(el){
    el.addEventListener('click', function(){ go(el.getAttribute('data-nav')); });
  });

  // ── FAQ 버튼 ──
  document.getElementById('footerFaqBtn').addEventListener('click', openFaqWindow);

  // ── CLEAN CASE 더보기 버튼 ──
  var cleanCaseMoreBtn = document.getElementById('cleanCaseMoreBtn');
  if (cleanCaseMoreBtn) cleanCaseMoreBtn.addEventListener('click', openCleanCaseGallery);

  // ── 후기 캐러셀 ──
  var REVIEWS_LEN = 3;
  var KAKAO = [
    {
      name: "최○○ 님", area: "경기 의정부시", date: "오후 2:14", service: "욕실 케어",
      messages: [
        { from: "customer", text: "안녕하세요! 저번에 욕실 청소 맡겼던 고객인데요~" },
        { from: "customer", text: "진짜 너무 깨끗해져서 깜짝 놀랐어요 ㅠㅠ 남편도 엄청 좋아하고요!" },
        { from: "biz", text: "감사합니다 고객님 😊 만족하셨다니 저희도 정말 기쁩니다!" },
        { from: "customer", text: "다음 달에도 꼭 예약할게요~ 이번엔 거실도 부탁드려도 될까요?" },
        { from: "biz", text: "물론이죠! 거실+방 패키지도 있으니 일정 맞춰 바로 안내드릴게요 📅" }
      ]
    },
    {
      name: "한○○ 님", area: "경기 양주시", date: "오전 10:52", service: "거실 + 방 케어",
      messages: [
        { from: "customer", text: "케어매니저님이 정말 꼼꼼하게 해주셨어요 👍" },
        { from: "customer", text: "바닥이랑 소파 사이 먼지까지 다 없애주셨더라고요. 완전 감동이었어요!" },
        { from: "biz", text: "세심하게 봐주셔서 감사해요 고객님 🙏 늘 최선을 다하겠습니다!" },
        { from: "customer", text: "주변에도 많이 추천할게요 ㅎㅎ 진짜 최고예요" },
        { from: "biz", text: "소중한 말씀 감사드립니다 😄 다음 방문도 기대해 주세요!" }
      ]
    },
    {
      name: "오○○ 님", area: "경기 남양주시", date: "오후 7:03", service: "화장실 + 거실 패키지",
      messages: [
        { from: "customer", text: "아이 있는 집인데 친환경 세제 쓴다고 하셔서 믿고 맡겼어요" },
        { from: "biz", text: "네! 저희는 아이·반려동물 가정도 안심하실 수 있는 세제만 사용합니다 🌿" },
        { from: "customer", text: "화장실이 이렇게 밝아질 수 있구나 싶었어요 ㅋㅋ 진짜 새집 같아요" },
        { from: "customer", text: "정기 구독 신청하려고요! 어떻게 하면 되나요?" },
        { from: "biz", text: "감사합니다! 카카오톡으로 날짜 알려주시면 바로 정기 일정 잡아드릴게요 😊" }
      ]
    }
  ];
  var TOTAL = REVIEWS_LEN + KAKAO.length;

  var reviewIdx = 0;
  var isReviewPaused = false;
  var reviewTimer = null;

  var reviewsGeneral = document.getElementById('reviewsGeneral');
  var reviewsKakao = document.getElementById('reviewsKakao');
  var reviewInner = document.getElementById('reviewInner');
  var tabGeneral = document.getElementById('tabGeneral');
  var tabKakao = document.getElementById('tabKakao');
  var reviewDots = document.getElementById('reviewDots');
  var kakaoMessagesEl = document.getElementById('kakaoMessages');
  var kakaoNameArea = document.getElementById('kakaoNameArea');
  var kakaoServiceTag = document.getElementById('kakaoServiceTag');
  var generalCards = Array.prototype.slice.call(reviewsGeneral.querySelectorAll('.review-card'));

  // 점(dot) 생성
  for (var i = 0; i < TOTAL; i++) {
    var dot = document.createElement('button');
    dot.className = 'review-dot';
    dot.setAttribute('data-idx', i);
    dot.addEventListener('click', (function(idx){ return function(){ setReviewIdx(idx); }; })(i));
    reviewDots.appendChild(dot);
  }
  var dotEls = Array.prototype.slice.call(reviewDots.querySelectorAll('.review-dot'));

  function renderKakaoMessage(msg, item, idx){
    var isBiz = msg.from === 'biz';
    var avatar = !isBiz ? '<div class="kakao-avatar">' + item.name.charAt(0) + '</div>' : '';
    var nameLabel = (!isBiz && idx === 0) ? ('<p class="kakao-msg-name">' + item.name + '</p>') : '';
    return '<div class="kakao-msg ' + (isBiz ? 'biz' : 'customer') + '">' +
      avatar +
      '<div class="kakao-msg-col">' + nameLabel +
      '<div class="kakao-msg-row">' +
      '<div class="kakao-bubble ' + (isBiz ? 'biz' : 'customer') + '">' + msg.text + '</div>' +
      '<span class="kakao-time">' + item.date + '</span>' +
      '</div></div></div>';
  }

  function renderReviewState(){
    var isKakao = reviewIdx >= REVIEWS_LEN;

    reviewsGeneral.style.display = isKakao ? 'none' : 'grid';
    reviewsKakao.style.display = isKakao ? 'flex' : 'none';

    tabGeneral.classList.toggle('active', !isKakao);
    tabKakao.classList.toggle('active', isKakao);

    if (!isKakao) {
      generalCards.forEach(function(card){
        var idx = parseInt(card.getAttribute('data-idx'), 10);
        card.classList.toggle('current', idx === reviewIdx);
      });
    } else {
      var item = KAKAO[reviewIdx - REVIEWS_LEN];
      kakaoNameArea.textContent = item.name + ' · ' + item.area;
      kakaoServiceTag.textContent = item.service;
      kakaoMessagesEl.innerHTML = item.messages.map(function(m, mi){ return renderKakaoMessage(m, item, mi); }).join('');
    }

    dotEls.forEach(function(d, i){
      d.classList.toggle('active', i === reviewIdx);
      d.classList.toggle('kakao-active', i === reviewIdx && i >= REVIEWS_LEN);
    });

    // 슬라이드 인 애니메이션 재실행
    reviewInner.classList.remove('review-slide-in');
    void reviewInner.offsetWidth;
    reviewInner.classList.add('review-slide-in');
  }

  function restartTimer(){
    if (reviewTimer) clearInterval(reviewTimer);
    if (isReviewPaused) return;
    reviewTimer = setInterval(function(){
      reviewIdx = (reviewIdx + 1) % TOTAL;
      renderReviewState();
    }, 4500);
  }

  function setReviewIdx(idx){
    reviewIdx = ((idx % TOTAL) + TOTAL) % TOTAL;
    renderReviewState();
    restartTimer();
  }

  tabGeneral.addEventListener('click', function(){ setReviewIdx(0); });
  tabKakao.addEventListener('click', function(){ setReviewIdx(REVIEWS_LEN); });
  document.getElementById('reviewPrev').addEventListener('click', function(){ setReviewIdx(reviewIdx - 1); });
  document.getElementById('reviewNext').addEventListener('click', function(){ setReviewIdx(reviewIdx + 1); });

  var reviewsSection = document.getElementById('reviews');
  reviewsSection.addEventListener('mouseenter', function(){ isReviewPaused = true; if (reviewTimer) clearInterval(reviewTimer); });
  reviewsSection.addEventListener('mouseleave', function(){ isReviewPaused = false; restartTimer(); });

  renderReviewState();
  restartTimer();

})();
