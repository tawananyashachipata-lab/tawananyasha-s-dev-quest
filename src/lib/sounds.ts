// Lightweight WebAudio synth for retro UI sounds. No audio files needed.

type SoundName = "step" | "interact" | "achievement" | "levelup" | "open" | "close" | "start";

class SoundEngine {
  private ctx: AudioContext | null = null;
  muted = false;

  private ensure(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  private tone(freq: number, start: number, duration: number, type: OscillatorType, gain: number) {
    const ctx = this.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const t = ctx.currentTime + start;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + duration + 0.05);
  }

  play(name: SoundName) {
    if (this.muted) return;
    if (!this.ensure()) return;
    switch (name) {
      case "step":
        this.tone(180 + Math.random() * 60, 0, 0.05, "square", 0.015);
        break;
      case "interact":
        this.tone(520, 0, 0.08, "square", 0.05);
        this.tone(780, 0.07, 0.1, "square", 0.05);
        break;
      case "open":
        this.tone(440, 0, 0.07, "triangle", 0.06);
        this.tone(660, 0.06, 0.09, "triangle", 0.06);
        break;
      case "close":
        this.tone(660, 0, 0.07, "triangle", 0.05);
        this.tone(440, 0.06, 0.09, "triangle", 0.05);
        break;
      case "achievement":
        [523, 659, 784, 1047].forEach((f, i) => this.tone(f, i * 0.09, 0.14, "square", 0.05));
        break;
      case "levelup":
        [392, 523, 659, 784, 1047, 1319].forEach((f, i) => this.tone(f, i * 0.08, 0.16, "triangle", 0.06));
        break;
      case "start":
        [262, 392, 523, 784].forEach((f, i) => this.tone(f, i * 0.1, 0.18, "square", 0.06));
        break;
    }
  }
}

export const sounds = new SoundEngine();
