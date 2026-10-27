#!/usr/bin/env python3
"""Phase 3 생성 실행: 동 페이지 21개 + 허브 하향 링크 + sitemap 36개"""
import os
import re
import html as htmlmod
from build_dong import DONGS, get_reviews, HEAD_STYLE, HEADER, FOOTER, FOOTER_LINKS, COST_FACTORS, REPO

PHONE = "1661-2816"
VERIFICATION = "5df7fd75e60b5e1aa9d881faca8c47d7a6a31694"


def esc(s):
    return htmlmod.escape(s, quote=True)


def render_page(region_slug, region_name, dong_slug, dong_name, desc, intro,
                areas, nearby, photos, reviews, extra_faq, siblings):
    path = f"/jeonggi/{region_slug}/{dong_slug}/"
    title = f"{dong_name} 정기청소 | 비용·견적 안내 | 루미엔케어"
    url = f"https://lumiencares.com{path}"

    def section_industry():
        cards = [
            (f'<a href="/jeonggi/samulsil/" style="color:var(--brown);text-decoration:none">{dong_name} 사무실 정기청소 &rarr;</a>',
             f"{dong_name} 사무실의 책상·탕비실·화장실을 업무 외 시간에 관리합니다. 업종별 범위와 비용 기준을 확인하세요."),
            (f'<a href="/jeonggi/byeongwon/" style="color:var(--brown);text-decoration:none">{dong_name} 병원 정기청소 &rarr;</a>',
             f"{dong_name} 병의원의 대기실·접수대·진료실을 진료 외 시간에 관리합니다. 원장님과 직접 소통합니다."),
            (f'<a href="/jeonggi/sangga/" style="color:var(--brown);text-decoration:none">{dong_name} 상가 정기청소 &rarr;</a>',
             f"{dong_name} 매장의 바닥·유리 파사드·화장실을 오픈 전이나 마감 후에 관리합니다."),
            (f'<a href="/jeonggi/hagwon/" style="color:var(--brown);text-decoration:none">{dong_name} 학원 정기청소 &rarr;</a>',
             f"{dong_name} 학원의 강의실·복도·화장실을 수업 없는 시간대에 관리합니다."),
        ]
        inner = "\n".join(
            f'      <div class="lc-factor">\n        <h3>{t}</h3>\n        <p>{c}</p>\n      </div>'
            for t, c in cards)
        return f"""  <section class="lc-section">
    <div class="lc-wrap">
      <h2 class="lc-h2">{dong_name} 업종별 정기청소 안내</h2>
      <p class="lc-sub">{dong_name}에서 운영 중인 공간의 업종을 선택하세요.</p>
      <div class="lc-grid2">
{inner}
      </div>
    </div>
  </section>"""

    def section_visit():
        cards = [
            ("방문 지역", areas),
            ("인근 동·지역", nearby),
            ("방문 시간대", "출근 전·점심시간·퇴근 후 중에서 공간의 운영 리듬에 맞춰 정합니다. 주말 방문도 협의 가능합니다."),
        ]
        inner = "\n".join(
            f'      <div class="lc-factor">\n        <h3>{t}</h3>\n        <p>{c}</p>\n      </div>'
            for t, c in cards)
        return f"""  <section class="lc-section alt">
    <div class="lc-wrap">
      <h2 class="lc-h2">{dong_name} 방문 안내</h2>
      <p class="lc-sub">{dong_name} 지역 방문 기준입니다.</p>
      <div class="lc-grid2">
{inner}
      </div>
    </div>
  </section>"""

    def section_cases():
        cards = "\n".join(
            f'''      <div class="lc-card">
        <img src="{p}" alt="{dong_name} 정기청소 현장 사진" loading="lazy" />
        <div class="lc-card-body"><p>{dong_name} 정기청소 현장 사진입니다.</p></div>
      </div>''' for p in photos)
        return f"""  <section class="lc-section alt">
    <div class="lc-wrap">
      <h2 class="lc-h2">{dong_name} 정기청소 현장 사진</h2>
      <p class="lc-sub">실제 방문한 현장의 청소 후 모습입니다.</p>
      <div class="lc-grid3">
{cards}
      </div>
    </div>
  </section>"""

    def section_reviews():
        items = "\n".join(
            f'''      <div class="lc-review">
        <p>{body}</p>
        <p class="src">{src}</p>
      </div>''' for body, src in reviews)
        return f"""  <section class="lc-section">
    <div class="lc-wrap">
      <h2 class="lc-h2">{dong_name} 실제 후기</h2>
      <p class="lc-sub">카카오톡으로 주고받은 실제 내용입니다.</p>
{items}
    </div>
  </section>"""

    def section_cost():
        inner = "\n".join(
            f'      <div class="lc-factor">\n        <h3>{t}</h3>\n        <p>{c}</p>\n      </div>'
            for t, c in COST_FACTORS)
        return f"""  <section class="lc-section alt">
    <div class="lc-wrap">
      <h2 class="lc-h2">{dong_name} 정기청소 비용 결정 요인</h2>
      <p class="lc-sub">아래 네 가지를 확인한 뒤 현장 실사로 확정 견적을 안내합니다.</p>
      <div class="lc-grid2">
{inner}
      </div>
    </div>
  </section>"""

    def section_faq():
        faqs = [
            (f"{dong_name} 어디까지 방문하나요?", f"{areas} {nearby}"),
            ("견적은 어떻게 받나요?",
             "전화로 평수·주기·범위를 확인해 대략적인 범위를 안내해 드리고, 현장 실사 후 확정 견적을 드립니다. 실사는 무료입니다."),
            extra_faq,
        ]
        items = "\n".join(
            f'''      <details>
        <summary>{q}</summary>
        <p class="a">{a}</p>
      </details>''' for q, a in faqs)
        return f"""  <section class="lc-section alt">
    <div class="lc-wrap">
      <h2 class="lc-h2">자주 묻는 질문</h2>
      <p class="lc-sub">{dong_name} 정기청소 상담 때 많이 물어보시는 내용입니다.</p>
      <div class="lc-faq">
{items}
      </div>
    </div>
  </section>"""

    def section_links():
        links = [f'        <a href="/jeonggi/{region_slug}/">{region_name} 정기청소</a>']
        links += [f'        <a href="/jeonggi/{region_slug}/{s}/">{n} 정기청소</a>'
                  for s, n in siblings]
        inner = "\n".join(links)
        return f"""  <section class="lc-section">
    <div class="lc-wrap">
      <h2 class="lc-h2">인근 동 정기청소</h2>
      <p class="lc-sub">함께 방문 가능한 인근 동 안내입니다.</p>
      <div class="lc-links">
{inner}
      </div>
    </div>
  </section>"""

    footer_links = "\n".join(
        f'          <li><a class="footer-link" href="{h}">{l}</a></li>'
        for h, l in FOOTER_LINKS)
    footer = FOOTER.replace("{footer_links}", footer_links)

    intro_html = "\n".join(f'      <p class="lc-lead">{p}</p>' for p in intro)

    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="naver-site-verification" content="{VERIFICATION}" />
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}" />
<link rel="canonical" href="{url}" />
<meta name="robots" content="index, follow" />
<meta property="og:site_name" content="루미엔케어" />
<meta property="og:type" content="website" />
<meta property="og:url" content="{url}" />
<meta property="og:title" content="{esc(title)}" />
<meta property="og:description" content="{esc(desc)}" />
<meta property="og:image" content="https://lumiencares.com/images/og-image.jpg" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="stylesheet" href="/style.css" />
{HEAD_STYLE}
</head>
<body>
{HEADER}
  <main>
  <section class="lc-hero">
    <div class="lc-wrap">
      <nav class="lc-crumb" aria-label="breadcrumb"><a href="/">홈</a> &gt; <a href="/jeonggi/">정기청소</a> &gt; <a href="/jeonggi/{region_slug}/">{region_name} 정기청소</a> &gt; <span>{dong_name} 정기청소</span></nav>
      <h1 class="lc-h1">{dong_name} 정기청소</h1>
{intro_html}
      <div class="lc-cta-row">
        <a class="lc-btn lc-btn-primary" href="tel:{PHONE}">&#9742; 무료 상담 {PHONE}</a>
        <a class="lc-btn lc-btn-outline" href="#lc-contact">견적 문의하기</a>
      </div>
    </div>
  </section>
{section_industry()}
{section_visit()}
{section_cases()}
{section_reviews()}
{section_cost()}
{section_faq()}
{section_links()}
  <section class="lc-section">
    <div class="lc-wrap">
      <div class="lc-cta" id="lc-contact">
        <h2>지금 바로 무료 상담을 받아보세요.</h2>
        <p>현장을 직접 보고 확정 견적을 안내해 드립니다.<br />전화 한 통이면 정기청소 계획이 시작됩니다.</p>
        <div class="lc-cta-row" style="justify-content:center">
          <a class="lc-btn lc-btn-primary" href="tel:{PHONE}">&#9742; {PHONE}</a>
        </div>
      </div>
    </div>
  </section>
  </main>
{footer}
  <script>
  (function(){{
    var t=document.getElementById('lcMobileToggle'),p=document.getElementById('lcMobilePanel');
    if(t&&p){{t.addEventListener('click',function(){{p.classList.toggle('open');}});}}
  }})();
  </script>
