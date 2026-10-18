import { useEffect, useState } from 'react';

type Video = { title: string; url: string; thumb: string };

const popularVideos: { category: string; items: Video[] }[] = [
  {
    category: 'Gaming Videos',
    items: [
      { title: 'Last Day on Earth Gameplay', url: 'https://www.youtube.com/live/-Er2Pmy0HZI?si=rr01QQwgWI6XbJDb', thumb: '/assets/streaming/gameplay-video1.webp' },
      { title: 'theHunter Classic Gameplay', url: 'https://youtu.be/eXnNIszUU7E?si=IPZ_z_-1IyRqVwnG', thumb: '/assets/streaming/gameplay-video2.webp' },
      { title: 'Halloween Stream theHunter Classic', url: 'https://www.twitch.tv/videos/2303292671', thumb: '/assets/streaming/gameplay-video3.webp' }
    ]
  },
  {
    category: 'Drawing',
    items: [
      { title: 'Car Sketch Session', url: 'https://www.youtube.com/watch?v=PcZ4JlOR8Z8', thumb: '/assets/streaming/CarSketchAugust.jpg' },
      { title: 'Automotive Design Sketching', url: 'https://youtu.be/MD2km_LnUf4', thumb: '/assets/streaming/automotive-design-sketching.jpg' },
      { title: 'Car Sketch Process', url: 'https://youtu.be/-7a2JQIbCOk?si=gVuh0eYNBZvQ292f', thumb: '/assets/streaming/car-sketch-process.jpg' }
    ]
  },
  {
    category: 'Coding',
    items: [
      { title: 'PSP Digital Comics Reborn (React/TS)', url: 'https://www.youtube.com/watch?v=PD-8Q7aSv90', thumb: '/assets/projects/psp_digital_comics.gif' },
      { title: 'Love2D Xbox-Inspired Launcher', url: 'https://www.youtube.com/watch?v=KIvuYsxpoYs', thumb: '/assets/projects/love2d_xboxlauncher.webp' },
      { title: 'XMB Menu Launcher Multi-Themes (HTML5)', url: 'https://www.youtube.com/watch?v=YagOy0VBs-Q', thumb: '/assets/projects/dreamcastps3html.webp' },
      { title: 'XMB in SFML', url: 'https://www.youtube.com/watch?v=qLEClZEXr68&t=11850s', thumb: '/assets/streaming/coding-video1.webp' },
      { title: 'Personal Website Build', url: 'https://www.twitch.tv/videos/2334965535', thumb: '/assets/streaming/coding-video2.webp' }
    ]
  }
];

const STREAMING_PILLARS = [
  { label: 'CODE', detail: 'Building tools in public' },
  { label: 'MAKE', detail: 'Art, interfaces, and hardware' },
  { label: 'PLAY', detail: 'Games, retro tech, and experiments' },
];

