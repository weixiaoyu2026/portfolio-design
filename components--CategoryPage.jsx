// ============================================================
// CategoryPage — Full collection page for a single category
// ============================================================

const { useEffect } = React;
const { ScrollReveal, ProjectCard } = window;

function CategoryPage({ category, landscape = [], vertical = [], onOpenProject, onBack }) {
  const totalCount = landscape.length + vertical.length;
  const hasVerticalSection = vertical.length > 0 && category.id !== 'ai-entertainment';
  const allPortrait = landscape.length === 0 && vertical.length > 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [category.id]);

  return (
    <div className="category-page">
      <div className="category-page-header-bar">
        <div className="container">
          <button className="back-btn" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
             <span>返回</span>
           </button>
         </div>
       </div>

       <section className="category-hero">
         <div className="container">
           <ScrollReveal>
             <div className="chapter-meta">
               <span className="chapter-number">{category.num} · COLLECTION</span>
               <span className="chapter-divider" />
               <span className="section-label">{category.subtitle}</span>
             </div>
           </ScrollReveal>

           <ScrollReveal delay={80}>
             <h1 className="category-title">{category.titleCn}</h1>
           </ScrollReveal>

           <ScrollReveal delay={160}>
             <div className="category-title-row">
               <span className="chapter-title-en-small">{category.titleEn}</span>
               <span className="chapter-title-rule" />
               <span className="chapter-count">共 {totalCount} 个作品</span>
             </div>
           </ScrollReveal>

          <ScrollReveal delay={240}>
            <p className="chapter-desc category-desc">{category.description}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Landscape / main grid */}
      {landscape.length > 0 && (
        <section className="category-section">
          <div className="container">
            <ScrollReveal>
              <div className="category-section-header">
                <h3 className="category-section-title">全部作品</h3>
                <span className="category-section-count">{landscape.length} 个 · 16:9</span>
              </div>
            </ScrollReveal>

            <div className="project-grid-landscape">
              {landscape.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 50}>
                  <ProjectCard project={project} onOpen={onOpenProject} orientation="landscape" />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Vertical shorts section */}
      {hasVerticalSection && (
        <section className="category-section">
          <div className="container">
            <ScrollReveal>
              <div className="category-section-header">
                 <div>
                   <h3 className="category-section-title">竖版短视频</h3>
                   <p className="category-section-sub">VERTICAL SHORTS</p>
                 </div>
                <span className="category-section-count">{vertical.length} 个 · 9:16</span>
              </div>
            </ScrollReveal>

            <div className="project-grid-portrait">
              {vertical.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 50}>
                  <ProjectCard project={project} onOpen={onOpenProject} orientation="portrait" />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All-portrait case (e.g. AI Entertainment) */}
      {allPortrait && (
        <section className="category-section">
          <div className="container">
            <ScrollReveal>
              <div className="category-section-header">
                <h3 className="category-section-title">全部作品</h3>
                <span className="category-section-count">{vertical.length} 个 · 9:16</span>
              </div>
            </ScrollReveal>

            <div className="project-grid-portrait">
              {vertical.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 50}>
                  <ProjectCard project={project} onOpen={onOpenProject} orientation="portrait" />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="category-footer">
        <div className="container">
          <button className="chapter-more-btn" onClick={onBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
             <span>返回</span>
          </button>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { CategoryPage });
