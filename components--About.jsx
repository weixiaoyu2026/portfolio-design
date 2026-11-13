// ============================================================
// About Section
// ============================================================

const { ScrollReveal } = window;

function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-header">
            <ScrollReveal>
              <div className="about-eyebrow">06 · ABOUT ME</div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <h2 className="about-title">从平面到 AIGC</h2>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <p className="about-intro">
                从平面设计转向 AIGC 视频，我最开始其实是焦虑的：AI 的结果不完全可控，很多效果需要反复测试，也没有成熟经验可以直接参考。但通过一条条片子的生成、筛选和复盘，我慢慢掌握了模型选型、提示词控制、镜头判断和后期补足的方法。
                <br /><br />
                现在回头看，这段成长不只是工具的变化，也是从 "完成单一视觉设计" 到 "搭建生产流程、控制成片质量" 的转变。我仍然会觉得 AI 更新很快，但已经能更稳定地把不确定的创意变成可交付的作品。
              </p>
            </ScrollReveal>

            <ScrollReveal delay={240}>
              <a
                href={RESUME_URL}
                className="resume-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
                </svg>
                下载简历
              </a>
            </ScrollReveal>
          </div>

          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="timeline-item">
                  <span className="timeline-period">{item.period}</span>
                  <div className="timeline-content">
                    <span className="timeline-company">{item.company}</span>
                    <span className="timeline-role">{item.role}</span>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { About });