export default function Streaming() {
  const [isDark, setIsDark] = useState(() => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // Light + dark variants exist for both channel banners; pick by current theme.
  const youtubeThumb = isDark ? '/assets/streaming/youtube-thumbnail-dark.webp' : '/assets/streaming/youtube-thumbnail-light.webp';
  const twitchThumb = isDark ? '/assets/streaming/twitch-thumbnail-dark.webp' : '/assets/streaming/twitch-thumbnail-light.webp';

  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  // Helper to get embeddable iframe URL
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtube.com/live/')) {
      const id = url.split('youtube.com/live/')[1]?.split('?')[0];
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 bg-theme-bg dark:bg-theme-bg-dark transition-colors duration-300">
      <header className="mb-8 border-b border-theme-accent/20 dark:border-theme-accent-dark pb-6">
        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-theme-accent dark:text-theme-secondary-dark mb-3 flex items-center gap-3">
          <span className="w-8 h-px bg-theme-accent dark:bg-theme-accent-dark" />
          MungDaal321 · Live
        </p>
        <h1 className="text-3xl sm:text-5xl font-black leading-[1.05] mb-3 text-theme-primary dark:text-theme-secondary-dark font-display">Streaming &amp; Broadcasts</h1>
        <p className="text-sm sm:text-base text-theme-secondary dark:text-theme-secondary-dark leading-relaxed max-w-2xl font-light">A working notebook in public — live coding, automotive sketching, embedded experiments, aviation tools, and games.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-theme-accent/20 dark:bg-theme-accent-dark/30 mb-12 border border-theme-accent/20 dark:border-theme-accent-dark">
        {STREAMING_PILLARS.map((pillar) => (
          <div key={pillar.label} className="bg-theme-bg dark:bg-theme-bg-dark px-5 py-5">
            <p className="font-mono-tech text-xs tracking-[0.2em] text-theme-accent dark:text-theme-accent-dark mb-2">{pillar.label}</p>
            <p className="text-sm font-semibold text-theme-primary dark:text-theme-primary-dark">{pillar.detail}</p>
          </div>
        ))}
      </section>

      {/* Main Platforms Section */}
      <div className="streaming-layout md:grid md:grid-cols-2 md:gap-6 mb-12">
        {/* YouTube */}
        <section className="youtube border-t-4 border-red-600 dark:border-red-500 bg-theme-card dark:bg-theme-card-dark p-6 flex-1 mb-6 md:mb-0 rounded-b-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <i className="fab fa-youtube text-red-600 dark:text-red-500 text-2xl"></i>
            <h2 className="text-2xl font-semibold text-theme-primary dark:text-theme-primary-dark font-display">YouTube</h2>
          </div>
          <a href="https://www.youtube.com/@MungDaal321" target="_blank" rel="noreferrer" className="block mb-4 group overflow-hidden rounded-lg">
            <img loading="lazy" decoding="async" src={youtubeThumb} alt="YouTube Channel" width={1280} height={720} className="w-full rounded-lg transition-transform duration-300 group-hover:scale-105" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.svg'; }} />
          </a>
          <p className="text-theme-secondary dark:text-theme-secondary-dark mb-4">Check out my latest YouTube content and subscribe for updates on gaming, coding, and creative projects.</p>
          <a href="https://www.youtube.com/@MungDaal321" target="_blank" rel="noreferrer" className="inline-block px-4 py-2 rounded bg-theme-action dark:bg-theme-action-dark text-white font-medium hover:opacity-90 transition-opacity">
            Visit Channel
          </a>
        </section>

        {/* Twitch */}
        <section className="twitch border-t-4 border-purple-600 dark:border-purple-500 bg-theme-card dark:bg-theme-card-dark p-6 flex-1 rounded-b-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <i className="fab fa-twitch text-purple-600 dark:text-purple-500 text-2xl"></i>
              <h2 className="text-2xl font-semibold text-theme-primary dark:text-theme-primary-dark font-display">Twitch</h2>
            </div>
            <a
              href="https://www.twitch.tv/mungdaal321"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              mungdaal321
            </a>
          </div>
          <a href="https://www.twitch.tv/mungdaal321" target="_blank" rel="noreferrer" className="block mb-4 group overflow-hidden rounded-lg">
            <img loading="lazy" decoding="async" src={twitchThumb} alt="Twitch Channel" width={1280} height={720} className="w-full rounded-lg transition-transform duration-300 group-hover:scale-[1.02]" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.svg'; }} />
          </a>
          <p className="text-theme-secondary dark:text-theme-secondary-dark mb-4">Join my live streams for real-time coding, gaming, and creative sessions. Follow to get notified when I go live.</p>
          <a href="https://www.twitch.tv/mungdaal321" target="_blank" rel="noreferrer" className="inline-block px-4 py-2 rounded bg-theme-action dark:bg-theme-action-dark text-white font-medium hover:opacity-90 transition-opacity">
            Visit Channel
          </a>
        </section>
      </div>

      {/* Popular Videos by Category */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-8 border-b border-theme-accent/20 dark:border-theme-accent-dark pb-4">
          <h2 className="text-2xl font-bold text-theme-primary dark:text-theme-primary-dark font-display">Featured Archive Videos</h2>
          <span className="text-xs font-mono-tech text-theme-secondary dark:text-theme-secondary-dark">Click to play in theater mode</span>
        </div>

        {popularVideos.map((section) => (
          <div key={section.category} className="mb-10">
            <h3 className="text-lg font-semibold mb-4 text-theme-accent dark:text-theme-accent-dark flex items-center gap-2 font-display">
              <span className="w-1 h-6 bg-theme-accent dark:bg-theme-accent-dark rounded"></span>
              {section.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {section.items.map((video) => {
                return (
                  <button
                    key={video.title}
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    className="group rounded-xl border border-theme-accent/30 dark:border-theme-accent-dark/30 bg-theme-card dark:bg-theme-card-dark overflow-hidden hover:border-theme-action dark:hover:border-theme-action-dark transition-all duration-300 hover:shadow-lg text-left block w-full focus:outline-none"
                  >
                    <div className="relative overflow-hidden bg-theme-bg dark:bg-theme-bg-dark">
                      <img
                        loading="lazy"
                        decoding="async"
                        src={video.thumb}
                        alt={video.title}
                        width={1280}
                        height={720}
                        className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.svg'; }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="w-12 h-12 rounded-full bg-theme-action/90 text-white flex items-center justify-center text-lg shadow-lg">
                          ▶
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-theme-primary dark:text-theme-primary-dark line-clamp-2 group-hover:text-theme-action dark:group-hover:text-theme-action-dark transition-colors">
                        {video.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* In-Page Video Theater Modal */}
      {activeVideo && (
        <dialog
          open
          className="fixed inset-0 z-50 m-0 p-4 w-full h-full max-w-none max-h-none bg-black/85 backdrop-blur-md flex items-center justify-center border-0 text-inherit"
          onKeyDown={(e) => { if (e.key === 'Escape') setActiveVideo(null); }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-transparent border-0"
            aria-label="Close video"
            onClick={() => setActiveVideo(null)}
          />
          <div className="relative z-10 w-full max-w-4xl bg-theme-card dark:bg-theme-card-dark rounded-2xl overflow-hidden shadow-2xl border border-theme-accent/30 dark:border-theme-accent-dark/40">
            <div className="flex items-center justify-between p-4 border-b border-theme-accent/20 dark:border-theme-accent-dark/30">
              <h3 className="font-display font-bold text-base sm:text-lg text-theme-primary dark:text-theme-primary-dark truncate pr-4">
                {activeVideo.title}
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href={activeVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono-tech px-2.5 py-1 rounded border border-theme-accent/40 text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-primary"
                >
                  Open in Tab ↗
                </a>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="w-8 h-8 rounded-full border border-theme-accent/30 flex items-center justify-center text-xs font-bold text-theme-primary dark:text-theme-secondary-dark hover:bg-theme-accent/10"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={getEmbedUrl(activeVideo.url)}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
