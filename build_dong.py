#!/usr/bin/env python3
"""Phase 3: 동 단위 랜딩 21개 생성 (템플릿: jeonggi/yangju/index.html)"""
import os
import re

REPO = os.path.dirname(os.path.abspath(__file__))
PHONE = "1661-2816"
VERIFICATION = "5df7fd75e60b5e1aa9d881faca8c47d7a6a31694"


def get_reviews(region_slug):
    """지역 허브 HTML에서 후기 (본문, 출처) 추출"""
    p = os.path.join(REPO, "jeonggi", region_slug, "index.html")
    src = open(p, encoding="utf-8").read()
    out = []
    for m in re.finditer(
        r'<div class="lc-review">\s*<p>(.*?)</p>\s*<p class="src">(.*?)</p>',
        src, re.S):
        out.append((m.group(1).strip(), m.group(2).strip()))
    return out


HEAD_STYLE = """<style>
.lc-wrap{max-width:72rem;margin:0 auto;padding:0 1.25rem}
.lc-hero{background:var(--cream-dark);padding:4.5rem 0 3.5rem;margin-top:0}
.lc-crumb{font-size:.85rem;color:var(--muted-text);margin-bottom:1rem}
.lc-crumb a{color:var(--muted-text);text-decoration:none}
.lc-crumb a:hover{color:var(--tan)}
.lc-h1{font-family:var(--font-serif);font-weight:700;color:var(--brown);font-size:clamp(2rem,4.5vw,3rem);line-height:1.25;margin-bottom:1.25rem}
.lc-lead{font-size:1.02rem;line-height:1.85;color:#4a3d2e;max-width:46rem;margin-bottom:1rem}
.lc-cta-row{display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.75rem}
.lc-btn{display:inline-flex;align-items:center;gap:.5rem;padding:.9rem 1.6rem;border-radius:3px;font-weight:600;font-size:.95rem;text-decoration:none}
.lc-btn-primary{background:var(--tan);color:#fff}
.lc-btn-primary:hover{opacity:.9}
.lc-btn-outline{border:1px solid var(--tan);color:var(--brown);background:#fff}
.lc-section{padding:3.25rem 0}
.lc-section.alt{background:var(--cream)}
.lc-h2{font-family:var(--font-serif);font-weight:700;color:var(--brown);font-size:1.6rem;margin-bottom:.6rem}
.lc-sub{color:var(--muted-text);margin-bottom:2rem;line-height:1.7;font-size:.96rem}
.lc-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem}
.lc-grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem}
@media(max-width:768px){.lc-grid3{grid-template-columns:1fr}.lc-grid2{grid-template-columns:1fr}}
.lc-card{background:#fff;border:1px solid var(--muted);border-radius:6px;overflow:hidden}
.lc-card img{width:100%;height:220px;object-fit:cover;display:block}
.lc-card-body{padding:1.1rem 1.25rem}
.lc-card-body h3{color:var(--brown);font-weight:700;margin-bottom:.4rem;font-size:1rem}
.lc-card-body p{font-size:.92rem;line-height:1.7;color:#4a3d2e}
.lc-factor{background:#fff;border:1px solid var(--muted);border-radius:6px;padding:1.4rem}
.lc-factor h3{color:var(--brown);font-weight:700;margin-bottom:.5rem;font-size:1rem}
.lc-factor p{font-size:.93rem;line-height:1.7;color:#4a3d2e}
.lc-faq details{background:#fff;border:1px solid var(--muted);border-radius:6px;margin-bottom:.75rem}
.lc-faq summary{padding:1.05rem 1.25rem;cursor:pointer;font-weight:600;color:var(--brown);font-size:.96rem;list-style:none}
.lc-faq summary::-webkit-details-marker{display:none}
.lc-faq summary::after{content:'+';float:right;color:var(--tan);font-weight:700;font-size:1.1rem}
.lc-faq details[open] summary::after{content:'-'}
.lc-faq .a{padding:0 1.25rem 1.25rem;font-size:.93rem;line-height:1.75;color:#4a3d2e}
.lc-links{display:flex;flex-wrap:wrap;gap:.6rem}
.lc-links a{border:1px solid var(--tan);color:var(--brown);padding:.65rem 1.15rem;border-radius:999px;font-size:.88rem;text-decoration:none;background:#fff}
.lc-links a:hover{background:var(--cream-dark)}
.lc-cta{background:#221509;color:#fff;text-align:center;padding:3.5rem 1.5rem;border-radius:8px}
.lc-cta h2{font-family:var(--font-serif);font-size:1.7rem;margin-bottom:.75rem}
.lc-cta p{opacity:.7;margin-bottom:1.6rem;line-height:1.7;font-size:.95rem}
.lc-review{background:#fff;border:1px solid var(--muted);border-left:4px solid var(--tan);border-radius:6px;padding:1.3rem 1.4rem;margin-bottom:1rem}
.lc-review p{font-size:.94rem;line-height:1.8;color:#4a3d2e}
.lc-review .src{margin-top:.7rem;font-size:.84rem;color:var(--muted-text)}
#lcMobilePanel{display:none}
#lcMobilePanel.open{display:block}
.lc-mnav-link{display:block;width:100%;text-align:left;padding:.8rem .25rem;color:var(--brown);font-weight:600;text-decoration:none;border-bottom:1px solid var(--muted)}
.site-header{position:sticky;top:0;background:rgba(250,247,242,.97);backdrop-filter:blur(12px);box-shadow:0 1px 0 rgba(59,42,26,.08)}
.site-header .logo-main{color:var(--brown)}
.site-header .logo-sub{color:var(--muted-text)}
.site-header .nav-link{color:var(--brown)}
.site-header .mobile-toggle{color:var(--brown)}
</style>"""

