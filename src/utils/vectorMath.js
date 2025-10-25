// src/utils/vectorMath.js

// Fungsi helper untuk memastikan nilai tetap dalam rentang 0-255
const clamp = (value) => Math.max(0, Math.min(255, Math.round(value)));

export const add = (vecA, vecB) => ({
  r: clamp(vecA.r + vecB.r),
  g: clamp(vecA.g + vecB.g),
  b: clamp(vecA.b + vecB.b),
});

export const subtract = (vecA, vecB) => ({
  r: clamp(vecA.r - vecB.r),
  g: clamp(vecA.g - vecB.g),
  b: clamp(vecA.b - vecB.b),
});

export const scale = (vec, scalar) => ({
  r: clamp(vec.r * scalar),
  g: clamp(vec.g * scalar),
  b: clamp(vec.b * scalar),
});

export const interpolate = (vecA, vecB, t) => ({
  r: clamp((1 - t) * vecA.r + t * vecB.r),
  g: clamp((1 - t) * vecA.g + t * vecB.g),
  b: clamp((1 - t) * vecA.b + t * vecB.b),
});
