// ============================================================
// Evidence — Workflow & Data
// ============================================================

const { ScrollReveal } = window;

function Evidence() {
  return (
    <section className="evidence" id="evidence">
      <div className="container">
        <div className="evidence-header">
          <ScrollReveal>
              <div className="chapter-meta">
                <span className="chapter-number">06 · Evidence</span>
                <span className="chapter-divider" />
                <span className="section-label">Production Track Record</span>
              </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h2 className="evidence-title">量产数据与流程沉淀</h2>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="evidence-subtitle">
              不只是会做视频——能稳定交付、有数据验证、懂流程建设。
              从传统模板到 AI 生成，持续围绕商业量产效率与质量标准优化。
            </p>
          </ScrollReveal>
        </div>

        <div className="evidence-grid">
          {EVIDENCE.map((item, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div className="evidence-item">
                <div className="evidence-meta">{item.meta}</div>
                <div className="evidence-number">
                  <span>{item.number}</span>
                  <span className="evidence-unit">{item.unit}</span>
                </div>
                <p className="evidence-label">{item.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Evidence });
