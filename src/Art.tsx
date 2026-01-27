export default function Art() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 bg-theme-bg dark:bg-theme-bg-dark transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-theme-primary dark:text-theme-primary-dark">Art & Design</h1>
      <p className="mb-8 text-theme-secondary dark:text-theme-secondary-dark">A selection of my graphic design, digital art, and UI/UX work. See more on my art platforms below.</p>
      {/* Removed Car UI Concept, Album Cover Series, and Comic Reader UI */}

      {/* Removed 'View full gallery' button */}
      {/* Social/Art platforms section, thumbnails now use object-contain for full image display */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-6 text-theme-primary dark:text-theme-primary-dark">Find me on</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <a href="https://www.pinterest.com/fernandez7466/_profile/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest profile" className="group rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden hover:shadow-lg transition-all">
            <div className="relative overflow-hidden bg-theme-bg dark:bg-theme-bg-dark h-40">
              <img src="/assets/art/pinterest-thumbnail.png" alt="Pinterest" className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-theme-primary dark:text-theme-primary-dark">Pinterest</h4>
              <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark">Moodboards & inspiration</p>
            </div>
          </a>
          <a href="https://www.artstation.com/robfernan" target="_blank" rel="noopener noreferrer" aria-label="ArtStation profile" className="group rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden hover:shadow-lg transition-all">
            <div className="relative overflow-hidden bg-theme-bg dark:bg-theme-bg-dark h-40">
              <img src="/assets/art/artstation-thumbnail.png" alt="ArtStation" className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-theme-primary dark:text-theme-primary-dark">ArtStation</h4>
              <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark">3D & digital art</p>
            </div>
          </a>
          <a href="https://www.behance.net/robertfern5088" target="_blank" rel="noopener noreferrer" aria-label="Behance profile" className="group rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden hover:shadow-lg transition-all">
            <div className="relative overflow-hidden bg-theme-bg dark:bg-theme-bg-dark h-40">
              <img src="/assets/art/behance-thumbnail.png" alt="Behance" className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-theme-primary dark:text-theme-primary-dark">Behance</h4>
              <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark">UI/UX design</p>
            </div>
          </a>
          <a href="https://mungdaal321.itch.io/" target="_blank" rel="noopener noreferrer" aria-label="Itch.io profile" className="group rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden hover:shadow-lg transition-all">
            <div className="relative overflow-hidden bg-theme-bg dark:bg-theme-bg-dark h-40">
              <img src="/assets/art/itch-thumbnail.png" alt="Itch.io" className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-theme-primary dark:text-theme-primary-dark">Itch.io</h4>
              <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark">Game assets & demos</p>
            </div>
          </a>
          <a href="https://www.deviantart.com/rober321" target="_blank" rel="noopener noreferrer" aria-label="DeviantArt profile" className="group rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark overflow-hidden hover:shadow-lg transition-all">
            <div className="relative overflow-hidden bg-theme-bg dark:bg-theme-bg-dark h-40">
              <img src="/assets/art/deviantart-thumbnail.png" alt="DeviantArt" className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-theme-primary dark:text-theme-primary-dark">DeviantArt</h4>
              <p className="text-sm text-theme-secondary dark:text-theme-secondary-dark">Sketches & concepts</p>
            </div>
          </a>
        </div>
      </div>
      {/* Recommendation: For a more dynamic art page, consider using a lightbox gallery (e.g., react-image-lightbox) or a masonry grid for better image presentation and interactivity. */}
    </div>
  );
}
