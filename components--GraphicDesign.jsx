// Individual artwork extracted from the source portfolio, without its page layouts.
function GraphicDesign() {
  const categories = window.DESIGN_CATEGORIES;
  const [selected, setSelected] = React.useState('kv');
  const [expanded, setExpanded] = React.useState(false);
  const [active, setActive] = React.useState(null);
  const [zoomed, setZoomed] = React.useState(false);
  const dialogRef = React.useRef(null);
  const closeRef = React.useRef(null);
  const category = categories.find(c => c.id === selected);
  const works = category.groups.flatMap(g => g.items);
  const artwork = active === null ? null : works[active];
  const total = categories.reduce((sum, c) => sum + c.count, 0);

  React.useEffect(() => {
    if (active === null) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    closeRef.current.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [active === null]);

  const move = direction => {
    setActive(index => (index + direction + works.length) % works.length);
    setZoomed(false);
  };
  const close = () => { setActive(null); setZoomed(false); };
  const choose = id => { setSelected(id); setExpanded(false); };

  return (
    <section className="chapter graphic-design" id="chapter-graphic-design">
      <div className="container">
        <div className="chapter-header">
          <div className="chapter-meta">
            <span className="chapter-number">05 · Chapter</span>
            <span className="chapter-divider" />
            <span className="section-label">Brand, Image & Illustration</span>
          </div>
          <h2 className="chapter-title-main">平面与品牌设计</h2>
          <div className="chapter-title-row">
            <span className="chapter-title-en-small">GRAPHIC & BRAND DESIGN</span>
            <span className="chapter-title-rule" />
            <span className="chapter-count">4 个方向 · {total} 张设计</span>
          </div>
          <p className="chapter-desc">从展会视觉到品牌日常，让创意落在每一个触点。涵盖 KV 延展、品牌运营、节气插画与营销海报。</p>
        </div>

        <div className="design-filters" role="group" aria-label="设计分类">
          {categories.map(c => (
            <button key={c.id} type="button" className={`design-filter ${c.id === selected ? 'is-selected' : ''}`}
              aria-pressed={c.id === selected} aria-controls="design-gallery" onClick={() => choose(c.id)}>
              {c.label}<span>{String(c.count).padStart(2, '0')}</span>
            </button>
          ))}
        </div>

        <div id="design-gallery" aria-label={category.label}>
          <div className="design-intro">
            <span className="design-category-en">{category.en}</span>
            <p>{category.description}</p>
          </div>
          {category.groups.map((group, groupIndex) => {
            const visible = expanded ? group.items : group.items.slice(0, 6);
            return (
              <div className="design-group" key={group.title}>
                <div className="design-group-heading">
                  <h3>{group.title}</h3><span>{group.items.length} 张</span>
                </div>
                {group.description && <p className="design-group-description">{group.description}</p>}
                <div className={`design-grid ${group.wide ? 'design-grid-wide' : ''}`}>
                  {visible.map((work, index) => (
                    <button className="design-card" type="button" key={work.id}
                      aria-label={`放大查看：${work.title}`} onClick={() => { setActive(works.indexOf(work)); setZoomed(false); }}>
                      <span className={`design-card-image ${work.width > work.height ? 'is-landscape' : ''}`}>
                        <img src={work.thumb} alt={work.title} width={work.width} height={work.height} loading="lazy" decoding="async" />
                        <span className="design-card-open" aria-hidden="true">↗</span>
                      </span>
                      <span className="design-card-caption"><span>{work.title}</span><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          {category.groups.some(g => g.items.length > 6) && (
            <div className="chapter-more-row">
              <button type="button" className="chapter-more-btn" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>
                {expanded ? '收起作品' : `查看全部${category.label} · ${category.count} 张`}<span aria-hidden="true">{expanded ? '−' : '+'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <dialog ref={dialogRef} className="design-lightbox" aria-labelledby="design-lightbox-title"
        onCancel={event => { event.preventDefault(); close(); }}
        onClick={event => { if (event.target === event.currentTarget) close(); }}
        onKeyDown={event => {
          if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
          if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
        }}>
        {artwork && <>
          <div className="design-lightbox-toolbar">
            <div><span className="design-lightbox-index">{active + 1} / {works.length}</span><h3 id="design-lightbox-title">{artwork.title}</h3></div>
            <div className="design-lightbox-actions">
              <button type="button" onClick={() => setZoomed(v => !v)} aria-pressed={zoomed}>{zoomed ? '适应屏幕' : '查看细节'}</button>
              <button ref={closeRef} type="button" onClick={close} aria-label="关闭大图">✕</button>
            </div>
          </div>
          <div className={`design-lightbox-image ${zoomed ? 'is-zoomed' : ''}`} key={artwork.id + zoomed}>
            <img src={artwork.src} alt={artwork.title} width={artwork.width} height={artwork.height} />
          </div>
          <div className="design-lightbox-footer">
            <button type="button" onClick={() => move(-1)} aria-label="上一张作品">← 上一张</button>
            <span>左右切换 · Esc 关闭</span>
            <button type="button" onClick={() => move(1)} aria-label="下一张作品">下一张 →</button>
          </div>
        </>}
      </dialog>
    </section>
  );
}

Object.assign(window, { GraphicDesign });
