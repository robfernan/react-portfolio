

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import PortfolioHome from './PortfolioHome';
import Projects from './projects';
import Art from './Art';
import Streaming from './Streaming';
import AviationProApp from './aviationpro/AviationProApp';
import Footer from './Footer';
import BackToTop from './components/ui/BackToTop';

export default function App() {
	return (
		<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
			<AppWithDynamicName />
		</Router>
	);
}

function AppWithDynamicName() {
		const location = useLocation();
		const isStreaming = location.pathname.startsWith('/streaming');
		const displayName = isStreaming ? 'MungDaal321' : 'Robert Fernandez';

		// Theme and dark mode state
			const [darkMode, setDarkMode] = React.useState(() => {
				if (typeof window !== 'undefined') {
					return localStorage.getItem('themeMode') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;
				}
				return false;
			});

			React.useEffect(() => {
				document.documentElement.classList.add('theme-minimal');
				if (darkMode) {
					document.documentElement.classList.add('dark');
					localStorage.setItem('themeMode', 'dark');
				} else {
					document.documentElement.classList.remove('dark');
					localStorage.setItem('themeMode', 'light');
				}
			}, [darkMode]);

			const toggleDarkMode = () => setDarkMode(dm => !dm);

				// Theme switching logic
				const themes = [
					{ key: 'minimal', icon: 'fa-circle', label: 'Minimal' },
					{ key: 'slate', icon: 'fa-square', label: 'Slate' },
					{ key: '90s', icon: 'fa-compact-disc', label: '90s' },
				];

				const [theme, setTheme] = React.useState(() => {
					const htmlClass = document.documentElement.className.match(/theme-([a-z]+)/)?.[1];
					return htmlClass || 'minimal';
				});

				const setThemeClass = (themeKey: string) => {
					document.documentElement.classList.remove(...themes.map(t => `theme-${t.key}`));
					document.documentElement.classList.add(`theme-${themeKey}`);
					setTheme(themeKey);
				};

				React.useEffect(() => {
					// ensure at least the current theme class exists on load
					if (!document.documentElement.className.includes(`theme-${theme}`)) {
						document.documentElement.classList.add(`theme-${theme}`);
					}
				}, []);

				const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

				return (
					<div className="min-h-screen bg-theme-bg dark:bg-theme-bg-dark transition-colors duration-300 flex flex-col">
						<header className="bg-theme-header dark:bg-theme-header-dark shadow transition-colors duration-300">
							<nav className="max-w-5xl mx-auto px-4 py-3">
								<div className="flex items-center justify-between">
									<Link to="/" className="text-xl font-bold text-theme-primary dark:text-theme-primary-dark hover:underline">{displayName}</Link>
									
									{/* Desktop Navigation */}
									<div className="hidden md:flex items-center space-x-6">
										<Link to="/projects" className="text-theme-secondary dark:text-theme-secondary-dark hover:underline">Projects</Link>
										<Link to="/art" className="text-theme-secondary dark:text-theme-secondary-dark hover:underline">Art</Link>
										<Link to="/aviationpro" className="text-theme-secondary dark:text-theme-secondary-dark hover:underline">Aviation</Link>
										<Link to="/streaming" className="text-theme-secondary dark:text-theme-secondary-dark hover:underline">Streaming</Link>
										<a href="https://robertfernandez1.wordpress.com/" target="_blank" rel="noopener noreferrer" className="text-theme-secondary dark:text-theme-secondary-dark hover:underline">Blog</a>
									</div>

									{/* Theme Controls */}
									<div className="hidden md:flex items-center space-x-2">
										{themes.map(t => (
											<button
												key={t.key}
												onClick={() => setThemeClass(t.key)}
												className={`p-2 rounded-full border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark text-theme-accent dark:text-theme-accent-dark hover:bg-theme-accent hover:text-white dark:hover:bg-theme-accent-dark dark:hover:text-white transition-colors duration-300 ${theme === t.key ? 'ring-2 ring-theme-action dark:ring-theme-action-dark' : ''}`}
												aria-label={`Switch to ${t.label} theme`}
												title={t.label}
											>
												<i className={`fas ${t.icon}`}></i>
											</button>
										))}
										<button
											onClick={toggleDarkMode}
											className="ml-2 p-2 rounded-full border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark text-theme-accent dark:text-theme-accent-dark hover:bg-theme-accent hover:text-white dark:hover:bg-theme-accent-dark dark:hover:text-white transition-colors duration-300"
											aria-label="Toggle dark mode"
										>
											{darkMode ? (
												<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
											) : (
												<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
											)}
										</button>
									</div>

									{/* Mobile Menu Button */}
									<button
										onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
										className="md:hidden p-2 rounded-lg text-theme-primary dark:text-theme-primary-dark"
										aria-label="Toggle menu"
									>
										<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											{mobileMenuOpen ? (
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
											) : (
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
											)}
										</svg>
									</button>
								</div>

								{/* Mobile Menu */}
								{mobileMenuOpen && (
									<div className="md:hidden mt-4 pb-4 space-y-3">
										<Link 
											to="/projects" 
											className="block py-2 text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-accent dark:hover:text-theme-accent-dark"
											onClick={() => setMobileMenuOpen(false)}
										>
											Projects
										</Link>
										<Link 
											to="/art" 
											className="block py-2 text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-accent dark:hover:text-theme-accent-dark"
											onClick={() => setMobileMenuOpen(false)}
										>
											Art
										</Link>
										<Link 
											to="/aviationpro" 
											className="block py-2 text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-accent dark:hover:text-theme-accent-dark"
											onClick={() => setMobileMenuOpen(false)}
										>
											Aviation
										</Link>
										<Link 
											to="/streaming" 
											className="block py-2 text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-accent dark:hover:text-theme-accent-dark"
											onClick={() => setMobileMenuOpen(false)}
										>
											Streaming
										</Link>
										<a
											href="https://robertfernandez1.wordpress.com/"
											target="_blank"
											rel="noopener noreferrer"
											className="block py-2 text-theme-secondary dark:text-theme-secondary-dark hover:text-theme-accent dark:hover:text-theme-accent-dark"
											onClick={() => setMobileMenuOpen(false)}
										>
											Blog
										</a>
										
										{/* Mobile Theme Controls */}
										<div className="pt-4 border-t border-theme-accent/20 dark:border-theme-accent-dark/20">
											<div className="flex items-center justify-between">
												<span className="text-sm text-theme-secondary dark:text-theme-secondary-dark">Theme</span>
												<div className="flex items-center space-x-2">
													{themes.map(t => (
														<button
															key={t.key}
															onClick={() => setThemeClass(t.key)}
															className={`p-2 rounded-full border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark text-theme-accent dark:text-theme-accent-dark hover:bg-theme-accent hover:text-white dark:hover:bg-theme-accent-dark dark:hover:text-white transition-colors duration-300 ${theme === t.key ? 'ring-2 ring-theme-action dark:ring-theme-action-dark' : ''}`}
															aria-label={`Switch to ${t.label} theme`}
															title={t.label}
														>
															<i className={`fas ${t.icon} text-xs`}></i>
														</button>
													))}
													<button
														onClick={toggleDarkMode}
														className="p-2 rounded-full border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark text-theme-accent dark:text-theme-accent-dark hover:bg-theme-accent hover:text-white dark:hover:bg-theme-accent-dark dark:hover:text-white transition-colors duration-300"
														aria-label="Toggle dark mode"
													>
														{darkMode ? (
															<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
														) : (
															<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
														)}
													</button>
												</div>
											</div>
										</div>
									</div>
								)}
							</nav>
						</header>
						<main className="flex-1 pb-24">
							<Routes>
									<Route path="/" element={<PortfolioHome />} />
									<Route path="/projects" element={<Projects />} />
									<Route path="/art" element={<Art />} />
									<Route path="/aviationpro/*" element={<AviationProApp darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
									<Route path="/streaming" element={<Streaming />} />
								</Routes>
							</main>
							<Footer theme={theme} />
							<BackToTop />
						</div>
	);
}
