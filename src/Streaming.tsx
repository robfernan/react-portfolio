import { useEffect, useState } from 'react';

type Video = { title: string; url: string; thumb: string };

const popularVideos: { category: string; items: Video[] }[] = [
  {
    category: 'Gaming Videos',
    items: [
      { title: 'Last Day on Earth Gameplay', url: 'https://www.youtube.com/live/-Er2Pmy0HZI?si=rr01QQwgWI6XbJDb', thumb: '/assets/gameplay-video1.jpg' },
      { title: 'theHunter Classic Gameplay', url: 'https://youtu.be/eXnNIszUU7E?si=IPZ_z_-1IyRqVwnG', thumb: '/assets/gameplay-video2.jpg' },
      { title: 'Halloween Stream theHunter Classic', url: 'https://www.twitch.tv/videos/2303292671', thumb: '/assets/gameplay-video3.jpg' }
    ]
  },
  {
    category: 'Drawing',
    items: [ { title: 'Car Sketch Video', url: 'https://youtu.be/-7a2JQIbCOk?si=gVuh0eYNBZvQ292f', thumb: '/assets/drawing-video.jpg' } ]
  },
  {
    category: 'Coding',
    items: [
      { title: 'XMB in SFML', url: 'https://www.youtube.com/watch?v=qLEClZEXr68&t=11850s', thumb: '/assets/coding-video1.jpg' },
      { title: 'Personal Website Build', url: 'https://www.twitch.tv/videos/2334965535', thumb: '/assets/coding-video2.jpg' }
    ]
  }
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

  const youtubeThumb = (dark: boolean) => (dark ? '/assets/youtube-thumbnail-dark.jpg' : '/assets/youtube-thumbnail-dark.jpg');
  const twitchThumb = (dark: boolean) => (dark ? '/assets/twitch-thumbnail-dark.jpg' : '/assets/twitch-thumbnail-dark.jpg');

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 bg-theme-bg dark:bg-theme-bg-dark transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-2 text-theme-primary dark:text-theme-primary-dark">Streaming</h1>
      <p className="mb-8 text-theme-secondary dark:text-theme-secondary-dark">Where I stream — live coding, art, and gaming on Twitch and YouTube.</p>

      {/* Main Platforms Section */}
      <div className="streaming-layout md:flex md:gap-6 mb-12">
        {/* YouTube */}
        <section className="youtube rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark p-6 flex-1 mb-6 md:mb-0">
          <div className="flex items-center gap-3 mb-4">
            <i className="fab fa-youtube text-red-600 dark:text-red-500 text-2xl"></i>
            <h2 className="text-2xl font-semibold text-theme-primary dark:text-theme-primary-dark">YouTube</h2>
          </div>
          <a href="https://www.youtube.com/@MungDaal321" target="_blank" rel="noreferrer" className="block mb-4 group">
            <img loading="lazy" decoding="async" src={youtubeThumb(isDark)} alt="YouTube Channel" className="w-full rounded-lg shadow-md group-hover:shadow-lg transition-shadow" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.svg'; }} />
          </a>
          <p className="text-theme-secondary dark:text-theme-secondary-dark mb-4">Check out my latest YouTube content and subscribe for updates on gaming, coding, and creative projects.</p>
          <a href="https://www.youtube.com/@MungDaal321" target="_blank" rel="noreferrer" className="inline-block px-4 py-2 rounded bg-theme-action dark:bg-theme-action-dark text-white font-medium hover:opacity-90 transition-opacity">
            Visit Channel
          </a>
        </section>

        {/* Twitch */}
        <section className="twitch rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark p-6 flex-1">
          <div className="flex items-center gap-3 mb-4">
            <i className="fab fa-twitch text-purple-600 dark:text-purple-500 text-2xl"></i>
            <h2 className="text-2xl font-semibold text-theme-primary dark:text-theme-primary-dark">Twitch</h2>
          </div>
          <a href="https://www.twitch.tv/mungdaal321" target="_blank" rel="noreferrer" className="block mb-4 group">
            <img loading="lazy" decoding="async" src={twitchThumb(isDark)} alt="Twitch Channel" className="w-full rounded-lg shadow-md group-hover:shadow-lg transition-shadow" onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.svg'; }} />
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
              {section.items.map((video) => (
                <a
                  key={video.title}
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded border border-theme-accent/30 dark:border-theme-accent-dark/30 bg-theme-card dark:bg-theme-card-dark overflow-hidden hover:border-theme-accent dark:hover:border-theme-accent-dark transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative overflow-hidden bg-theme-bg dark:bg-theme-bg-dark aspect-video">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={video.thumb}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.svg'; }}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <i className="fas fa-play text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity"></i>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-theme-primary dark:text-theme-primary-dark line-clamp-2 group-hover:text-theme-accent dark:group-hover:text-theme-accent-dark transition-colors">
                      {video.title}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