HEADER = """  <header class="site-header" id="siteHeader">
    <div class="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between h-16 lg:h-20">
      <a href="/" class="text-left" style="text-decoration:none" aria-label="루미엔케어 홈">
        <div class="logo-main text-xl lg:text-[1.6rem] font-semibold">Lumien<span style="color:var(--tan)">Care</span></div>
        <p class="logo-sub">루미엔케어</p>
      </a>
      <nav class="hidden lg:flex items-center gap-8" aria-label="주 메뉴">
        <a class="nav-link" href="/jeonggi/">정기청소</a>
        <a class="nav-link" href="/jeonggi/samulsil/">사무실</a>
        <a class="nav-link" href="/jeonggi/byeongwon/">병원</a>
        <a class="nav-link" href="/jeonggi/sangga/">상가</a>
        <a class="nav-link" href="/jeonggi/hagwon/">학원</a>
      </nav>
      <div class="hidden lg:flex items-center gap-3">
        <a href="tel:1661-2816" class="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 text-white rounded-[3px]" style="background:var(--tan);text-decoration:none">&#9742; 상담&middot;예약 1661-2816</a>
      </div>
      <button class="lg:hidden mobile-toggle" id="lcMobileToggle" aria-label="메뉴 열기" style="font-weight:700;color:var(--brown)">메뉴</button>
    </div>
    <div class="mobile-panel" id="lcMobilePanel">
      <div class="px-5 py-4 flex flex-col gap-1">
        <a class="lc-mnav-link" href="/jeonggi/">정기청소</a>
        <a class="lc-mnav-link" href="/jeonggi/samulsil/">사무실</a>
        <a class="lc-mnav-link" href="/jeonggi/byeongwon/">병원</a>
        <a class="lc-mnav-link" href="/jeonggi/sangga/">상가</a>
        <a class="lc-mnav-link" href="/jeonggi/hagwon/">학원</a>
        <a href="tel:1661-2816" class="flex items-center justify-center gap-2 text-white py-3 text-sm font-semibold mt-3 rounded-[3px]" style="background:var(--tan);text-decoration:none">&#9742; 1661-2816</a>
      </div>
    </div>
  </header>"""

