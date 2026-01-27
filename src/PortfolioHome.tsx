import React from 'react';
import Layout from './components/layout/Layout';
import { Link } from 'react-router-dom';

// Timeline data
const timelineData = [
  { title: "Started Coding", date: "2012", description: "Began my journey into programming, exploring C++, game engines, and creative coding." },
  { title: "Forest Hill Community High School — Digital Design (Entered)", date: "Aug 2015", description: "Began Digital Design studies at Forest Hill Community High School — focused on graphic and multimedia design fundamentals." },
  { title: "ACE Mentor Program — 2nd Place", date: "May 2018", description: "Issued by ACE Mentor Program — 2nd Place in the ACE (Architect, Construction & Engineering) Mentor Program." },
  { title: "Senior Awards Night — Forest Hill Community High School", date: "May 2018", description: "Recognized at Senior Awards Night — issued by Forest Hill Community High School." },
  { title: "Forest Hill Community High School — Left / Senior Finish", date: "May 2019", description: "Completed senior year and left Forest Hill Community High School in May 2019." },
  { title: "Entered Florida Atlantic University", date: "Aug 2019", description: "Started studies at FAU, pursuing interests in software, hardware, and applied computing." },
  { title: "COP3014 — Programming Concepts & Logic", date: "Feb 24 2020", description: "Completed COP3014 coursework focusing on programming fundamentals and problem solving." },
  { title: "CDA3201 — Intro to Logic Design (Arduino Nano Microprocessor)", date: "Jul 24 2020", description: "Completed introductory logic design coursework using Arduino Nano microprocessors and basic digital circuits." },
  { title: "CDA3331C — Intro to Microprocessors (MSP430 TI)", date: "Aug 16 2020", description: "Covered MSP430 microcontroller programming, MIPS assembly basics, and embedded C for microprocessor applications." },
  { title: "FAU Associations — Aerospace Experimental & Google Developer Student Club", date: "2020–2021", description: "Active member of FAU Aerospace Experimental Association and FAU GDSC — collaborated on projects and learning events." },
  { title: "COP3813 — Intro to Internet Computing (Web Dev: HTML/CSS/JS)", date: "Jan 24 2021", description: "Introduced to web development concepts including HTML, CSS, and JavaScript through COP3813." },
  { title: "COP4045 — Python Programming", date: "Dec 5 2021", description: "Completed COP4045 focusing on Python programming and applied scripting techniques." },
  { title: "Left Florida Atlantic University", date: "Dec 2022", description: "Completed coursework and transitioned to focus on professional projects and independent development." },
  { title: "Learned SFML & Love2D", date: "Jan 2023", description: "Studied and practiced SFML and Love2D for game development, which informed later game prototypes and jams." },
  { title: "Started SSI Open Water Diver Course", date: "Feb 13 2023", description: "In Progress\nBegan SSI Open Water Diver training to pursue recreational scuba certification." },
  { title: "Android Watch Face Studio — First Watch Face", date: "Jun 8 2023", description: "Created a first watch face using Android Watch Face Studio — a minimalist, readable design for wearable screens." },
  { title: "Graduate SSI Open Water Diver & Enriched Air Nitrox Level 2", date: "Dec 31 2023", description: "Completed SSI Open Water Diver certification and Enriched Air Nitrox Level 2 training." },
  { title: "First Discovery Flight for Private Pilot", date: "Feb 4 2024", description: "Completed first discovery flight towards private pilot training — an important step into aviation." },
  { title: "First Solo Flight — Student Pilot (Private Pilot Course)", date: "Dec 21 2024", description: "Completed my first solo flight as part of private pilot training — milestone flight toward certification." },
  { title: "Christmas Horror Game — Love2D", date: "Dec 26 2024", description: "Released a short horror-themed Love2D game built over the holiday — jam entry and experimental prototype." },
  { title: "XMB Wave Menu — HTML/CSS/JS (PlayStation XMB style)", date: "Dec 29 2024", description: "Built a web-based PlayStation XMB-style home page and shortcut launcher with familiar wave menu navigation." },
  { title: "Desktop Environment — Web-based OS-like UI", date: "Jan 23 2025", description: "Created an all-in-one web desktop environment that mimics an operating system with app shortcuts and windowed interfaces." },
  { title: "Unity - Car Simulation Test", date: "Apr 8 2025", description: "Built a car simulation prototype in Unity to test physics, steering, and suspension behaviors for game prototypes." },
  { title: "PSP Development — Minimalist PSPSDK (Tutorial)", date: "Jul 22 2025", description: "Followed a PSP PSPSDK tutorial; added custom font colors, 'Hello world', polygon drawing, a 3D cube, and PSP debug controls mapping." },
  { title: "PS1 Development — MIPS/Assembly (Pikuma Course)", date: "Jul 25 2025", description: "Completed Pikuma's PS1 development course covering Changing Background Color, Triangle & Quads, and Gouraud shading using MIPS-Assembly concepts." },
  { title: "Towered Solos Finished — FT Pierce (Full stop & taxi-backs)", date: "Jul 30 2025", description: "Completed towered solo operations at Ft Pierce — full-stop landings and taxi-back procedures." },
  { title: "Hopeless Catch — Fishing Horror Game Jam", date: "Aug 28 2025", description: "Released the Hopeless Catch demo for the Fishing Horror Game Jam — my first game jam; playable build, screenshots, and dev notes.", link: "https://mungdaal321.itch.io/hopeless-catch" },
  { title: "Defold Music Player", date: "Sep 3 2025", description: "Released a Defold-based music player demo showcasing UI and playback features." },
  { title: "AviationPro Launch", date: "Sep 7 2025", description: "Released AviationPro on Sept 7, 2025 — a professional-grade flight planning suite for pilots and enthusiasts." },
];

