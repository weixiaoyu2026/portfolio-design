// ============================================================
// Cover — transparent, code-designed
// Center: "Portfolio" script + editorial meta above/below
// ============================================================

function Cover() {
  return (
    <section className="cover" id="cover" data-screen-label="01">
      <div className="cover-inner">
        {/* Top bar */}
        <div className="cover-top">
          <div className="cover-top-left">
            <span className="cover-label-line">AIGC</span>
            <span className="cover-label-line">Video</span>
          </div>

          <div className="cover-top-right">
            <div className="cover-name-block">
              <div className="cover-name-zh">魏小雨 · Wei Xiaoyu</div>
              <div className="cover-year">2024–2026</div>
            </div>
            <div className="cover-services">
              <div className="cover-services-title">AIGC Video Designer</div>
              <div className="cover-services-list">
                <span>AI Commercial Ads</span>
                <span>Logo Reveals</span>
                <span>Video Templates</span>
                <span>Prompt Engineering</span>
                <span>Workflow Design</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Portfolio script with editorial meta */}
        <div className="cover-center">
          <div className="cover-portfolio-block">
            {/* Above: small label + line */}
            <div className="portfolio-meta portfolio-meta-top">
              <span className="portfolio-meta-dot"></span>
              <span className="portfolio-meta-text">AIGC&nbsp;VIDEO&nbsp;DESIGNER</span>
              <span className="portfolio-meta-line"></span>
            </div>

            {/* The big script title — untouched */}
            <div className="cover-portfolio">
              <span className="cover-portfolio-text">Portfolio</span>
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

        {/* Bottom: scroll hint */}
        <div className="cover-bottom">
          <div className="cover-scroll-hint">
            <span>Scroll</span>
            <div className="cover-scroll-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Cover });
