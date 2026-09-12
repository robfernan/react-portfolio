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
    items: [ { title: 'Car Sketch Video', url: 'https://youtu.be/-7a2JQIbCOk?si=gVuh0eYNBZvQ292f', thumb: '/assets/streaming/drawing-video.webp' } ]
  },
  {
    category: 'Coding',
    items: [
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

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 bg-theme-bg dark:bg-theme-bg-dark transition-colors duration-300">
      <header className="mb-8 border-b border-theme-accent/20 dark:border-theme-accent-dark pb-6">
        <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-theme-accent dark:text-theme-secondary-dark mb-3 flex items-center gap-3">
          <span className="w-8 h-px bg-theme-accent dark:bg-theme-accent-dark" />
          MungDaal321 · Live
        </p>
        <h1 className="text-3xl sm:text-4xl font-black leading-[1.05] mb-3 text-theme-primary dark:text-theme-secondary-dark">Streaming</h1>
        <p className="text-sm sm:text-base text-theme-secondary dark:text-theme-secondary-dark leading-relaxed max-w-2xl">A working notebook in public — live coding, automotive sketching, embedded experiments, aviation tools, and games.</p>
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
        <section className="youtube border-t-4 border-red-600 dark:border-red-500 bg-theme-card dark:bg-theme-card-dark p-6 flex-1 mb-6 md:mb-0">
          <div className="flex items-center gap-3 mb-4">
            <i className="fab fa-youtube text-red-600 dark:text-red-500 text-2xl"></i>
            <h2 className="text-2xl font-semibold text-theme-primary dark:text-theme-primary-dark">YouTube</h2>
          </div>
          <a href="https://www.youtube.com/@MungDaal321" target="_blank" rel="noreferrer" className="block mb-4 group">
            <img loading="lazy" decoding="async" src={youtubeThumb} alt="YouTube Channel" width={1280} height={720} className="w-full rounded-lg transition-shadow" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.svg'; }} />
          </a>
          <p className="text-theme-secondary dark:text-theme-secondary-dark mb-4">Check out my latest YouTube content and subscribe for updates on gaming, coding, and creative projects.</p>
          <a href="https://www.youtube.com/@MungDaal321" target="_blank" rel="noreferrer" className="inline-block px-4 py-2 rounded bg-theme-action dark:bg-theme-action-dark text-white font-medium hover:opacity-90 transition-opacity">
            Visit Channel
          </a>
        </section>

        {/* Twitch */}
        <section className="twitch border-t-4 border-purple-600 dark:border-purple-500 bg-theme-card dark:bg-theme-card-dark p-6 flex-1">
          <div className="flex items-center gap-3 mb-4">
            <i className="fab fa-twitch text-purple-600 dark:text-purple-500 text-2xl"></i>
            <h2 className="text-2xl font-semibold text-theme-primary dark:text-theme-primary-dark">Twitch</h2>
          </div>
          <a href="https://www.twitch.tv/mungdaal321" target="_blank" rel="noreferrer" className="block mb-4 group">
            <img loading="lazy" decoding="async" src={twitchThumb} alt="Twitch Channel" width={1280} height={720} className="w-full rounded-lg transition-shadow" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.svg'; }} />
          </a>
          <p className="text-theme-secondary dark:text-theme-secondary-dark mb-4">Join my live streams for real-time coding, gaming, and creative sessions. Follow to get notified when I go live.</p>
          <a href="https://www.twitch.tv/mungdaal321" target="_blank" rel="noreferrer" className="inline-block px-4 py-2 rounded bg-theme-action dark:bg-theme-action-dark text-white font-medium hover:opacity-90 transition-opacity">
            Visit Channel
          </a>
        </section>
      </div>

      {/* Popular Videos by Category */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-8 text-theme-primary dark:text-theme-primary-dark">Popular Videos</h2>
        
        {popularVideos.map((section) => (
          <div key={section.category} className="mb-10">
            <h3 className="text-lg font-semibold mb-4 text-theme-accent dark:text-theme-accent-dark flex items-center gap-2">
              <span className="w-1 h-6 bg-theme-accent dark:bg-theme-accent-dark rounded"></span>
              {section.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {section.items.map((video) => {
                return (
                  <a
                    key={video.title}
                    href={video.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded border border-theme-accent/30 dark:border-theme-accent-dark/30 bg-theme-card dark:bg-theme-card-dark overflow-hidden hover:border-theme-accent dark:hover:border-theme-accent-dark transition-all duration-300 hover:shadow-lg block"
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
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-theme-primary dark:text-theme-primary-dark line-clamp-2 group-hover:text-theme-accent dark:group-hover:text-theme-accent-dark transition-colors">
                        {video.title}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
