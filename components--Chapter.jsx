// ============================================================
// Chapter Section — Featured projects + More button
// ============================================================

const { useRef, useState, useEffect } = React;
const { ScrollReveal } = window;

function ProjectCard({ project, onOpen, orientation = 'landscape' }) {
  const videoRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    if (isHovering) {
      try { video.currentTime = 0; } catch (e) {}
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isHovering]);

  return (
    <div
      className={`project-card ${orientation === 'portrait' ? 'is-portrait' : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onOpen(project)}
    >
      <div className="project-card-media">
        <img
          src={project.poster}
          alt={project.titleEn}
          className="project-card-poster"
          loading="lazy"
        />
        <video
          ref={videoRef}
          className="project-card-preview"
          src={project.previewVideo}
          muted
          loop
          playsInline
          preload="none"
          poster={project.poster}
        />
        <div className="project-card-overlay" />
        <div className="project-card-num-tag">{project.num}</div>
        {project.fullVideoBroken && (
          <div className="project-card-broken-badge">完整视频待补充</div>
        )}
      </div>
          <div className="project-card-meta">
            <div className="project-card-title">{project.titleEn}</div>
            <div className="project-card-info-row">
              <span className="project-card-sub">{project.titleCn}</span>
              <span className="project-card-year">{project.year}</span>
            </div>
          </div>
    </div>
  );
}

function Chapter({ category, projects, sectionId, onOpenProject, onOpenMore, orientation = 'landscape', showMore = true }) {
  const gridClass = orientation === 'portrait'
    ? `project-grid-portrait ${projects.length <= 3 ? 'is-3col' : ''}`
    : 'project-grid-landscape';

  return (
    <section className="chapter" id={sectionId}>
      <div className="container">
        <div className="chapter-header">
          <ScrollReveal>
            <div className="chapter-meta">
              <span className="chapter-number">{category.num} · Chapter</span>
              <span className="chapter-divider" />
              <span className="section-label">{category.subtitle}</span>
            </div>
          </ScrollReveal>

           <ScrollReveal delay={80}>
             <h2 className="chapter-title-main">{category.titleCn}</h2>
           </ScrollReveal>

           <ScrollReveal delay={160}>
             <div className="chapter-title-row">
               <span className="chapter-title-en-small">{category.titleEn}</span>
               <span className="chapter-title-rule" />
               <span className="chapter-count">{projects.length} 精选 · 共 {getTotalCount(category)} 个作品</span>
             </div>
           </ScrollReveal>

          <ScrollReveal delay={240}>
            <p className="chapter-desc">{category.description}</p>
          </ScrollReveal>
        </div>

        <div className={gridClass}>
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 70}>
              <ProjectCard
                project={project}
                onOpen={onOpenProject}
                orientation={orientation}
              />
            </ScrollReveal>
          ))}
        </div>

        {showMore && (
          <ScrollReveal delay={Math.min(projects.length, 6) * 70}>
            <div className="chapter-more-row">
              <button className="chapter-more-btn" onClick={onOpenMore}>
                <span>查看全部作品</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

function getTotalCount(category) {
  const { AI_ADS_LANDSCAPE, AI_ADS_VERTICAL, AI_LOGO_PROJECTS, AI_ENTERTAINMENT, TRADITIONAL } = window;
  switch (category.id) {
    case 'ai-ads': return AI_ADS_LANDSCAPE.length + AI_ADS_VERTICAL.length;
    case 'ai-logo': return AI_LOGO_PROJECTS.length;
    case 'ai-entertainment': return AI_ENTERTAINMENT.length;
    case 'traditional': return TRADITIONAL.length;
    default: return 0;
  }
}

Object.assign(window, { Chapter, ProjectCard });
