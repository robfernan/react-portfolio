import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/Streaming.tsx");const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport1_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=47e875b1";
var _jsxFileName = "C:/Users/User/Documents/Projects/Web_Development/react-typescript-tailwindcss-portfolio/src/Streaming.tsx";
import __vite__cjsImport1_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=47e875b1";
var _s = $RefreshSig$();
const popularVideos = [
	{
		category: "Gaming Videos",
		items: [
			{
				title: "Last Day on Earth Gameplay",
				url: "https://www.youtube.com/live/-Er2Pmy0HZI?si=rr01QQwgWI6XbJDb",
				thumb: "/assets/streaming/gameplay-video1.jpg"
			},
			{
				title: "theHunter Classic Gameplay",
				url: "https://youtu.be/eXnNIszUU7E?si=IPZ_z_-1IyRqVwnG",
				thumb: "/assets/streaming/gameplay-video2.jpg"
			},
			{
				title: "Halloween Stream theHunter Classic",
				url: "https://www.twitch.tv/videos/2303292671",
				thumb: "/assets/streaming/gameplay-video3.jpg"
			}
		]
	},
	{
		category: "Drawing",
		items: [{
			title: "Car Sketch Video",
			url: "https://youtu.be/-7a2JQIbCOk?si=gVuh0eYNBZvQ292f",
			thumb: "/assets/streaming/drawing-video.jpg"
		}]
	},
	{
		category: "Coding",
		items: [{
			title: "XMB in SFML",
			url: "https://www.youtube.com/watch?v=qLEClZEXr68&t=11850s",
			thumb: "/assets/streaming/coding-video1.jpg"
		}, {
			title: "Personal Website Build",
			url: "https://www.twitch.tv/videos/2334965535",
			thumb: "/assets/streaming/coding-video2.jpg"
		}]
	}
];
export default function Streaming() {
	_s();
	const [isDark, setIsDark] = useState(() => typeof document !== "undefined" && document.documentElement.classList.contains("dark"));
	useEffect(() => {
		const obs = new MutationObserver(() => {
			setIsDark(document.documentElement.classList.contains("dark"));
		});
		obs.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"]
		});
		return () => obs.disconnect();
	}, []);
	// Light + dark variants exist for both channel banners; pick by current theme.
	const youtubeThumb = isDark ? "/assets/streaming/youtube-thumbnail-dark.jpg" : "/assets/streaming/youtube-thumbnail-light.jpg";
	const twitchThumb = isDark ? "/assets/streaming/twitch-thumbnail-dark.jpg" : "/assets/streaming/twitch-thumbnail-light.jpg";
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "max-w-6xl mx-auto py-12 px-4 bg-theme-bg dark:bg-theme-bg-dark transition-colors duration-300",
		children: [
			/* @__PURE__ */ _jsxDEV("header", {
				className: "mb-8 border-b border-theme-accent/20 dark:border-theme-accent-dark pb-6",
				children: [
					/* @__PURE__ */ _jsxDEV("p", {
						className: "text-[11px] font-semibold tracking-[0.25em] uppercase text-theme-accent dark:text-theme-secondary-dark mb-3 flex items-center gap-3",
						children: [/* @__PURE__ */ _jsxDEV("span", { className: "w-8 h-px bg-theme-accent dark:bg-theme-accent-dark" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 46,
							columnNumber: 11
						}, this), "MungDaal321 · Live"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 45,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("h1", {
						className: "text-3xl sm:text-4xl font-black leading-[1.05] mb-3 text-theme-primary dark:text-theme-secondary-dark",
						children: "Streaming"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 49,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("p", {
						className: "text-sm sm:text-base text-theme-secondary dark:text-theme-secondary-dark leading-relaxed max-w-2xl",
						children: "Where I stream — live coding, art, and gaming on Twitch and YouTube."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 50,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 44,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "streaming-layout md:flex md:gap-6 mb-12",
				children: [/* @__PURE__ */ _jsxDEV("section", {
					className: "youtube rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark p-6 flex-1 mb-6 md:mb-0",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-3 mb-4",
							children: [/* @__PURE__ */ _jsxDEV("i", { className: "fab fa-youtube text-red-600 dark:text-red-500 text-2xl" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 58,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("h2", {
								className: "text-2xl font-semibold text-theme-primary dark:text-theme-primary-dark",
								children: "YouTube"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 59,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 57,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("a", {
							href: "https://www.youtube.com/@MungDaal321",
							target: "_blank",
							rel: "noreferrer",
							className: "block mb-4 group",
							children: /* @__PURE__ */ _jsxDEV("img", {
								loading: "lazy",
								decoding: "async",
								src: youtubeThumb,
								alt: "YouTube Channel",
								className: "w-full rounded-lg transition-shadow",
								onError: (e) => {
									e.currentTarget.src = "/images/placeholder.svg";
								}
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 62,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 61,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("p", {
							className: "text-theme-secondary dark:text-theme-secondary-dark mb-4",
							children: "Check out my latest YouTube content and subscribe for updates on gaming, coding, and creative projects."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 64,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("a", {
							href: "https://www.youtube.com/@MungDaal321",
							target: "_blank",
							rel: "noreferrer",
							className: "inline-block px-4 py-2 rounded bg-theme-action dark:bg-theme-action-dark text-white font-medium hover:opacity-90 transition-opacity",
							children: "Visit Channel"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 65,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("section", {
					className: "twitch rounded border border-theme-accent dark:border-theme-accent-dark bg-theme-card dark:bg-theme-card-dark p-6 flex-1",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-3 mb-4",
							children: [/* @__PURE__ */ _jsxDEV("i", { className: "fab fa-twitch text-purple-600 dark:text-purple-500 text-2xl" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 73,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("h2", {
								className: "text-2xl font-semibold text-theme-primary dark:text-theme-primary-dark",
								children: "Twitch"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 74,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 72,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("a", {
							href: "https://www.twitch.tv/mungdaal321",
							target: "_blank",
							rel: "noreferrer",
							className: "block mb-4 group",
							children: /* @__PURE__ */ _jsxDEV("img", {
								loading: "lazy",
								decoding: "async",
								src: twitchThumb,
								alt: "Twitch Channel",
								className: "w-full rounded-lg transition-shadow",
								onError: (e) => {
									e.currentTarget.src = "/images/placeholder.svg";
								}
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 77,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 76,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("p", {
							className: "text-theme-secondary dark:text-theme-secondary-dark mb-4",
							children: "Join my live streams for real-time coding, gaming, and creative sessions. Follow to get notified when I go live."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 79,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("a", {
							href: "https://www.twitch.tv/mungdaal321",
							target: "_blank",
							rel: "noreferrer",
							className: "inline-block px-4 py-2 rounded bg-theme-action dark:bg-theme-action-dark text-white font-medium hover:opacity-90 transition-opacity",
							children: "Visit Channel"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 80,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "mt-12",
				children: [/* @__PURE__ */ _jsxDEV("h2", {
					className: "text-2xl font-bold mb-8 text-theme-primary dark:text-theme-primary-dark",
					children: "Popular Videos"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 88,
					columnNumber: 9
				}, this), popularVideos.map((section) => /* @__PURE__ */ _jsxDEV("div", {
					className: "mb-10",
					children: [/* @__PURE__ */ _jsxDEV("h3", {
						className: "text-lg font-semibold mb-4 text-theme-accent dark:text-theme-accent-dark flex items-center gap-2",
						children: [/* @__PURE__ */ _jsxDEV("span", { className: "w-1 h-6 bg-theme-accent dark:bg-theme-accent-dark rounded" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 93,
							columnNumber: 15
						}, this), section.category]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 92,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
						children: section.items.map((video) => {
							return /* @__PURE__ */ _jsxDEV("a", {
								href: video.url,
								target: "_blank",
								rel: "noreferrer",
								className: "group rounded border border-theme-accent/30 dark:border-theme-accent-dark/30 bg-theme-card dark:bg-theme-card-dark overflow-hidden hover:border-theme-accent dark:hover:border-theme-accent-dark transition-all duration-300 hover:shadow-lg block",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "relative overflow-hidden bg-theme-bg dark:bg-theme-bg-dark",
									children: /* @__PURE__ */ _jsxDEV("img", {
										loading: "lazy",
										decoding: "async",
										src: video.thumb,
										alt: video.title,
										className: "w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-[1.04]",
										onError: (e) => {
											e.currentTarget.src = "/images/placeholder.svg";
										}
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 107,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 106,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "p-3",
									children: /* @__PURE__ */ _jsxDEV("p", {
										className: "text-sm font-medium text-theme-primary dark:text-theme-primary-dark line-clamp-2 group-hover:text-theme-accent dark:group-hover:text-theme-accent-dark transition-colors",
										children: video.title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 117,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 116,
									columnNumber: 21
								}, this)]
							}, video.title, true, {
								fileName: _jsxFileName,
								lineNumber: 99,
								columnNumber: 19
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 96,
						columnNumber: 13
					}, this)]
				}, section.category, true, {
					fileName: _jsxFileName,
					lineNumber: 91,
					columnNumber: 11
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 87,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 43,
		columnNumber: 5
	}, this);
}
_s(Streaming, "1AesTq5K+qgooNLgXTPmIbpCGEI=");
_c = Streaming;
var _c;
$RefreshReg$(_c, "Streaming");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/Streaming.tsx?t=1788903537088";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/User/Documents/Projects/Web_Development/react-typescript-tailwindcss-portfolio/src/Streaming.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/User/Documents/Projects/Web_Development/react-typescript-tailwindcss-portfolio/src/Streaming.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/User/Documents/Projects/Web_Development/react-typescript-tailwindcss-portfolio/src/Streaming.tsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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O0VBQ0Y7Ozs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIlN0cmVhbWluZy50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuXHJcbnR5cGUgVmlkZW8gPSB7IHRpdGxlOiBzdHJpbmc7IHVybDogc3RyaW5nOyB0aHVtYjogc3RyaW5nIH07XHJcblxyXG5jb25zdCBwb3B1bGFyVmlkZW9zOiB7IGNhdGVnb3J5OiBzdHJpbmc7IGl0ZW1zOiBWaWRlb1tdIH1bXSA9IFtcclxuICB7XHJcbiAgICBjYXRlZ29yeTogJ0dhbWluZyBWaWRlb3MnLFxyXG4gICAgaXRlbXM6IFtcclxuICAgICAgeyB0aXRsZTogJ0xhc3QgRGF5IG9uIEVhcnRoIEdhbWVwbGF5JywgdXJsOiAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vbGl2ZS8tRXIyUG15MEhaST9zaT1ycjAxUVF3Z1dJNlhiSkRiJywgdGh1bWI6ICcvYXNzZXRzL3N0cmVhbWluZy9nYW1lcGxheS12aWRlbzEuanBnJyB9LFxyXG4gICAgICB7IHRpdGxlOiAndGhlSHVudGVyIENsYXNzaWMgR2FtZXBsYXknLCB1cmw6ICdodHRwczovL3lvdXR1LmJlL2VYbk5Jc3pVVTdFP3NpPUlQWl96Xy0xSXlScVZ3bkcnLCB0aHVtYjogJy9hc3NldHMvc3RyZWFtaW5nL2dhbWVwbGF5LXZpZGVvMi5qcGcnIH0sXHJcbiAgICAgIHsgdGl0bGU6ICdIYWxsb3dlZW4gU3RyZWFtIHRoZUh1bnRlciBDbGFzc2ljJywgdXJsOiAnaHR0cHM6Ly93d3cudHdpdGNoLnR2L3ZpZGVvcy8yMzAzMjkyNjcxJywgdGh1bWI6ICcvYXNzZXRzL3N0cmVhbWluZy9nYW1lcGxheS12aWRlbzMuanBnJyB9XHJcbiAgICBdXHJcbiAgfSxcclxuICB7XHJcbiAgICBjYXRlZ29yeTogJ0RyYXdpbmcnLFxyXG4gICAgaXRlbXM6IFsgeyB0aXRsZTogJ0NhciBTa2V0Y2ggVmlkZW8nLCB1cmw6ICdodHRwczovL3lvdXR1LmJlLy03YTJKUUliQ09rP3NpPWdWdWgwZVlOQlp2UTI5MmYnLCB0aHVtYjogJy9hc3NldHMvc3RyZWFtaW5nL2RyYXdpbmctdmlkZW8uanBnJyB9IF1cclxuICB9LFxyXG4gIHtcclxuICAgIGNhdGVnb3J5OiAnQ29kaW5nJyxcclxuICAgIGl0ZW1zOiBbXHJcbiAgICAgIHsgdGl0bGU6ICdYTUIgaW4gU0ZNTCcsIHVybDogJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9cUxFQ2xaRVhyNjgmdD0xMTg1MHMnLCB0aHVtYjogJy9hc3NldHMvc3RyZWFtaW5nL2NvZGluZy12aWRlbzEuanBnJyB9LFxyXG4gICAgICB7IHRpdGxlOiAnUGVyc29uYWwgV2Vic2l0ZSBCdWlsZCcsIHVybDogJ2h0dHBzOi8vd3d3LnR3aXRjaC50di92aWRlb3MvMjMzNDk2NTUzNScsIHRodW1iOiAnL2Fzc2V0cy9zdHJlYW1pbmcvY29kaW5nLXZpZGVvMi5qcGcnIH1cclxuICAgIF1cclxuICB9XHJcbl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdHJlYW1pbmcoKSB7XHJcbiAgY29uc3QgW2lzRGFyaywgc2V0SXNEYXJrXSA9IHVzZVN0YXRlKCgpID0+IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZGFyaycpKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG9icyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcclxuICAgICAgc2V0SXNEYXJrKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2RhcmsnKSk7XHJcbiAgICB9KTtcclxuICAgIG9icy5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgeyBhdHRyaWJ1dGVzOiB0cnVlLCBhdHRyaWJ1dGVGaWx0ZXI6IFsnY2xhc3MnXSB9KTtcclxuICAgIHJldHVybiAoKSA9PiBvYnMuZGlzY29ubmVjdCgpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgLy8gTGlnaHQgKyBkYXJrIHZhcmlhbnRzIGV4aXN0IGZvciBib3RoIGNoYW5uZWwgYmFubmVyczsgcGljayBieSBjdXJyZW50IHRoZW1lLlxyXG4gIGNvbnN0IHlvdXR1YmVUaHVtYiA9IGlzRGFyayA/ICcvYXNzZXRzL3N0cmVhbWluZy95b3V0dWJlLXRodW1ibmFpbC1kYXJrLmpwZycgOiAnL2Fzc2V0cy9zdHJlYW1pbmcveW91dHViZS10aHVtYm5haWwtbGlnaHQuanBnJztcclxuICBjb25zdCB0d2l0Y2hUaHVtYiA9IGlzRGFyayA/ICcvYXNzZXRzL3N0cmVhbWluZy90d2l0Y2gtdGh1bWJuYWlsLWRhcmsuanBnJyA6ICcvYXNzZXRzL3N0cmVhbWluZy90d2l0Y2gtdGh1bWJuYWlsLWxpZ2h0LmpwZyc7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTZ4bCBteC1hdXRvIHB5LTEyIHB4LTQgYmctdGhlbWUtYmcgZGFyazpiZy10aGVtZS1iZy1kYXJrIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTMwMFwiPlxyXG4gICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cIm1iLTggYm9yZGVyLWIgYm9yZGVyLXRoZW1lLWFjY2VudC8yMCBkYXJrOmJvcmRlci10aGVtZS1hY2NlbnQtZGFyayBwYi02XCI+XHJcbiAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCB0cmFja2luZy1bMC4yNWVtXSB1cHBlcmNhc2UgdGV4dC10aGVtZS1hY2NlbnQgZGFyazp0ZXh0LXRoZW1lLXNlY29uZGFyeS1kYXJrIG1iLTMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctOCBoLXB4IGJnLXRoZW1lLWFjY2VudCBkYXJrOmJnLXRoZW1lLWFjY2VudC1kYXJrXCIgLz5cclxuICAgICAgICAgIE11bmdEYWFsMzIxIMK3IExpdmVcclxuICAgICAgICA8L3A+XHJcbiAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtM3hsIHNtOnRleHQtNHhsIGZvbnQtYmxhY2sgbGVhZGluZy1bMS4wNV0gbWItMyB0ZXh0LXRoZW1lLXByaW1hcnkgZGFyazp0ZXh0LXRoZW1lLXNlY29uZGFyeS1kYXJrXCI+U3RyZWFtaW5nPC9oMT5cclxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHNtOnRleHQtYmFzZSB0ZXh0LXRoZW1lLXNlY29uZGFyeSBkYXJrOnRleHQtdGhlbWUtc2Vjb25kYXJ5LWRhcmsgbGVhZGluZy1yZWxheGVkIG1heC13LTJ4bFwiPldoZXJlIEkgc3RyZWFtIOKAlCBsaXZlIGNvZGluZywgYXJ0LCBhbmQgZ2FtaW5nIG9uIFR3aXRjaCBhbmQgWW91VHViZS48L3A+XHJcbiAgICAgIDwvaGVhZGVyPlxyXG5cclxuICAgICAgey8qIE1haW4gUGxhdGZvcm1zIFNlY3Rpb24gKi99XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RyZWFtaW5nLWxheW91dCBtZDpmbGV4IG1kOmdhcC02IG1iLTEyXCI+XHJcbiAgICAgICAgey8qIFlvdVR1YmUgKi99XHJcbiAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwieW91dHViZSByb3VuZGVkIGJvcmRlciBib3JkZXItdGhlbWUtYWNjZW50IGRhcms6Ym9yZGVyLXRoZW1lLWFjY2VudC1kYXJrIGJnLXRoZW1lLWNhcmQgZGFyazpiZy10aGVtZS1jYXJkLWRhcmsgcC02IGZsZXgtMSBtYi02IG1kOm1iLTBcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgbWItNFwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYWIgZmEteW91dHViZSB0ZXh0LXJlZC02MDAgZGFyazp0ZXh0LXJlZC01MDAgdGV4dC0yeGxcIj48L2k+XHJcbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkIHRleHQtdGhlbWUtcHJpbWFyeSBkYXJrOnRleHQtdGhlbWUtcHJpbWFyeS1kYXJrXCI+WW91VHViZTwvaDI+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9ATXVuZ0RhYWwzMjFcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCIgY2xhc3NOYW1lPVwiYmxvY2sgbWItNCBncm91cFwiPlxyXG4gICAgICAgICAgICA8aW1nIGxvYWRpbmc9XCJsYXp5XCIgZGVjb2Rpbmc9XCJhc3luY1wiIHNyYz17eW91dHViZVRodW1ifSBhbHQ9XCJZb3VUdWJlIENoYW5uZWxcIiBjbGFzc05hbWU9XCJ3LWZ1bGwgcm91bmRlZC1sZyB0cmFuc2l0aW9uLXNoYWRvd1wiIG9uRXJyb3I9eyhlKSA9PiB7IChlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEltYWdlRWxlbWVudCkuc3JjID0gJy9pbWFnZXMvcGxhY2Vob2xkZXIuc3ZnJzsgfX0gLz5cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtdGhlbWUtc2Vjb25kYXJ5IGRhcms6dGV4dC10aGVtZS1zZWNvbmRhcnktZGFyayBtYi00XCI+Q2hlY2sgb3V0IG15IGxhdGVzdCBZb3VUdWJlIGNvbnRlbnQgYW5kIHN1YnNjcmliZSBmb3IgdXBkYXRlcyBvbiBnYW1pbmcsIGNvZGluZywgYW5kIGNyZWF0aXZlIHByb2plY3RzLjwvcD5cclxuICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9ATXVuZ0RhYWwzMjFcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub3JlZmVycmVyXCIgY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrIHB4LTQgcHktMiByb3VuZGVkIGJnLXRoZW1lLWFjdGlvbiBkYXJrOmJnLXRoZW1lLWFjdGlvbi1kYXJrIHRleHQtd2hpdGUgZm9udC1tZWRpdW0gaG92ZXI6b3BhY2l0eS05MCB0cmFuc2l0aW9uLW9wYWNpdHlcIj5cclxuICAgICAgICAgICAgVmlzaXQgQ2hhbm5lbFxyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICAgICAgey8qIFR3aXRjaCAqL31cclxuICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJ0d2l0Y2ggcm91bmRlZCBib3JkZXIgYm9yZGVyLXRoZW1lLWFjY2VudCBkYXJrOmJvcmRlci10aGVtZS1hY2NlbnQtZGFyayBiZy10aGVtZS1jYXJkIGRhcms6YmctdGhlbWUtY2FyZC1kYXJrIHAtNiBmbGV4LTFcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgbWItNFwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYWIgZmEtdHdpdGNoIHRleHQtcHVycGxlLTYwMCBkYXJrOnRleHQtcHVycGxlLTUwMCB0ZXh0LTJ4bFwiPjwvaT5cclxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtc2VtaWJvbGQgdGV4dC10aGVtZS1wcmltYXJ5IGRhcms6dGV4dC10aGVtZS1wcmltYXJ5LWRhcmtcIj5Ud2l0Y2g8L2gyPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly93d3cudHdpdGNoLnR2L211bmdkYWFsMzIxXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiIGNsYXNzTmFtZT1cImJsb2NrIG1iLTQgZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGltZyBsb2FkaW5nPVwibGF6eVwiIGRlY29kaW5nPVwiYXN5bmNcIiBzcmM9e3R3aXRjaFRodW1ifSBhbHQ9XCJUd2l0Y2ggQ2hhbm5lbFwiIGNsYXNzTmFtZT1cInctZnVsbCByb3VuZGVkLWxnIHRyYW5zaXRpb24tc2hhZG93XCIgb25FcnJvcj17KGUpID0+IHsgKGUuY3VycmVudFRhcmdldCBhcyBIVE1MSW1hZ2VFbGVtZW50KS5zcmMgPSAnL2ltYWdlcy9wbGFjZWhvbGRlci5zdmcnOyB9fSAvPlxyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC10aGVtZS1zZWNvbmRhcnkgZGFyazp0ZXh0LXRoZW1lLXNlY29uZGFyeS1kYXJrIG1iLTRcIj5Kb2luIG15IGxpdmUgc3RyZWFtcyBmb3IgcmVhbC10aW1lIGNvZGluZywgZ2FtaW5nLCBhbmQgY3JlYXRpdmUgc2Vzc2lvbnMuIEZvbGxvdyB0byBnZXQgbm90aWZpZWQgd2hlbiBJIGdvIGxpdmUuPC9wPlxyXG4gICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vd3d3LnR3aXRjaC50di9tdW5nZGFhbDMyMVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vcmVmZXJyZXJcIiBjbGFzc05hbWU9XCJpbmxpbmUtYmxvY2sgcHgtNCBweS0yIHJvdW5kZWQgYmctdGhlbWUtYWN0aW9uIGRhcms6YmctdGhlbWUtYWN0aW9uLWRhcmsgdGV4dC13aGl0ZSBmb250LW1lZGl1bSBob3ZlcjpvcGFjaXR5LTkwIHRyYW5zaXRpb24tb3BhY2l0eVwiPlxyXG4gICAgICAgICAgICBWaXNpdCBDaGFubmVsXHJcbiAgICAgICAgICA8L2E+XHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHsvKiBQb3B1bGFyIFZpZGVvcyBieSBDYXRlZ29yeSAqL31cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xMlwiPlxyXG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgbWItOCB0ZXh0LXRoZW1lLXByaW1hcnkgZGFyazp0ZXh0LXRoZW1lLXByaW1hcnktZGFya1wiPlBvcHVsYXIgVmlkZW9zPC9oMj5cclxuICAgICAgICBcclxuICAgICAgICB7cG9wdWxhclZpZGVvcy5tYXAoKHNlY3Rpb24pID0+IChcclxuICAgICAgICAgIDxkaXYga2V5PXtzZWN0aW9uLmNhdGVnb3J5fSBjbGFzc05hbWU9XCJtYi0xMFwiPlxyXG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LXNlbWlib2xkIG1iLTQgdGV4dC10aGVtZS1hY2NlbnQgZGFyazp0ZXh0LXRoZW1lLWFjY2VudC1kYXJrIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xIGgtNiBiZy10aGVtZS1hY2NlbnQgZGFyazpiZy10aGVtZS1hY2NlbnQtZGFyayByb3VuZGVkXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgIHtzZWN0aW9uLmNhdGVnb3J5fVxyXG4gICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgbWQ6Z3JpZC1jb2xzLTMgZ2FwLTRcIj5cclxuICAgICAgICAgICAgICB7c2VjdGlvbi5pdGVtcy5tYXAoKHZpZGVvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17dmlkZW8udGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgaHJlZj17dmlkZW8udXJsfVxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXHJcbiAgICAgICAgICAgICAgICAgICAgcmVsPVwibm9yZWZlcnJlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ3JvdXAgcm91bmRlZCBib3JkZXIgYm9yZGVyLXRoZW1lLWFjY2VudC8zMCBkYXJrOmJvcmRlci10aGVtZS1hY2NlbnQtZGFyay8zMCBiZy10aGVtZS1jYXJkIGRhcms6YmctdGhlbWUtY2FyZC1kYXJrIG92ZXJmbG93LWhpZGRlbiBob3Zlcjpib3JkZXItdGhlbWUtYWNjZW50IGRhcms6aG92ZXI6Ym9yZGVyLXRoZW1lLWFjY2VudC1kYXJrIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBob3ZlcjpzaGFkb3ctbGcgYmxvY2tcIlxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gYmctdGhlbWUtYmcgZGFyazpiZy10aGVtZS1iZy1kYXJrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9XCJsYXp5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVjb2Rpbmc9XCJhc3luY1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17dmlkZW8udGh1bWJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdD17dmlkZW8udGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhc3BlY3QtdmlkZW8gb2JqZWN0LWNvdmVyIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMCBncm91cC1ob3ZlcjpzY2FsZS1bMS4wNF1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkVycm9yPXsoZSkgPT4geyAoZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxJbWFnZUVsZW1lbnQpLnNyYyA9ICcvaW1hZ2VzL3BsYWNlaG9sZGVyLnN2Zyc7IH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtdGhlbWUtcHJpbWFyeSBkYXJrOnRleHQtdGhlbWUtcHJpbWFyeS1kYXJrIGxpbmUtY2xhbXAtMiBncm91cC1ob3Zlcjp0ZXh0LXRoZW1lLWFjY2VudCBkYXJrOmdyb3VwLWhvdmVyOnRleHQtdGhlbWUtYWNjZW50LWRhcmsgdHJhbnNpdGlvbi1jb2xvcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3ZpZGVvLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn1cclxuIl19