FOOTER_LINKS = [
    ("/jeonggi/", "정기청소"),
    ("/jeonggi/samulsil/", "사무실 정기청소"),
    ("/jeonggi/byeongwon/", "병원 정기청소"),
    ("/jeonggi/sangga/", "상가 정기청소"),
    ("/jeonggi/hagwon/", "학원 정기청소"),
    ("/jeonggi/samulsil/yangju/", "양주 사무실 정기청소"),
    ("/jeonggi/byeongwon/uijeongbu/", "의정부 병원 정기청소"),
    ("/jeonggi/yangju/", "양주 정기청소"),
    ("/jeonggi/namyangju/", "남양주 정기청소"),
    ("/jeonggi/uijeongbu/", "의정부 정기청소"),
    ("/jeonggi/guri/", "구리 정기청소"),
    ("/jeonggi/dongducheon/", "동두천 정기청소"),
    ("/jeonggi/dobong/", "도봉 정기청소"),
    ("/jeonggi/nowon/", "노원 정기청소"),
]

FOOTER = """  <footer style="background:#221509; color:rgba(255,255,255,0.55)">
    <div class="max-w-7xl mx-auto px-5 lg:px-10 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="col-span-2 lg:col-span-1">
        <div class="mb-4">
          <span class="text-xl font-semibold text-white font-brand" style="letter-spacing:.04em">Lumien<span style="color:var(--tan)">Care</span></span>
          <p class="text-xs tracking-widest mt-0.5" style="color:rgba(255,255,255,0.3)">루미엔케어</p>
        </div>
        <p class="text-xs leading-relaxed">전문가의 손길로 깨끗한 공간,<br />건강한 일상을 만듭니다.</p>
      </div>
      <div>
        <h5 class="font-semibold text-white/80 mb-4 text-sm">정기청소</h5>
        <ul class="space-y-2 text-xs">
{footer_links}
        </ul>
      </div>
      <div>
        <h5 class="font-semibold text-white/80 mb-4 text-sm">서비스</h5>
        <ul class="space-y-2 text-xs">
          <li><a class="footer-link" href="/">홈</a></li>
          <li><a class="footer-link" href="/jeonggi/">정기청소 안내</a></li>
          <li><a class="footer-link" href="/#services">에어컨 분해청소</a></li>
          <li><a class="footer-link" href="/#services">소파 청소</a></li>
        </ul>
      </div>
      <div>
        <h5 class="font-semibold text-white/80 mb-4 text-sm">고객센터</h5>
        <div class="space-y-1.5 text-xs">
          <p><a href="tel:1661-2816" class="text-white font-semibold" style="font-size:1.1rem;text-decoration:none">1661-2816</a></p>
          <p>상담 가능 시간에 전화 주시면<br />친절히 안내해 드립니다.</p>
        </div>
      </div>
    </div>
    <div class="border-t border-white/10">
      <div class="max-w-7xl mx-auto px-5 lg:px-10 py-5 flex flex-col lg:flex-row items-center justify-between gap-2 text-xs" style="color:rgba(255,255,255,0.3)">
        <p>&copy; 2025 루미엔케어 LumienCare. All rights reserved.</p>
      </div>
    </div>
  </footer>"""

COST_FACTORS = [
    ("면적", "평수와 층수, 화장실 개수에 따라 투입 인력과 작업 시간이 정해집니다."),
    ("방문 주기", "주 1회부터 주 5회까지. 사람이 많이 드나드는 공간일수록 짧은 주기가 유리하고, 회당 단가는 낮아집니다."),
    ("청소 범위", "바닥·화장실 기본 범위에 공용부·유리·창틀 등을 추가할 수 있습니다."),
    ("현장 상태", "첫 방문 시 묵은 때가 심하면 초기 정비 작업이 추가될 수 있습니다."),
]

