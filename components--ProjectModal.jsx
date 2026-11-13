// ============================================================
// ProjectModal — Full-screen project detail
// ============================================================

const { useEffect, useRef } = React;

function ProjectModal({ project, isOpen, onClose }) {
  const videoRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    if (isOpen) {
      video.currentTime = 0;
      video.play().catch(() => {});
      document.body.style.overflow = 'hidden';
    } else {
      video.pause();
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, project]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  if (!project) return null;

  return (
    <div
      ref={backdropRef}
      className={`modal-backdrop ${isOpen ? 'is-open' : ''}`}
      onClick={handleBackdropClick}
    >
      <button className="modal-close" onClick={onClose} aria-label="关闭">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div className="modal">
        {project.fullVideo ? (
          <div className="modal-video-wrap">
            <video
              ref={videoRef}
              className="modal-video"
              src={project.fullVideo}
              poster={project.poster}
              controls
              muted
              playsInline
              preload="metadata"
            />
          </div>
        ) : (
          <div className="modal-video-wrap modal-video-missing">
            <img
              src={project.poster}
              alt={project.titleEn}
              className="modal-video-poster"
            />
            <div className="modal-video-missing-overlay">
              <div className="modal-video-missing-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <div className="modal-video-missing-title">完整视频暂未上传</div>
              <div className="modal-video-missing-desc">该项目完整视频素材待补充，请稍后再查看。</div>
            </div>
          </div>
        )}

        <div className="modal-body">
          <div className="modal-meta">
            <div className="modal-meta-item">
              <span className="modal-meta-label">编号</span>
              <span className="modal-meta-value">{project.num}</span>
            </div>
            <div className="modal-meta-item">
              <span className="modal-meta-label">年份</span>
              <span className="modal-meta-value">{project.year}</span>
            </div>
            <div className="modal-meta-item">
              <span className="modal-meta-label">分类</span>
              <span className="modal-meta-value">{project.category}</span>
            </div>
          </div>

          <div className="modal-content">
            <div>
              <h3 className="modal-title-en modal-title-en-primary">{project.titleEn}</h3>
              <p className="modal-title-cn modal-title-cn-secondary">{project.titleCn}</p>
            </div>

            <p className="modal-desc">{project.description}</p>

            {project.role && project.role.length > 0 && (
              <div>
                <div className="modal-section-title">我的角色</div>
                <div className="modal-role-list">
                  {project.role.map((r, i) => (
                    <span key={i} className="modal-role-tag">{r}</span>
                  ))}
                </div>
              </div>
            )}

            {(project.imageGenModel && project.imageGenModel.length > 0) ||
            (project.imageToVideoModel && project.imageToVideoModel.length > 0) ? (
              <div className="modal-models">
                {project.imageGenModel && project.imageGenModel.length > 0 && (
                  <div className="modal-model-row">
                    <span className="modal-model-label">文生图模型</span>
                    <span className="modal-model-value">Image Generation Model</span>
                    <div className="modal-model-list">
                      {project.imageGenModel.map((m, i) => (
                        <span key={i} className="modal-model-item">• {m}</span>
                      ))}
                    </div>
                  </div>
                )}
                {project.imageToVideoModel && project.imageToVideoModel.length > 0 && (
                  <div className="modal-model-row">
                    <span className="modal-model-label">图生视频模型</span>
                    <span className="modal-model-value">Image-to-Video Model</span>
                    <div className="modal-model-list">
                      {project.imageToVideoModel.map((m, i) => (
                        <span key={i} className="modal-model-item">• {m}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {project.problemMethod && project.problemMethod.length > 0 && (
              <div>
                <div className="modal-section-title">问题与方法</div>
                <div className="modal-problem-method">
                  {project.problemMethod.map((pm, i) => (
                    <div key={i} className="pm-item">
                      <div className="pm-question">
                        <span className="pm-label">问题</span>
                        <span className="pm-text">{pm.problem}</span>
                      </div>
                      <div className="pm-answer">
                        <span className="pm-label">方法</span>
                        <span className="pm-text">{pm.method}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProjectModal });
