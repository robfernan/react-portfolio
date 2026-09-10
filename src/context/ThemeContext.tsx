import { createContext, useContext } from 'react';

export type ThemeKey = 'minimal' | 'slate' | 'midnight' | '90s';

export interface ThemeState {
	/** Current theme key (e.g. 'minimal', '90s'). */
	theme: ThemeKey;
	/** Whether dark mode is active. */
	darkMode: boolean;
	setTheme: (key: ThemeKey) => void;
	toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeState | null>(null);

export const ThemeProvider = ThemeContext.Provider;

/**
 * Read the shared theme + dark-mode state. This is the single source of truth
 * for theming across the app (including embedded apps like AviationPro), so we
 * no longer prop-drill `darkMode` or observe `<html>` class changes manually.
 */
export function useTheme(): ThemeState {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error('useTheme must be used within a <ThemeProvider>');
	}
	return ctx;
}
