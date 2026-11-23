"use client";

const STORAGE_KEY = "kohl-tactile-sound";

let audioCtx: AudioContext | null = null;
const listeners = new Set<() => void>();

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
  }
  if (audioCtx.state === "suspended") {
    void audioCtx.resume();
  }
  return audioCtx;
}

export function isTactileSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function setTactileSoundEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");
  } catch {
    // Ignore storage errors (private browsing, quota, etc.)
  }
  listeners.forEach((listener) => listener());
}

export function subscribeTactileSound(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function triggerHaptic(pattern: number | number[]): void {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") {
    return;
  }
  try {
    navigator.vibrate(pattern);
  } catch {
    // Ignore if blocked by browser policy
  }
}

/**
 * Soft, damped mechanical keycap tick + crisp haptic pulse for tactile buttons.
 */
export function playTactileClick({ force = false }: { force?: boolean } = {}): void {
  triggerHaptic(10);
  if (!force && !isTactileSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(340, now);
  osc.frequency.exponentialRampToValueAtTime(115, now + 0.018);

  gain.gain.setValueAtTime(0.065, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.025);
}

/**
 * Crisp, lighter tap + light haptic tick for tactile segmented tabs.
 */
export function playTactileTab(): void {
  triggerHaptic(8);
  if (!isTactileSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(520, now);
  osc.frequency.exponentialRampToValueAtTime(220, now + 0.014);

  gain.gain.setValueAtTime(0.045, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.016);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.02);
}

/**
 * Gentle 3-note Nordic chime + celebratory haptic pattern for Full 360° Bloom.
 */
export function playTactileBloom(): void {
  triggerHaptic([12, 45, 18, 45, 24]);
  if (!isTactileSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // D5 -> F#5 -> A5 (warm D major triad)
  const notes = [587.33, 739.99, 880.0];

  notes.forEach((freq, idx) => {
    const start = now + idx * 0.075;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, start);

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(0.04, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0008, start + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(start + 0.48);
  });
}
