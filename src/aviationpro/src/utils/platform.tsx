// Platform detection for the AviationPro web build.
// We avoid importing `@capacitor/core` (a mobile-app-only dependency) so this
// module works in a plain browser bundle. Instead we detect Capacitor via its
// global, which is only present when running inside a native Capacitor shell.

const capacitorGlobal = (window as any).Capacitor;

export const isNative = !!(capacitorGlobal && typeof capacitorGlobal.isNativePlatform === 'function' && capacitorGlobal.isNativePlatform());
export const isWails = !!(window as any).go?.main?.App;
export const isWeb = !isNative && !isWails;

export const getPlatform = () => {
  if (isNative) return 'mobile';
  if (isWails) return 'desktop';
  return 'web';
};