// Dummy Card and Button if originals are missing
const Card: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <div className="rounded-lg border p-3 sm:p-4 shadow-md bg-theme-bg dark:bg-theme-bg-dark">{children}</div>
);
const Button: React.FC<React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>> = ({ children, ...props }) => (
  <button className="px-3 sm:px-4 py-2 rounded bg-theme-accent text-white text-sm sm:text-base hover:bg-theme-accent/90 transition-colors" {...props}>{children}</button>
);

export default function PortfolioHome() {
  return (
    <Layout>
      <section className="max-w-5xl mx-auto py-8 sm:py-12 md:py-16 px-4">
        {/* Hero/About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start mb-8 md:mb-12">
          <div className="lg:col-span-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3 text-theme-primary dark:text-theme-primary-dark">Robert Fernandez</h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-theme-accent dark:text-theme-accent-dark">About Me</h2>
            <p className="mb-3 text-sm sm:text-base md:text-lg text-theme-secondary dark:text-theme-secondary-dark leading-relaxed">
              I'm a passionate developer with expertise in SFML and Love2D, constantly exploring new ways to bring my ideas to life through code and design. Whether it's creating immersive games or building digital art, I strive to blend creativity and functionality in everything I do.
            </p>
            <p className="mb-3 text-sm sm:text-base md:text-lg text-theme-secondary dark:text-theme-secondary-dark leading-relaxed">
              Beyond the screen, I embrace adventure in real life as well—I'm a private pilot in training, a certified scuba diver, an avid fisherman, and a hunter. My love for exploration extends into my hobbies, which include playing adventure, survival, and horror games.
            </p>
            {/* Featured Work Card inserted here so it appears directly after the intro */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-6">
              <Card>
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-theme-primary dark:text-theme-primary-dark">AviationPro</h3>
                    <p className="mb-4 text-sm sm:text-base text-theme-secondary dark:text-theme-secondary-dark">A professional-grade flight planning suite for pilots and enthusiasts.</p>
                  </div>
                  <div>
                    <Link to="/aviationpro"><Button>View AviationPro</Button></Link>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="mb-4 overflow-hidden">
                      <iframe
                        frameBorder="0"
                        src="https://itch.io/embed/3836499?linkback=true"
                        className="w-full max-w-full"
                        style={{ maxWidth: '552px', height: '167px' }}
                        title="Hopeless Catch on itch.io"
                      >
                        <a href="https://mungdaal321.itch.io/hopeless-catch">Hopeless Catch by MungDaal321</a>
                      </iframe>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          {/* Right column: thumbnails / highlights */}
          <aside className="lg:col-span-1 flex flex-row lg:flex-col gap-3 sm:gap-4 overflow-x-auto lg:overflow-x-visible scrollbar-hide">
            <figure className="flex-shrink-0 w-48 sm:w-56 lg:w-full overflow-hidden rounded-lg border border-theme-accent dark:border-theme-accent-dark shadow-sm">
              <img loading="lazy" decoding="async" src="/assets/car-art.jpg" alt="Car Art" className="w-full h-32 sm:h-44 object-cover" />
            </figure>
            <figure className="flex-shrink-0 w-48 sm:w-56 lg:w-full overflow-hidden rounded-lg border border-theme-accent dark:border-theme-accent-dark shadow-sm">
              <img loading="lazy" decoding="async" src="/assets/love2d_music_player.png" alt="Music Player" className="w-full h-32 sm:h-44 object-cover" />
            </figure>
            <figure className="flex-shrink-0 w-48 sm:w-56 lg:w-full overflow-hidden rounded-lg border border-theme-accent dark:border-theme-accent-dark shadow-sm">
              <img loading="lazy" decoding="async" src="/assets/comic_book_reader_sfml.png" alt="Comic Reader" className="w-full h-32 sm:h-44 object-cover" />
            </figure>
          </aside>
        </div>

        {/* Timeline Section */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-theme-primary dark:text-theme-primary-dark text-center">My Journey</h2>
          <ol className="relative border-l-2 sm:border-l-4 border-theme-accent dark:border-theme-accent-dark max-w-5xl mx-auto pl-6 sm:pl-8 md:pl-12">
            {timelineData.map((item, idx) => (
              <li key={idx} className="mb-8 sm:mb-10 relative">
                <span className="absolute -left-4 sm:-left-5 md:-left-6 top-0 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-theme-action dark:bg-theme-action-dark rounded-full ring-2 sm:ring-4 ring-theme-bg dark:ring-theme-bg-dark z-10" style={{transform: 'translateY(0.25rem)'}}>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z" /></svg>
                </span>
                <div className="pl-4 sm:pl-6 md:pl-8">
                  <div className="flex flex-col gap-1 sm:gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-theme-primary dark:text-theme-primary-dark">{item.title}</h3>
                    <span className="bg-theme-accent dark:bg-theme-accent-dark text-white text-xs font-medium px-2 py-0.5 rounded self-start">{item.date}</span>
                  </div>
                  <p className="text-sm sm:text-base text-theme-secondary dark:text-theme-secondary-dark whitespace-pre-line">{item.description}</p>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base text-theme-accent dark:text-theme-accent-dark font-medium underline ml-1">Play it on itch.io</a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </Layout>
  );
}
