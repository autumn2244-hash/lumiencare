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
    { q: "정기 구독은 언제든 해지할 수 있나요?", a: "의무 사용 기간 6개월 이용 후, 언제든 해지 가능합니다." },
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
  ];

 // ── CLEAN CASE 갤러리 (세로 스크롤 버전 - 안정화) ──
function openCleanCaseGallery() {
  var cards = CASE_GALLERY.map(function(item) {
    return `
      <div class="gal-card">
        <div class="gal-img-wrapper">
          <img src="${item.src}" alt="${item.label}" />
        </div>
        <div class="gal-label">${item.label}</div>
      </div>
    `;
  }).join('');

  var html = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>클린 케이스 갤러리 | 루미엔케어</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: ${C.cream};
      font-family: 'Noto Sans KR', sans-serif;
      color: ${C.brown};
    }
    .wrap {
      max-width: 1100px;
      margin: 0 auto;
      padding: 40px 24px 80px;
    }
    .top-label {
      font-size: 12px;
      letter-spacing: .3em;
      color: ${C.tan};
      font-weight: 700;
      text-transform: uppercase;
    }
    h1 { font-size: 26px; margin: 10px 0 8px; }
    p.sub { 
      font-size: 14px; 
      color: ${C.mutedText}; 
      margin-bottom: 32px; 
    }
    
    /* 세로 스크롤 영역 */
 .gal-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
    }
    @media (max-width: 900px) {
      .gal-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .gal-grid { grid-template-columns: 1fr; }
      .wrap { padding: 32px 20px 80px; }
    }

    .gal-card {
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(59,42,26,0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .gal-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 14px 34px rgba(59,42,26,0.16);
    }
    .gal-img-wrapper {
      overflow: hidden;
      background: ${C.creamDark};
    }
    .gal-img-wrapper img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.5s ease;
    }
    .gal-card:hover .gal-img-wrapper img {
      transform: scale(1.04);
    }
    .gal-label {
      padding: 16px 20px;
      font-size: 15px;
      font-weight: 600;
      border-top: 1px solid rgba(59,42,26,0.06);
    }

  </style>
</head>
<body>
  <div class="wrap">
    <span class="top-label">CLEAN CASE</span>
    <h1>클린 케이스 갤러리</h1>
    <p class="sub">전문가의 손길로 달라진 케어 사례들을 확인해 보세요.</p>
    
    <div class="gal-grid">
  ${cards}
</div>

