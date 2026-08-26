export function setupHeroMedia({
  hero,
  video,
  toggle,
  documentRef = document,
  windowRef = window,
}) {
  const prefersReducedMotion = windowRef.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let userPaused = prefersReducedMotion;

  const syncVideo = (paused, poster = false) => {
    hero.classList.toggle('video-still', poster);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} background video`);
  };

  const playVideo = (userInitiated = false) => {
    userPaused = false;
    if (userInitiated) hero.classList.add('motion-opt-in');
    const playback = video.play();
    if (!playback) {
      syncVideo(false);
      return;
    }
    void playback.then(() => syncVideo(false)).catch(() => {
      userPaused = true;
      hero.classList.remove('motion-opt-in');
      syncVideo(true, true);
    });
  };

  const pauseVideo = (poster = false) => {
    userPaused = true;
    video.pause();
    syncVideo(true, poster);
  };

  toggle.addEventListener('click', () => video.paused ? playVideo(true) : pauseVideo());
  video.addEventListener('pause', () => {
    if (!userPaused) syncVideo(true, true);
  });
  documentRef.addEventListener('visibilitychange', () => {
    if (!documentRef.hidden && video.paused && !userPaused) playVideo();
  });

  if (userPaused) pauseVideo(true);
  else playVideo();
}
