import { useEffect, useState } from 'react';

export type GitHubRepo = {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  topics?: string[];
};

type State = {
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
};

/**
 * Fetches the most recently updated public repositories for a GitHub user.
 * Uses the unauthenticated REST API (60 req/hr per IP) and degrades gracefully:
 * if the request fails we simply keep an empty list so the UI can show a fallback.
 */
export function useGitHubRepos(username = 'robfernan', count = 4): State {
  const [state, setState] = useState<State>({ repos: [], loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      try {
        // Sort by most recently pushed so "Now Building" always reflects real activity.
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=${count}`,
          { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } }
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const data = (await res.json()) as GitHubRepo[];
        // Exclude the portfolio repos themselves so we don't list "this site".
        const filtered = data.filter(
          (r) => !/react-portfolio|html-css-js-portfolio/i.test(r.full_name)
        );
        if (!cancelled) setState({ repos: filtered.slice(0, count), loading: false, error: null });
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to load';
          setState((s) => ({ ...s, loading: false, error: message }));
        }
      }
    }

    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [username, count]);

  return state;
}

/** Human-friendly relative time, e.g. "3 days ago". */
export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const diff = Date.now() - then;
  const day = 86_400_000;
  if (diff < day) return 'today';
  const days = Math.floor(diff / day);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}
