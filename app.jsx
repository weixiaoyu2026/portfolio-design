// ============================================================
// Main App — Portfolio v3 (SPA with category pages + scroll restore)
// ============================================================

const { useState, useEffect, useCallback, useRef } = React;

const {
  Cover,
  Contents,
  Chapter,
  GraphicDesign,
  Evidence,
  About,
  Ending,
  ProjectModal,
  NavProgress,
  CategoryPage,
  Background,
  CATEGORIES,
  AI_ADS_LANDSCAPE,
  AI_ADS_VERTICAL,
  AI_LOGO_PROJECTS,
  AI_ENTERTAINMENT,
  TRADITIONAL,
} = window;

// Section list for scroll tracking on main page
const MAIN_SECTIONS = [
  { id: 'cover', label: '封面' },
  { id: 'contents', label: '目录' },
  { id: 'chapter-ai-ads', label: '01 AI 商业广告' },
  { id: 'chapter-ai-logo', label: '02 AI Logo' },
  { id: 'chapter-ai-ent', label: '03 AI 娱乐' },
  { id: 'chapter-traditional', label: '04 传统模板' },
  { id: 'chapter-graphic-design', label: '05 平面与品牌' },
  { id: 'evidence', label: '量产数据' },
  { id: 'about', label: '关于' },
  { id: 'ending', label: '结尾' },
];

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('cover');
  const [currentView, setCurrentView] = useState('main'); // 'main' or category id
  const [viewTransitioning, setViewTransitioning] = useState(false);
  const savedScrollRef = useRef(0);

  const handleOpenProject = useCallback((project) => {
    setActiveProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setActiveProject(null), 400);
  }, []);

  const handleOpenCategory = useCallback((categoryId) => {
    // Save current scroll position before leaving
    savedScrollRef.current = window.scrollY;
    setViewTransitioning(true);
    setTimeout(() => {
      setCurrentView(categoryId);
      window.scrollTo({ top: 0, behavior: 'auto' });
      setTimeout(() => setViewTransitioning(false), 50);
    }, 300);
  }, []);

  const handleBackToMain = useCallback(() => {
    setViewTransitioning(true);
    setTimeout(() => {
      setCurrentView('main');
      // Restore saved scroll position — goes back to the exact
      // scroll position user was at before opening the category page
      setTimeout(() => {
        window.scrollTo({ top: savedScrollRef.current, behavior: 'auto' });
        setViewTransitioning(false);
      }, 50);
    }, 300);
  }, []);

  // Track active section on main page only
  useEffect(() => {
    if (currentView !== 'main') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    MAIN_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentView]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isModalOpen]);

  // Subtle background glow drift on scroll
  // Colored edge glows shift vertically along the left/right margins — never enter content area
  useEffect(() => {
    const bg = document.querySelector('.dynamic-bg');
    if (!bg) return;

    let ticking = false;
    let scrollY = 0;
    let rafId = null;

    const updateBg = () => {
      ticking = false;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      // Each glow shifts vertically along its edge, at different rates.
      // Horizontal size and position stay pinned to edges — no horizontal drift toward center.
      // Purple (left-top): drifts down slightly
      const pt = 24 + Math.sin(progress * Math.PI * 0.6) * 6;   // 18% - 30% vertical center offset
      // Orange (left-bottom): drifts up slightly
      const ob = 72 + Math.sin(progress * Math.PI * 0.8 + 0.5) * 5; // 67% - 77%
      // Blue (right-top): drifts down
      const bt = 22 + Math.cos(progress * Math.PI * 0.7) * 7;    // 15% - 29%
      // Green (right-bottom): drifts up
      const gb = 76 + Math.cos(progress * Math.PI * 0.9 + 1) * 6; // 70% - 82%

      // Widths stay small (~7-8% vw) so glows remain mostly in side margins
      bg.style.backgroundPosition = `
        left ${pt}%,
        left ${ob}%,
        right ${bt}%,
        right ${gb}%
      `;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(updateBg);
      }
    };

    // Also support prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Get category data for current category view
  const getCategoryData = (catId) => {
    switch (catId) {
      case 'ai-ads':
        return {
          category: CATEGORIES.aiAds,
          projects: [...AI_ADS_LANDSCAPE, ...AI_ADS_VERTICAL],
          landscape: AI_ADS_LANDSCAPE,
          vertical: AI_ADS_VERTICAL,
        };
      case 'ai-logo':
        return {
          category: CATEGORIES.aiLogo,
          projects: AI_LOGO_PROJECTS,
          landscape: AI_LOGO_PROJECTS,
          vertical: [],
        };
      case 'ai-entertainment':
        return {
          category: CATEGORIES.aiEntertainment,
          projects: AI_ENTERTAINMENT,
          landscape: [],
          vertical: AI_ENTERTAINMENT,
        };
      case 'traditional':
        return {
          category: CATEGORIES.traditional,
          projects: TRADITIONAL,
          landscape: TRADITIONAL,
          vertical: [],
        };
      default:
        return null;
    }
  };

  const currentCategory = currentView !== 'main' ? getCategoryData(currentView) : null;

  return (
    <>
      <Background />
      {currentView === 'main' && (
        <NavProgress sections={MAIN_SECTIONS} activeSection={activeSection} />
      )}

      <div className={`app-transition ${viewTransitioning ? 'is-fading' : ''}`}>
        {currentView === 'main' && (
          <>
            <Cover />
            <Contents onOpenCategory={handleOpenCategory} />

            <Chapter
              category={CATEGORIES.aiAds}
              projects={AI_ADS_LANDSCAPE.slice(0, CATEGORIES.aiAds.featuredCount)}
              sectionId="chapter-ai-ads"
              onOpenProject={handleOpenProject}
              onOpenMore={() => handleOpenCategory('ai-ads')}
              showMore={CATEGORIES.aiAds.hasMore}
            />

            <Chapter
              category={CATEGORIES.aiLogo}
              projects={AI_LOGO_PROJECTS.slice(0, CATEGORIES.aiLogo.featuredCount)}
              sectionId="chapter-ai-logo"
              onOpenProject={handleOpenProject}
              onOpenMore={() => handleOpenCategory('ai-logo')}
              showMore={CATEGORIES.aiLogo.hasMore}
            />

            <Chapter
              category={CATEGORIES.aiEntertainment}
              projects={AI_ENTERTAINMENT.slice(0, CATEGORIES.aiEntertainment.featuredCount)}
              sectionId="chapter-ai-ent"
              onOpenProject={handleOpenProject}
              onOpenMore={() => handleOpenCategory('ai-entertainment')}
              orientation="portrait"
              showMore={CATEGORIES.aiEntertainment.hasMore}
            />

            <Chapter
              category={CATEGORIES.traditional}
              projects={TRADITIONAL.slice(0, CATEGORIES.traditional.featuredCount)}
              sectionId="chapter-traditional"
              onOpenProject={handleOpenProject}
              onOpenMore={() => handleOpenCategory('traditional')}
              showMore={CATEGORIES.traditional.hasMore}
            />

            <GraphicDesign />

            <Evidence />
            <About />
            <Ending />
          </>
        )}

        {currentCategory && (
          <CategoryPage
            category={currentCategory.category}
            landscape={currentCategory.landscape}
            vertical={currentCategory.vertical}
            onOpenProject={handleOpenProject}
            onBack={handleBackToMain}
          />
        )}
      </div>

      <ProjectModal
        project={activeProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
