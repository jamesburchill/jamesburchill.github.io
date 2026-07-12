(() => {
class AudioManager {
  constructor() { this.context = null; this.master = null; this.musicBus = null; this.sfxBus = null; this.audioReady = false; this.lastGameOverNote = 0; this.gameOverStep = 0; this.laserStep = 0; this.tension = -1; this.mode = 'gameplay'; this.ambient = null; this.thrusterNode = null; }

  unlock({ startAmbient = true } = {}) {
    if (this.audioReady && this.context?.state === 'running') {
      if (startAmbient && this.mode === 'gameplay') this.startAmbient();
      return Promise.resolve();
    }
    if (!this.context) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContextClass();
      this.master = this.context.createGain();
      this.musicBus = this.context.createGain();
      this.sfxBus = this.context.createGain();
      this.master.gain.value = .48;
      this.musicBus.gain.value = .95;
      this.sfxBus.gain.value = .72;
      this.musicBus.connect(this.master);
      this.sfxBus.connect(this.master);
      this.master.connect(this.context.destination);
    }
    const activate = () => {
      this.audioReady = true;
      if (startAmbient && this.mode === 'gameplay') this.startAmbient();
    };
    if (this.context.state === 'suspended') return this.context.resume().then(activate).catch(() => {});
    activate();
    return Promise.resolve();
  }

  playEffect(name) {
    if (!name || typeof this[name] !== 'function') return Promise.resolve();
    const play = () => this[name]();
    if (this.audioReady && this.context?.state === 'running') { play(); return Promise.resolve(); }
    return this.unlock({ startAmbient: false }).then(play);
  }

  startAmbient() {
    if (!this.context || this.ambient) return;
    const now = this.context.currentTime;
    const drone = this.context.createOscillator();
    const droneGain = this.context.createGain();
    const harmony = this.context.createOscillator();
    const harmonyGain = this.context.createGain();
    const padA = this.context.createOscillator();
    const padB = this.context.createOscillator();
    const padFilter = this.context.createBiquadFilter();
    const padGain = this.context.createGain();
    const noise = this.context.createBufferSource();
    const noiseFilter = this.context.createBiquadFilter();
    const noiseGain = this.context.createGain();
    const pulse = this.context.createOscillator();
    const pulseDepth = this.context.createGain();
    const noiseBuffer = this.context.createBuffer(1, this.context.sampleRate * 2, this.context.sampleRate);
    const noiseSamples = noiseBuffer.getChannelData(0);
    for (let index = 0; index < noiseSamples.length; index++) noiseSamples[index] = Math.random() * 2 - 1;
    drone.type = 'triangle'; drone.frequency.value = 82.41;
    harmony.type = 'sine'; harmony.frequency.value = 123.47;
    padA.type = 'sawtooth'; padA.frequency.value = 164.81; padA.detune.value = -7;
    padB.type = 'sawtooth'; padB.frequency.value = 164.81; padB.detune.value = 7;
    padFilter.type = 'lowpass'; padFilter.frequency.value = 280; padFilter.Q.value = .55;
    noise.buffer = noiseBuffer; noise.loop = true;
    noiseFilter.type = 'bandpass'; noiseFilter.frequency.value = 430; noiseFilter.Q.value = .38;
    pulse.type = 'sine'; pulse.frequency.value = .16;
    droneGain.gain.value = .085; harmonyGain.gain.value = .045; padGain.gain.value = .022; noiseGain.gain.value = .006; pulseDepth.gain.value = .014;
    drone.connect(droneGain).connect(this.musicBus);
    harmony.connect(harmonyGain).connect(this.musicBus);
    padA.connect(padFilter); padB.connect(padFilter); padFilter.connect(padGain).connect(this.musicBus);
    noise.connect(noiseFilter).connect(noiseGain).connect(this.musicBus);
    pulse.connect(pulseDepth).connect(droneGain.gain);
    drone.start(now); harmony.start(now); padA.start(now); padB.start(now); noise.start(now); pulse.start(now);
    this.ambient = { drone, droneGain, harmony, harmonyGain, padA, padB, padFilter, padGain, noise, noiseGain, pulse, pulseDepth };
  }

  stopAmbient() {
    if (!this.context || !this.ambient) return;
    const now = this.context.currentTime;
    const { drone, droneGain, harmony, harmonyGain, padA, padB, padGain, noise, noiseGain, pulse } = this.ambient;
    for (const gain of [droneGain, harmonyGain, padGain, noiseGain]) {
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(Math.max(.001, gain.gain.value), now);
      gain.gain.exponentialRampToValueAtTime(.001, now + .28);
    }
    drone.stop(now + .3); harmony.stop(now + .3); padA.stop(now + .3); padB.stop(now + .3); noise.stop(now + .3); pulse.stop(now + .3);
    this.ambient = null; this.tension = -1;
  }

  setTension(value) {
    if (!this.context || !this.ambient) return;
    const tension = Math.max(0, Math.min(1, value));
    if (Math.abs(tension - this.tension) < .015) return;
    this.tension = tension;
    const now = this.context.currentTime;
    const { drone, droneGain, harmony, harmonyGain, padFilter, padGain, noiseGain, pulse, pulseDepth } = this.ambient;
    drone.frequency.setTargetAtTime(82.41 + tension * 6, now, .7);
    harmony.frequency.setTargetAtTime(123.47 + tension * 9, now, .7);
    droneGain.gain.setTargetAtTime(.085 + tension * .045, now, .7);
    harmonyGain.gain.setTargetAtTime(.045 + tension * .035, now, .7);
    padFilter.frequency.setTargetAtTime(280 + tension * 520, now, .7);
    padGain.gain.setTargetAtTime(.022 + tension * .035, now, .7);
    noiseGain.gain.setTargetAtTime(.006 + tension * .012, now, .7);
    pulse.frequency.setTargetAtTime(.16 + tension * .38, now, .7);
    pulseDepth.gain.setTargetAtTime(.014 + tension * .018, now, .7);
  }

  gameOverAmbience(now) {
    if (!this.context || this.mode !== 'gameover' || now - this.lastGameOverNote < 2.35) return;
    this.lastGameOverNote = now;
    const notes = [146.83, 123.47, 110, 98];
    const frequency = notes[this.gameOverStep++ % notes.length];
    this.tone({ frequency, endFrequency: frequency * .985, duration: 1.15, type: 'sine', volume: .085, channel: 'music' });
    this.tone({ frequency: frequency * 1.5, endFrequency: frequency * 1.48, duration: .82, type: 'triangle', volume: .032, delay: .08, channel: 'music' });
  }

  tone({ frequency, endFrequency = frequency, duration, type = 'square', volume = .15, delay = 0, channel = 'sfx' }) {
    if (!this.context) return;
    const now = this.context.currentTime + delay;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), now + duration);
    gain.gain.setValueAtTime(.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + .01);
    gain.gain.exponentialRampToValueAtTime(.001, now + duration);
    oscillator.connect(gain).connect(channel === 'music' ? this.musicBus : this.sfxBus);
    oscillator.start(now); oscillator.stop(now + duration + .02);
  }

  noiseBurst({ duration, volume, filterType = 'lowpass', frequency = 700, q = .7, delay = 0 }) {
    if (!this.context || !this.sfxBus) return;
    const now = this.context.currentTime + delay;
    const buffer = this.context.createBuffer(1, Math.ceil(this.context.sampleRate * duration), this.context.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let index = 0; index < samples.length; index++) {
      const progress = index / samples.length;
      samples[index] = (Math.random() * 2 - 1) * (1 - progress) ** 1.7;
    }
    const source = this.context.createBufferSource();
    const filter = this.context.createBiquadFilter();
    const gain = this.context.createGain();
    source.buffer = buffer;
    filter.type = filterType; filter.frequency.value = frequency; filter.Q.value = q;
    gain.gain.setValueAtTime(.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + .008);
    gain.gain.exponentialRampToValueAtTime(.001, now + duration);
    source.connect(filter).connect(gain).connect(this.sfxBus);
    source.start(now); source.stop(now + duration + .02);
  }

  laser() {
    const variation = [1, 1.06, .94][this.laserStep++ % 3];
    this.tone({ frequency: 1180 * variation, endFrequency: 210 * variation, duration: .12, type: 'sawtooth', volume: .17 });
    this.tone({ frequency: 1780 * variation, endFrequency: 390 * variation, duration: .075, type: 'square', volume: .065, delay: .012 });
    this.noiseBurst({ duration: .055, volume: .035, filterType: 'highpass', frequency: 2400, q: .5 });
  }
  armour() { this.tone({ frequency: 720, endFrequency: 330, duration: .08, type: 'triangle', volume: .15 }); this.tone({ frequency: 1120, endFrequency: 560, duration: .055, type: 'square', volume: .055, delay: .01 }); }
  explosion() { this.noiseBurst({ duration: .34, volume: .24, frequency: 620, q: .8 }); this.tone({ frequency: 145, endFrequency: 42, duration: .32, type: 'sawtooth', volume: .23 }); this.tone({ frequency: 470, endFrequency: 78, duration: .16, type: 'square', volume: .08 }); }
  damage() { this.noiseBurst({ duration: .28, volume: .2, frequency: 480, q: .65 }); this.tone({ frequency: 165, endFrequency: 48, duration: .38, type: 'sawtooth', volume: .27 }); this.tone({ frequency: 760, endFrequency: 180, duration: .16, type: 'triangle', volume: .09 }); }
  gameOver() { this.mode = 'gameover'; this.setThruster(false); this.stopAmbient(); this.lastGameOverNote = performance.now() / 1000; this.tone({ frequency: 310, endFrequency: 90, duration: .5, type: 'triangle', volume: .25 }); this.tone({ frequency: 195, endFrequency: 55, duration: .65, type: 'sawtooth', volume: .16, delay: .2 }); }
  quit() { this.mode = 'stopped'; this.setThruster(false); this.stopAmbient(); }
  restart() { this.mode = 'gameplay'; this.gameOverStep = 0; this.startAmbient(); }
  setThruster(active) {
    if (!this.context || !this.audioReady) return;
    if (active && !this.thrusterNode) {
      const now = this.context.currentTime;
      const length = Math.floor(this.context.sampleRate * .5);
      const buffer = this.context.createBuffer(1, length, this.context.sampleRate);
      const samples = buffer.getChannelData(0);
      for (let index = 0; index < length; index++) samples[index] = Math.random() * 2 - 1;
      const source = this.context.createBufferSource();
      const filter = this.context.createBiquadFilter();
      const gain = this.context.createGain();
      source.buffer = buffer; source.loop = true;
      filter.type = 'bandpass'; filter.frequency.value = 980; filter.Q.value = .62;
      gain.gain.setValueAtTime(.001, now); gain.gain.exponentialRampToValueAtTime(.028, now + .08);
      source.connect(filter).connect(gain);
      gain.connect(this.sfxBus);
      source.start(now);
      this.thrusterNode = { source, gain };
    } else if (!active && this.thrusterNode) {
      const now = this.context.currentTime;
      const { source, gain } = this.thrusterNode;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(Math.max(.001, gain.gain.value), now);
      gain.gain.exponentialRampToValueAtTime(.001, now + .1);
      source.stop(now + .11);
      this.thrusterNode = null;
    }
  }
}

window.SpaceShooterAudio = { AudioManager };
})();
