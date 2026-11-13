// ============================================================
// Ending — matches cover style with "Thank You" + 3 glass buttons
// ============================================================

function Ending() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContents = () => {
    const el = document.getElementById('contents');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="ending" id="ending" data-screen-label="12">
      <div className="ending-inner">
        {/* Top bar */}
        <div className="ending-top">
          <div className="ending-top-left">
            <span className="cover-label-line">Thanks</span>
            <span className="cover-label-line">Viewing</span>
          </div>

          <div className="ending-top-right">
            <div className="cover-name-block">
              <div className="cover-name-zh">魏小雨 · Wei Xiaoyu</div>
              <div className="cover-year">2024–2026</div>
              <div className="ending-role">AIGC Video Designer</div>
            </div>
          </div>
        </div>

        {/* Center: Thank You script with editorial meta */}
        <div className="ending-center">
          <div className="cover-portfolio-block ending-portfolio-block">
            {/* Above: small label + line */}
            <div className="portfolio-meta portfolio-meta-top">
              <span className="portfolio-meta-dot"></span>
              <span className="portfolio-meta-text">THANKS&nbsp;VIEWING</span>
              <span className="portfolio-meta-line"></span>
            </div>

            {/* The big script title — untouched */}
            <div className="ending-thankyou">
              <span className="cover-portfolio-text">Thank You</span>
            </div>

            {/* Below: year + name tag */}
            <div className="portfolio-meta portfolio-meta-bottom">
              <span className="portfolio-meta-year">2024 — 2026</span>
              <span className="portfolio-meta-tag">
                <span className="portfolio-meta-tag-square"></span>
                <span className="portfolio-meta-tag-text">魏小雨 · WEI XIAOYU</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: three glass buttons */}
        <div className="ending-bottom">
          <div className="ending-actions">
            <button
              className="glass-btn ending-action-btn"
              onClick={scrollToContents}
              aria-label="回到目录"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>回到目录</span>
            </button>
            <a
              href={RESUME_URL}
              className="glass-btn ending-action-btn ending-action-resume"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="下载简历"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>下载简历</span>
            </a>
            <button
              className="glass-btn ending-action-btn"
              onClick={scrollToTop}
              aria-label="回到顶部"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
              <span>回到顶部</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Ending });