# ── 동 데이터: (region_slug, region_name, dong_slug, dong_name, desc, intro[2], areas, nearby, photos[3], extra_faq(q,a)) ──
DONGS = [
    # 양주
    ("yangju", "양주", "okjeongdong", "옥정동",
     "옥정동 정기청소 전문 루미엔케어. 옥정신도시 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["옥정신도시의 중심, 옥정동. 대단지 아파트와 함께 단지 내 상가, 학원, 병의원이 밀집해 있어 정기청소 수요가 꾸준한 지역입니다.",
      "루미엔케어는 옥정동 일대 사무실·병원·상가·학원에 직접 방문해 정해진 주기로 꾸준히 관리합니다. 첫 방문 전 현장 실사로 범위·주기·금액을 확정합니다."],
     "옥정동 전역(옥정신도시·율정마을 일대)을 방문합니다.",
     "인근인 고읍동·덕정동·회천동도 함께 방문합니다.",
     ["/images/현장/office1.jpg", "/images/현장/office2.jpg", "/images/현장/office3.jpg"],
     ("아파트 단지 내 상가도 정기청소 되나요?",
      "네, 옥정동 단지 내 상가는 루미엔케어의 주요 방문처입니다. 오픈 전이나 마감 후 시간대에 방문해 영업에 지장이 없게 관리합니다.")),
    ("yangju", "양주", "goeupdong", "고읍동",
     "고읍동 정기청소 전문 루미엔케어. 고읍지구 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["고읍지구 택지개발로 조성된 고읍동. 신축 상가와 오피스텔, 학원가가 함께 들어서면서 정기청소 문의가 늘고 있는 지역입니다.",
      "루미엔케어는 고읍동 일대에 직접 방문해 정해진 주기로 꾸준히 관리합니다. 새 건물일수록 초기부터 잡아두면 묵은 때 없이 깨끗함을 유지할 수 있습니다."],
     "고읍동 전역(고읍지구 일대)을 방문합니다.",
     "인근인 옥정동·덕정동·남면 일대도 함께 방문합니다.",
     ["/images/현장/office4.jpg", "/images/현장/office5.jpg", "/images/현장/office6.jpg"],
     ("신축 건물이라 입주 전 대청소도 가능한가요?",
      "네, 입주 전 묵은 때와 공사 잔재를 정리하는 초기 정비 후 정기청소로 전환하는 방식을 권장합니다.")),
    ("yangju", "양주", "deokjeongdong", "덕정동",
     "덕정동 정기청소 전문 루미엔케어. 덕정역 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["덕정역 역세권을 중심으로 상권이 형성된 덕정동. 역 주변 상가와 오피스텔, 학원이 밀집해 유동인구가 많은 지역입니다.",
      "루미엔케어는 덕정동 일대에 직접 방문해 영업·진료·수업에 지장이 없는 시간대에 꾸준히 관리합니다."],
     "덕정동 전역(덕정역 일대)을 방문합니다.",
     "인근인 옥정동·고읍동·회천동도 함께 방문합니다.",
     ["/images/현장/office7.jpg", "/images/현장/office8.jpg", "/images/현장/office9.jpg"],
     ("역세권이라 주차가 어려운데 괜찮나요?",
      "네, 방문 시간대를 조율하고 주차 위치는 실사 때 함께 확인합니다.")),
    # 남양주
    ("namyangju", "남양주", "dasandong", "다산동",
     "다산동 정기청소 전문 루미엔케어. 다산신도시 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["다산신도시의 중심, 다산동. 새로 문을 여는 병원·학원·상가가 많아 개원·개업 초기부터 정기청소를 잡아두려는 문의가 많은 지역입니다.",
      "루미엔케어는 다산동 일대에 직접 방문해 정해진 주기로 꾸준히 관리합니다. 첫 방문 전 현장 실사로 범위·주기·금액을 확정합니다."],
     "다산동 전역(다산신도시 일대)을 방문합니다.",
     "인근인 별내동·호평동·도농동도 함께 방문합니다.",
     ["/images/현장/hospital1-1.jpg", "/images/현장/hospital1-2.jpg", "/images/현장/hospital1-3.jpg"],
     ("신도시 상가 오픈 전 대청소도 가능한가요?",
      "네, 오픈 전 초기 정비 후 정기청소로 전환하는 방식을 권장합니다. 오픈 일정에 맞춰 일정을 잡아드립니다.")),
    ("namyangju", "남양주", "byeollaedong", "별내동",
     "별내동 정기청소 전문 루미엔케어. 별내신도시 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["별내신도시 별내동. 카페거리와 상업시설이 발달해 매장 정기청소 수요가 많은 지역입니다.",
      "루미엔케어는 별내동 일대 매장·사무실·학원에 직접 방문해 오픈 전이나 마감 후 등 영업에 지장이 없는 시간대에 꾸준히 관리합니다."],
     "별내동 전역(별내신도시·카페거리 일대)을 방문합니다.",
     "인근인 다산동·퇴계원읍 일대도 함께 방문합니다.",
     ["/images/현장/hospital1-4.jpg", "/images/현장/hospital1-5.jpg", "/images/현장/hospital1-6.jpg"],
     ("카페거리 매장인데 영업 시간 조율이 가능한가요?",
      "네, 오픈 전 이른 아침이나 마감 후 방문으로 영업에 지장이 없게 일정을 잡습니다.")),
    ("namyangju", "남양주", "hopyeongdong", "호평동",
     "호평동 정기청소 전문 루미엔케어. 호평지구 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["호평지구 호평동. 주거지와 상업시설이 함께 있는 지역으로 학원과 병의원의 정기청소 문의가 꾸준합니다.",
      "루미엔케어는 호평동 일대에 직접 방문해 수업·진료에 지장이 없는 시간대에 꾸준히 관리합니다."],
     "호평동 전역(호평지구 일대)을 방문합니다.",
     "인근인 다산동·평내동 일대도 함께 방문합니다.",
     ["/images/현장/hospital1-7.jpg", "/images/현장/hospital1-8.jpg", "/images/현장/hospital1-9.jpg"],
     ("주말 방문도 가능한가요?",
      "네, 평일이 어려우시면 주말 방문도 협의 가능합니다. 전화로 편한 시간을 말씀해 주세요.")),
    # 의정부
    ("uijeongbu", "의정부", "ganeungdong", "가능동",
     "가능동 정기청소 전문 루미엔케어. 가능역 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["가능역 일대 구시가지, 가능동. 오래된 상가와 병의원이 많아 묵은 때 관리와 정기적인 유지가 중요한 지역입니다.",
      "루미엔케어는 가능동 일대에 직접 방문해 정해진 주기로 꾸준히 관리합니다. 오래된 건물일수록 정기 관리의 효과가 큽니다."],
     "가능동 전역(가능역 일대)을 방문합니다.",
     "인근인 의정부동·녹양동·송산동도 함께 방문합니다.",
     ["/images/현장/office10.jpg", "/images/현장/office11.jpg", "/images/현장/office12.jpg"],
     ("구시가지 오래된 건물도 정기청소 가능한가요?",
      "네, 오히려 정기 관리가 더 중요합니다. 첫 방문 시 묵은 때 상태를 확인하고 초기 정비가 필요하면 안내해 드립니다.")),
    ("uijeongbu", "의정부", "songsandong", "송산동",
     "송산동 정기청소 전문 루미엔케어. 송산지구 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["송산지구 송산동. 신축 아파트와 상가가 들어서면서 새로 문을 여는 매장과 병의원이 늘고 있는 지역입니다.",
      "루미엔케어는 송산동 일대에 직접 방문해 정해진 주기로 꾸준히 관리합니다. 개원·개업 초기부터 잡아두면 깨끗함을 오래 유지할 수 있습니다."],
     "송산동 전역(송산지구 일대)을 방문합니다.",
     "인근인 가능동·자금동 일대도 함께 방문합니다.",
     ["/images/현장/hospital1-10.jpg", "/images/현장/hospital1-11.jpg", "/images/현장/hospital1-1.jpg"],
     ("새로 개원하는 병원인데 오픈 전 청소도 되나요?",
      "네, 개원 전 초기 정비 후 정기청소로 전환하는 방식을 권장합니다. 개원 일정에 맞춰 잡아드립니다.")),
    ("uijeongbu", "의정부", "nogyangdong", "녹양동",
     "녹양동 정기청소 전문 루미엔케어. 녹양역 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["녹양역 일대 녹양동. 역세권 상가와 오피스텔이 밀집한 지역으로 정기청소 수요가 꾸준합니다.",
      "루미엔케어는 녹양동 일대에 직접 방문해 영업·업무에 지장이 없는 시간대에 꾸준히 관리합니다."],
     "녹양동 전역(녹양역 일대)을 방문합니다.",
     "인근인 가능동·의정부동 일대도 함께 방문합니다.",
     ["/images/현장/cloth1.jpg", "/images/현장/cloth2.jpg", "/images/현장/cloth3.jpg"],
     ("방문 요일을 고정할 수 있나요?",
      "네, 희망 요일을 말씀해 주시면 인근 지역 방문 동선에 맞춰 고정 요일로 잡아드립니다.")),
    # 구리
    ("guri", "구리", "gyomundong", "교문동",
     "교문동 정기청소 전문 루미엔케어. 교문사거리 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["교문사거리 일대 교문동. 구리역과 가까워 유동인구가 많은 1층 매장이 많은 지역입니다.",
      "루미엔케어는 교문동 일대 매장에 직접 방문해 오픈 전이나 마감 후에 꾸준히 관리합니다. 유리 파사드와 바닥을 우선 관리합니다."],
     "교문동 전역(교문사거리 일대)을 방문합니다.",
     "인근인 수택동·인창동·교문동 일대와 구리역 주변도 함께 방문합니다.",
     ["/images/현장/office1.jpg", "/images/현장/office4.jpg", "/images/현장/office7.jpg"],
     ("1층 매장이라 유리 손자국이 심한데 주 몇 회가 좋을까요?",
      "유동인구가 많은 1층 매장은 주 3회 이상을 권장합니다. 유리 파사드는 매 방문 우선 관리합니다.")),
    ("guri", "구리", "sutaekdong", "수택동",
     "수택동 정기청소 전문 루미엔케어. 수택지구 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["수택지구 수택동. 주거 밀집 지역으로 동네 상가와 학원, 병의원의 정기청소 문의가 많은 지역입니다.",
      "루미엔케어는 수택동 일대에 직접 방문해 정해진 주기로 꾸준히 관리합니다. 동네 상권이라 단골 관리하듯 매번 같은 품질로 찾아갑니다."],
     "수택동 전역(수택지구 일대)을 방문합니다.",
     "인근인 교문동·인창동 일대도 함께 방문합니다.",
     ["/images/현장/hospital1-2.jpg", "/images/현장/hospital1-5.jpg", "/images/현장/hospital1-8.jpg"],
     ("동네 작은 상가도 정기청소 해주나요?",
      "네, 규모와 상관없이 정기 방문합니다. 작은 매장일수록 짧은 시간에 핵심만 관리하는 방식으로 견적을 맞춥니다.")),
    ("guri", "구리", "inchangdong", "인창동",
     "인창동 정기청소 전문 루미엔케어. 인창지구 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["인창지구 인창동. 학원이 밀집한 지역으로 수업 없는 시간대 방문이 핵심인 곳입니다.",
      "루미엔케어는 인창동 일대 학원에 직접 방문해 수업 시간표를 공유받아 수업이 없는 시간대에 꾸준히 관리합니다."],
     "인창동 전역(인창지구 일대)을 방문합니다.",
     "인근인 수택동·교문동 일대도 함께 방문합니다.",
     ["/images/현장/institute1-2.jpg", "/images/현장/institute1-3.jpg", "/images/현장/office9.jpg"],
     ("학원이 많아서 수업 시간 조율이 중요한데 가능한가요?",
      "네, 학원 시간표를 공유해 주시면 수업이 없는 시간대로 방문 일정을 고정합니다.")),
    # 동두천
    ("dongducheon", "동두천", "saengyeondong", "생연동",
     "생연동 정기청소 전문 루미엔케어. 동두천 중심가 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["동두천의 중심 상권, 생연동. 상가와 사무실이 밀집한 지역으로 정기청소 업체를 찾기 어려워 인근까지 알아보시는 분들이 많습니다.",
      "루미엔케어는 생연동 일대에 직접 방문해 정해진 주기로 꾸준히 관리합니다. 인근 지역과 묶어 방문 동선을 짜기 때문에 일정 조율이 수월합니다."],
     "생연동 전역(동두천 중심가 일대)을 방문합니다.",
     "인근인 보산동·불현동·송내동도 함께 방문합니다.",
     ["/images/현장/office2.jpg", "/images/현장/office5.jpg", "/images/현장/office8.jpg"],
     ("중심가라 차량 진입이 어려운데 괜찮나요?",
      "네, 방문 시간대를 조율하고 주차 위치는 실사 때 함께 확인합니다.")),
    ("dongducheon", "동두천", "bosandong", "보산동",
     "보산동 정기청소 전문 루미엔케어. 보산역 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["보산역 일대 보산동. 외국인 방문이 많은 상권 특성상 매장 청결 관리가 특히 중요한 지역입니다.",
      "루미엔케어는 보산동 일대 매장에 직접 방문해 오픈 전이나 마감 후에 꾸준히 관리합니다."],
     "보산동 전역(보산역 일대)을 방문합니다.",
     "인근인 생연동·송내동 일대도 함께 방문합니다.",
     ["/images/현장/hospital1-3.jpg", "/images/현장/hospital1-6.jpg", "/images/현장/hospital1-9.jpg"],
     ("외국인 손님이 많은 매장인데 특별히 신경 써주나요?",
      "네, 첫인상을 좌우하는 입구·유리·화장실을 우선 관리합니다. 손님이 많은 시간대는 피해 방문합니다.")),
    # 도봉구
    ("dobong", "도봉", "changdong", "창동",
     "창동 정기청소 전문 루미엔케어. 창동역 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["창동역(1·4호선) 일대 창동. 환승역세권이라 오피스텔과 상가가 밀집한 지역입니다.",
      "루미엔케어는 서울 도봉구 창동 일대에 직접 방문해 업무·영업에 지장이 없는 시간대에 꾸준히 관리합니다."],
     "창동 전역(창동역 일대)을 방문합니다.",
     "인근인 쌍문동·방학동·노원구 상계동도 함께 방문합니다.",
     ["/images/현장/institute1-1.jpg", "/images/현장/office3.jpg", "/images/현장/office6.jpg"],
     ("역세권 오피스텔 청소도 되나요?",
      "네, 오피스텔 내 사무실·상가 공간의 정기청소를 진행합니다. 관리실과 방문 시간을 조율합니다.")),
    ("dobong", "도봉", "ssangmundong", "쌍문동",
     "쌍문동 정기청소 전문 루미엔케어. 쌍문역 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["쌍문역(4호선) 일대 쌍문동. 주택가와 골목 상권이 어우러진 지역으로 동네 병의원과 학원의 문의가 꾸준합니다.",
      "루미엔케어는 서울 도봉구 쌍문동 일대에 직접 방문해 진료·수업에 지장이 없는 시간대에 꾸준히 관리합니다."],
     "쌍문동 전역(쌍문역 일대)을 방문합니다.",
     "인근인 창동·방학동 일대도 함께 방문합니다.",
     ["/images/현장/health1.jpg", "/images/현장/health2.jpg", "/images/현장/health4.jpg"],
     ("주택가 골목 상가도 방문하나요?",
      "네, 골목 상권도 정기 방문합니다. 주차 위치는 실사 때 함께 확인합니다.")),
    ("dobong", "도봉", "banghakdong", "방학동",
     "방학동 정기청소 전문 루미엔케어. 방학역 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["방학역(1호선) 일대 방학동. 도봉산과 가까워 외곽으로 느껴지지만 정기 방문이 가능한 지역입니다.",
      "루미엔케어는 서울 도봉구 방학동 일대에 직접 방문해 정해진 주기로 꾸준히 관리합니다."],
     "방학동 전역(방학역 일대)을 방문합니다.",
     "인근인 쌍문동·창동·도봉동 일대도 함께 방문합니다.",
     ["/images/현장/office10.jpg", "/images/현장/hospital1-10.jpg", "/images/현장/cloth1.jpg"],
     ("방학역 일대 외곽 지역도 정기 방문이 되나요?",
      "네, 방학동 전역(방학역 일대)을 정해진 주기로 정기 방문합니다. 인근 쌍문동·창동 일대도 함께 방문합니다.")),
    # 노원구
    ("nowon", "노원", "sanggyedong", "상계동",
     "상계동 정기청소 전문 루미엔케어. 상계역 일대 대단지 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["상계역 일대 대단지, 상계동. 아파트 단지 내 상가와 학원, 병의원이 밀집한 지역입니다.",
      "루미엔케어는 서울 노원구 상계동 일대에 직접 방문해 정해진 주기로 꾸준히 관리합니다."],
     "상계동 전역(상계역·노원역 일대)을 방문합니다.",
     "인근인 중계동·하계동·도봉구 창동도 함께 방문합니다.",
     ["/images/현장/office1.jpg", "/images/현장/hospital1-1.jpg", "/images/현장/institute1-4.jpg"],
     ("대단지 아파트 상가 관리도 되나요?",
      "네, 단지 내 상가는 루미엔케어의 주요 방문처입니다. 관리사무소와 방문 시간을 조율합니다.")),
    ("nowon", "노원", "junggyedong", "중계동",
     "중계동 정기청소 전문 루미엔케어. 은행사거리 학원가 일대 학원·사무실·상가를 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["은행사거리 학원가로 유명한 중계동. 학원이 밀집해 수업 없는 시간대 방문이 핵심인 지역입니다.",
      "루미엔케어는 서울 노원구 중계동 일대 학원에 직접 방문해 학원 시간표를 공유받아 수업이 없는 시간대에 꾸준히 관리합니다."],
     "중계동 전역(은행사거리 일대)을 방문합니다.",
     "인근인 상계동·하계동 일대도 함께 방문합니다.",
     ["/images/현장/institute1-2.jpg", "/images/현장/office9.jpg", "/images/현장/hospital1-4.jpg"],
     ("학원가라 수업 시간 조율이 중요한데 가능한가요?",
      "네, 학원 시간표를 공유해 주시면 수업이 없는 시간대로 방문 일정을 고정합니다.")),
    ("nowon", "노원", "hagyedong", "하계동",
     "하계동 정기청소 전문 루미엔케어. 하계역 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["하계역 일대 하계동. 주거지와 오피스텔이 함께 있는 지역으로 사무실과 병의원의 정기청소 문의가 꾸준합니다.",
      "루미엔케어는 서울 노원구 하계동 일대에 직접 방문해 업무·진료에 지장이 없는 시간대에 꾸준히 관리합니다."],
     "하계동 전역(하계역 일대)을 방문합니다.",
     "인근인 중계동·월계동·상계동도 함께 방문합니다.",
     ["/images/현장/hospital1-7.jpg", "/images/현장/office11.jpg", "/images/현장/cloth2.jpg"],
     ("오피스텔 내 사무실도 정기청소 되나요?",
      "네, 오피스텔 내 사무 공간의 정기청소를 진행합니다. 출입과 방문 시간을 사전에 조율합니다.")),
    ("nowon", "노원", "wolgyedong", "월계동",
     "월계동 정기청소 전문 루미엔케어. 월계역·광운대역 일대 사무실·병원·상가·학원을 정기 방문 관리합니다. 무료 상담 1661-2816.",
     ["월계역·광운대역 일대 월계동. 대학가와 주거지가 어우러진 지역으로 소규모 사무실과 상가의 문의가 많습니다.",
      "루미엔케어는 서울 노원구 월계동 일대에 직접 방문해 정해진 주기로 꾸준히 관리합니다."],
     "월계동 전역(월계역·광운대역 일대)을 방문합니다.",
     "인근인 하계동·중계동·성북구 석관동도 함께 방문합니다.",
     ["/images/현장/office12.jpg", "/images/현장/hospital1-11.jpg", "/images/현장/cloth3.jpg"],
     ("소규모 사무실도 정기청소 해주나요?",
      "네, 규모와 상관없이 정기 방문합니다. 작은 공간일수록 핵심만 관리하는 방식으로 견적을 맞춥니다.")),
]
