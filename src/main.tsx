
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';
import './theme-vars.css';
import './fontawesome-import';

// Register the service worker in production for offline support + asset caching.
// Skipped in dev so Vite's HMR / module reloading isn't affected.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js').catch(() => {});
	});
}

const rootElement = document.getElementById('root');
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
} else {
	throw new Error('Root element not found');
}
