(() => {
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

class Player {
  constructor() { this.reset(); }
  reset() { this.x = 130; this.y = 360; this.w = 108; this.h = 50; this.speed = 360; this.cooldown = 0; }
  update(dt, keys) {
    const dx = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
    const dy = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
    const scale = dx && dy ? .707 : 1;
    this.x = clamp(this.x + dx * this.speed * dt * scale, 60, 620);
    this.y = clamp(this.y + dy * this.speed * dt * scale, 35, 685);
    this.cooldown = Math.max(0, this.cooldown - dt);
  }
  fire() { if (this.cooldown) return null; this.cooldown = .16; return { x: this.x + 28, y: this.y, vx: 720, r: 4 }; }
}

class Enemy {
  constructor(y, pattern, speed, type = 'scout') {
    this.x = 1330; this.y = y; this.baseY = y; this.w = 108; this.h = 46; this.pattern = pattern; this.speed = speed; this.age = 0; this.phase = Math.random() * Math.PI * 2;
    this.type = type; this.hp = type === 'ace' ? 2 : 1; this.maxHp = this.hp; this.scoreValue = type === 'ace' ? 350 : 100; this.hitFlash = 0;
  }
  update(dt) {
    this.age += dt; this.hitFlash = Math.max(0, this.hitFlash - dt); this.x = 1330 - this.speed * this.age;
    if (this.pattern === 'wave') this.y = this.baseY + Math.sin(this.age * 4 + this.phase) * 100;
    if (this.pattern === 'zigzag') this.y = this.baseY + Math.asin(Math.sin(this.age * 3 + this.phase)) * 90;
    if (this.pattern === 'dive') this.y = this.baseY + Math.sin(this.age * 1.8 + this.phase) * 180;
    if (this.pattern === 'loop') { this.x += Math.cos(this.age * 3.4 + this.phase) * 70; this.y = this.baseY + Math.sin(this.age * 3.4 + this.phase) * 125; }
    if (this.pattern === 'corkscrew') { this.x += Math.sin(this.age * 5 + this.phase) * 42; this.y = this.baseY + Math.sin(this.age * 2.5 + this.phase) * 145; }
  }
}

const overlaps = (a, b) => Math.abs(a.x - b.x) < (a.w + b.w) / 2 && Math.abs(a.y - b.y) < (a.h + b.h) / 2;

window.GameEntities = { Enemy, Player, overlaps };
})();
