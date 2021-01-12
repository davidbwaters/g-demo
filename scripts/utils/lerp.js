/*
 *  Scripts - Utilities - Lerp
 */
export function lerp(x, y, a) {
  return x * (1 - a) + y * a;
}
export function invlerp(a, b, v) {
  return clamp((v - a) / (b - a));
}
export function clamp(v, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}