</body>
</html>
"""


def main():
    # 1. 동 페이지 21개 생성
    by_region = {}
    for d in DONGS:
        by_region.setdefault(d[0], []).append((d[2], d[3]))
    for d in DONGS:
        (region_slug, region_name, dong_slug, dong_name, desc, intro,
         areas, nearby, photos, extra_faq) = d
        siblings = [(s, n) for s, n in by_region[region_slug] if s != dong_slug]
        reviews = get_reviews(region_slug)
        html_out = render_page(region_slug, region_name, dong_slug, dong_name,
                               desc, intro, areas, nearby, photos, reviews,
                               extra_faq, siblings)
        outdir = os.path.join(REPO, "jeonggi", region_slug, dong_slug)
        os.makedirs(outdir, exist_ok=True)
        with open(os.path.join(outdir, "index.html"), "w", encoding="utf-8") as f:
            f.write(html_out)
        print("wrote", f"jeonggi/{region_slug}/{dong_slug}/index.html")

    # 2. 지역 허브에 동 하향 링크 섹션 추가
    for region_slug, dongs in by_region.items():
        p = os.path.join(REPO, "jeonggi", region_slug, "index.html")
        src = open(p, encoding="utf-8").read()
        if "동별 정기청소" in src:
            print("skip (already has dong links):", region_slug)
            continue
        links = "\n".join(
            f'        <a href="/jeonggi/{region_slug}/{s}/">{n} 정기청소</a>'
            for s, n in dongs)
        section = f"""  <section class="lc-section">
    <div class="lc-wrap">
      <h2 class="lc-h2">동별 정기청소</h2>
      <p class="lc-sub">동 단위 상세 안내 페이지입니다.</p>
      <div class="lc-links">
{links}
      </div>
    </div>
  </section>
"""
        marker = '  <section class="lc-section">\n    <div class="lc-wrap">\n      <div class="lc-cta" id="lc-contact">'
        assert marker in src, f"CTA marker not found in {region_slug}"
        src = src.replace(marker, section + marker, 1)
        open(p, "w", encoding="utf-8").write(src)
        print("patched hub:", region_slug)

    # 3. sitemap.xml은 건드리지 않는다 (2026-10-28: 64개 URL 수동 관리.
    #    구버전 로직은 36개로 재생성해 지역×업종 26개+소파/에어컨을 지워버리므로 비활성화)
    print("sitemap untouched (managed manually)")


if __name__ == "__main__":
    main()
