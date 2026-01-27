import React from 'react';

const socials = [
  { href: 'https://github.com/robfernan', label: 'GitHub', icon: 'fa-github' },
  { href: 'https://linkedin.com/in/robfernan', label: 'LinkedIn', icon: 'fa-linkedin' },
  { href: 'https://www.twitch.tv/mungdaal321', label: 'Twitch', icon: 'fa-twitch' },
  { href: 'https://www.youtube.com/@MungDaal321', label: 'YouTube', icon: 'fa-youtube' },
];

type FooterProps = {
  theme?: string;
}

export default function Footer(_: FooterProps) {
  return (
    <footer className="w-full py-6 bg-theme-footer dark:bg-theme-footer-dark border-t border-theme-accent dark:border-theme-accent-dark mt-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center px-4">
        <div className="flex space-x-6 mb-2">
          {socials.map(s => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              className="text-2xl text-theme-accent dark:text-theme-accent-dark hover:text-theme-action dark:hover:text-theme-action-dark transition-colors duration-300"
            >
              <i className={`fab ${s.icon}`}></i>
            </a>
          ))}
        </div>
        <div className="text-theme-secondary dark:text-theme-secondary-dark text-sm">Robert Fernandez 2026</div>
      </div>
    </footer>
  );
}
