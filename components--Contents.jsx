// ============================================================
// Contents — Table of Contents (AI-first order, CN primary)
// ============================================================

const { ScrollReveal } = window;

function Contents({ onNavigate, onOpenCategory }) {
  const chapters = [
    {
      num: '01',
      cn: 'AI 商业广告',
      en: 'AI COMMERCIAL ADS',
      count: '13 个作品',
      target: 'chapter-ai-ads',
      catId: 'ai-ads',
    },
    {
      num: '02',
      cn: 'AI LOGO',
      en: 'AI LOGO REVEALS',
      count: '12 个作品',
      target: 'chapter-ai-logo',
      catId: 'ai-logo',
    },
    {
      num: '03',
      cn: 'AI娱乐类视频',
      en: 'AI ENTERTAINMENT',
      count: '3 个作品',
      target: 'chapter-ai-ent',
      catId: 'ai-entertainment',
    },
    {
      num: '04',
      cn: '传统视频模板',
      en: 'TRADITIONAL TEMPLATES',
      count: '12 个作品',
      target: 'chapter-traditional',
      catId: 'traditional',
    },
    {
      num: '05',
      cn: '平面与品牌设计',
      en: 'GRAPHIC & BRAND DESIGN',
      count: '4 个方向 · 41 张设计',
      target: 'chapter-graphic-design',
      catId: null,
    },
    {
      num: '06',
      cn: '关于与数据',
      en: 'EVIDENCE & ABOUT',
      count: '职业路径 & 量产数据',
      target: 'evidence',
      catId: null,
    },
    {
      num: '07',
      cn: '结尾',
      en: 'CONTACT',
      count: 'THANK YOU',
      target: 'ending',
      catId: null,
    },
  ];

  const scrollTo = (target) => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="contents" id="contents">
      <div className="container">
        <ScrollReveal>
          <div className="contents-header">
            <div className="contents-eyebrow">
              <span className="contents-eyebrow-dot" />
              <span>CONTENTS</span>
            </div>
            <h2 className="contents-title">目录</h2>
            <p className="contents-subtitle">共 7 个章节 · 40 个视频作品 · 41 张平面设计</p>
          </div>
        </ScrollReveal>

        <div className="toc-list">
          {chapters.map((ch, i) => (
            <ScrollReveal key={ch.num} delay={i * 60}>
              <div
                className="toc-item"
                onClick={() => scrollTo(ch.target)}
              >
                <div className="toc-left">
                  <span className="toc-num">{ch.num}</span>
                  <div className="toc-chapter">
                    <span className="toc-chapter-cn">{ch.cn}</span>
                    <span className="toc-chapter-en">{ch.en}</span>
                  </div>
                </div>
                <div className="toc-right">
                  <span className="toc-count">{ch.count}</span>
                  <span className="toc-arrow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Contents });
