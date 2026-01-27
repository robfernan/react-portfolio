export default function Art() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 bg-theme-bg dark:bg-theme-bg-dark transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-theme-primary dark:text-theme-primary-dark">Art & Design</h1>
      <p className="mb-8 text-theme-secondary dark:text-theme-secondary-dark">A selection of my graphic design, digital art, and UI/UX work. See more on my art platforms below.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden">
          <img src="/assets/car-art.jpg" alt="Car UI Concept" className="w-full h-40 object-cover" />
          <div className="p-3">
            <h4 className="text-theme-primary dark:text-theme-primary-dark font-semibold">Car UI Concept</h4>
            <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark">A minimal instrument cluster concept focused on readability and low distraction.</p>
          </div>
        </div>
        <div className="rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden">
          <img src="/assets/music_player_sfml.png" alt="Album Cover Series" className="w-full h-40 object-cover" />
          <div className="p-3">
            <h4 className="text-theme-primary dark:text-theme-primary-dark font-semibold">Album Cover Series</h4>
            <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark">A series of stylized covers exploring texture and color.</p>
          </div>
        </div>
        <div className="rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden">
          <img src="/assets/comic_book_reader_sfml.png" alt="Comic Reader UI" className="w-full h-40 object-cover" />
          <div className="p-3">
            <h4 className="text-theme-primary dark:text-theme-primary-dark font-semibold">Comic Reader UI</h4>
            <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark">Reader layout optimized for panels and pacing.</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <a href="#" className="inline-block px-3 py-2 rounded bg-theme-action dark:bg-theme-action-dark text-white">View full gallery</a>
      </div>

      <div className="mt-8 border-t border-theme-accent/20 dark:border-theme-accent-dark/20 pt-6">
        <h3 className="text-lg font-semibold mb-6 text-theme-primary dark:text-theme-primary-dark">Find me on</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <a href="https://www.pinterest.com/fernandez7466/_profile/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest profile" className="group rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden hover:shadow-lg transition-all">
            <div className="relative overflow-hidden bg-theme-bg dark:bg-theme-bg-dark h-40">
              <img src="/assets/pinterest-thumbnail.png" alt="Pinterest" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-theme-primary dark:text-theme-primary-dark">Pinterest</h4>
              <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark">Mood boards & inspiration</p>
            </div>
          </a>
          <a href="https://www.artstation.com/robertfernandez7" target="_blank" rel="noopener noreferrer" aria-label="ArtStation profile" className="group rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden hover:shadow-lg transition-all">
            <div className="relative overflow-hidden bg-theme-bg dark:bg-theme-bg-dark h-40">
              <img src="/assets/artstation-thumbnail.png" alt="ArtStation" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-theme-primary dark:text-theme-primary-dark">ArtStation</h4>
              <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark">3D models & renders</p>
            </div>
          </a>
          <a href="https://robertfernandez1.wordpress.com/" target="_blank" rel="noopener noreferrer" aria-label="WordPress blog" className="group rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden hover:shadow-lg transition-all">
            <div className="relative overflow-hidden bg-theme-bg dark:bg-theme-bg-dark h-40">
              <img src="/assets/wordpress-thumbnail.png" alt="WordPress" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-theme-primary dark:text-theme-primary-dark">WordPress</h4>
              <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark">Design blog</p>
            </div>
          </a>
          <a href="https://www.behance.net/robertfern5088" target="_blank" rel="noopener noreferrer" aria-label="Behance profile" className="group rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden hover:shadow-lg transition-all">
            <div className="relative overflow-hidden bg-theme-bg dark:bg-theme-bg-dark h-40">
              <img src="/assets/behance-thumbnail.png" alt="Behance" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-theme-primary dark:text-theme-primary-dark">Behance</h4>
              <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark">UI/UX design</p>
            </div>
          </a>
          <a href="https://mungdaal321.itch.io/" target="_blank" rel="noopener noreferrer" aria-label="Itch.io profile" className="group rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden hover:shadow-lg transition-all">
            <div className="relative overflow-hidden bg-theme-bg dark:bg-theme-bg-dark h-40">
              <img src="/assets/itch-thumbnail.png" alt="Itch.io" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-theme-primary dark:text-theme-primary-dark">Itch.io</h4>
              <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark">Game assets & demos</p>
            </div>
          </a>
          <a href="https://www.deviantart.com/rober321" target="_blank" rel="noopener noreferrer" aria-label="DeviantArt profile" className="group rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden hover:shadow-lg transition-all">
            <div className="relative overflow-hidden bg-theme-bg dark:bg-theme-bg-dark h-40">
              <img src="/assets/deviantart-thumbnail.png" alt="DeviantArt" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-theme-primary dark:text-theme-primary-dark">DeviantArt</h4>
              <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark">Sketches & concepts</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