</body>
</html>`;

  var win = window.open("", "_blank", "width=1080,height=820");
  if (win) {
    win.document.open();
    win.document.write(html);
    win.document.close();
  } else {
    alert("팝업이 차단되었습니다. 팝업 차단을 해제해 주세요.");
  }
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

  // ── 후기 캐러셀 (일반 후기 + 카카오톡 후기를 하나의 트랙으로 연결) ──
  // ★ 카카오톡 후기 사진 추가 방법: images/카카오톡 폴더에 파일을 넣고,
  //    아래 배열에 실제 파일명으로 한 줄씩 추가/수정하면 됩니다.
  var KAKAO_PHOTOS = [
    { src: "images/카카오톡/KakaoTalk_20260712_194431767.png", alt: "카카오톡 후기 1" },
    { src: "images/카카오톡/KakaoTalk_20260712_194431767_01.png", alt: "카카오톡 후기 2" },
    { src: "images/카카오톡/KakaoTalk_20260712_195704897.png", alt: "카카오톡 후기 3" },
    { src: "images/카카오톡/KakaoTalk_20260712_194431767_02.png", alt: "카카오톡 후기 4" },
    { src: "images/카카오톡/KakaoTalk_20260712_195704897_01.png", alt: "카카오톡 후기 5" },
    { src: "images/카카오톡/KakaoTalk_20260712_195704897_02.png", alt: "카카오톡 후기 6" },
    { src: "images/카카오톡/KakaoTalk_20260712_194431767_03.png", alt: "카카오톡 후기 7" },
    { src: "images/카카오톡/KakaoTalk_20260712_194431767_04.png", alt: "카카오톡 후기 8" },
    { src: "images/카카오톡/KakaoTalk_20260712_195704897_03.png", alt: "카카오톡 후기 9" },
    { src: "images/카카오톡/KakaoTalk_20260712_194431767_05.png", alt: "카카오톡 후기 10" },
    { src: "images/카카오톡/KakaoTalk_20260712_195704897_04.png", alt: "카카오톡 후기 11" },
    { src: "images/카카오톡/KakaoTalk_20260712_194431767_06.png", alt: "카카오톡 후기 12" },
    { src: "images/카카오톡/KakaoTalk_20260712_194431767_07.png", alt: "카카오톡 후기 13" },
    { src: "images/카카오톡/KakaoTalk_20260712_195704897_05.png", alt: "카카오톡 후기 14" },
    { src: "images/카카오톡/KakaoTalk_20260712_194431767_08.png", alt: "카카오톡 후기 15" },
    { src: "images/카카오톡/KakaoTalk_20260712_194431767_09.png", alt: "카카오톡 후기 16" },
    { src: "images/카카오톡/KakaoTalk_20260712_195704897_06.png", alt: "카카오톡 후기 17" }
  ];

  var reviewTrack = document.getElementById('reviewTrack');
  var tabGeneral = document.getElementById('tabGeneral');
  var tabKakao = document.getElementById('tabKakao');
  var reviewDots = document.getElementById('reviewDots');
  var reviewsSection = document.getElementById('reviews');

  var GENERAL_COUNT = reviewTrack.querySelectorAll('.review-card').length; // 3

  // 카카오톡 사진 카드를 트랙 맨 뒤에 이어붙임 (최초 1회, 일반 후기 뒤로 자연스럽게 연결)
  KAKAO_PHOTOS.forEach(function(p){
    var card = document.createElement('div');
    card.className = 'kakao-photo-card';
    card.innerHTML = '<img src="' + p.src + '" alt="' + p.alt + '" loading="lazy" />';
    reviewTrack.appendChild(card);
  });

  var KAKAO_COUNT = KAKAO_PHOTOS.length;
  var TOTAL_COUNT = GENERAL_COUNT + KAKAO_COUNT;

  var currentPage = 0;
  var autoTimer = null;
  var resumeTimer = null;
  var isInteracting = false;

  function isMobile(){ return window.innerWidth < 1024; }
  function itemsPerPage(){ return isMobile() ? 1 : 3; }
  function pageCount(){ return Math.max(1, Math.ceil(TOTAL_COUNT / itemsPerPage())); }
  function generalPageCount(){ return Math.max(1, Math.ceil(GENERAL_COUNT / itemsPerPage())); }
  function kakaoStartPage(){ return generalPageCount(); }

  function buildDots(){
    reviewDots.innerHTML = '';
    var count = pageCount();
    for (var i = 0; i < count; i++){
      var dot = document.createElement('button');
      dot.className = 'review-dot';
      dot.setAttribute('data-idx', i);
      dot.addEventListener('click', (function(idx){
        return function(){ goToPage(idx, true); };
      })(i));
      reviewDots.appendChild(dot);
    }
    updateUI();
  }

  function updateUI(){
    var dots = reviewDots.querySelectorAll('.review-dot');
    var isKakao = currentPage >= kakaoStartPage();
    dots.forEach(function(d, i){
      d.classList.toggle('active', i === currentPage);
      d.classList.toggle('kakao-active', isKakao && i === currentPage);
    });
    tabGeneral.classList.toggle('active', !isKakao);
    tabKakao.classList.toggle('active', isKakao);
  }

  function goToPage(pageIdx, userInitiated){
    var count = pageCount();
    currentPage = ((pageIdx % count) + count) % count;
    reviewTrack.scrollTo({ left: currentPage * reviewTrack.clientWidth, behavior: 'smooth' });
    updateUI();
    if (userInitiated) restartTimer();
  }

  function syncPageFromScroll(){
    if (!reviewTrack.clientWidth) return;
    var idx = Math.round(reviewTrack.scrollLeft / reviewTrack.clientWidth);
    currentPage = Math.max(0, Math.min(idx, pageCount() - 1));
    updateUI();
  }

  tabGeneral.addEventListener('click', function(){ goToPage(0, true); });
  tabKakao.addEventListener('click', function(){ goToPage(kakaoStartPage(), true); });
  document.getElementById('reviewPrev').addEventListener('click', function(){ goToPage(currentPage - 1, true); });
  document.getElementById('reviewNext').addEventListener('click', function(){ goToPage(currentPage + 1, true); });

  // 스크롤(터치 스와이프 포함) 위치에 맞춰 점(dot)·탭 상태 동기화
  var scrollSyncTimer = null;
  reviewTrack.addEventListener('scroll', function(){
    if (scrollSyncTimer) clearTimeout(scrollSyncTimer);
    scrollSyncTimer = setTimeout(syncPageFromScroll, 120);
  });

  // 자동 재생 (일정 시간마다 다음 페이지로 — 일반 후기 → 카카오톡 후기 순서로 자연스럽게 이어짐)
  function startTimer(){
    stopTimer();
    autoTimer = setInterval(function(){
      goToPage(currentPage + 1, false);
    }, 4500);
  }
  function stopTimer(){
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
  }
  function restartTimer(){
    if (!isInteracting) startTimer();
  }

  // 손으로 넘기는 중(터치/드래그)에는 자동재생 정지, 손을 떼면 잠시 후 재개
  function pauseForInteraction(){
    isInteracting = true;
    stopTimer();
    if (resumeTimer) clearTimeout(resumeTimer);
  }
  function resumeAfterInteraction(){
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(function(){
      isInteracting = false;
      startTimer();
    }, 2500);
  }
  reviewTrack.addEventListener('touchstart', pauseForInteraction, { passive: true });
  reviewTrack.addEventListener('touchend', resumeAfterInteraction, { passive: true });
  reviewTrack.addEventListener('mousedown', pauseForInteraction);
  reviewTrack.addEventListener('mouseup', resumeAfterInteraction);

  // PC에서는 리뷰 영역에 마우스를 올리면 자동재생 정지
  reviewsSection.addEventListener('mouseenter', function(){ isInteracting = true; stopTimer(); });
  reviewsSection.addEventListener('mouseleave', function(){ isInteracting = false; restartTimer(); });

  // 화면 크기가 PC ↔ 모바일 기준(1024px)을 넘나들 때 페이지 구성을 다시 계산
  var wasMobile = isMobile();
  window.addEventListener('resize', function(){
    if (isMobile() !== wasMobile){
      wasMobile = isMobile();
      buildDots();
      goToPage(0, false);
    }
  });

  buildDots();
  goToPage(0, false);
  startTimer();

})();
