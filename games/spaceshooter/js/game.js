(() => {
const { Enemy, Player, overlaps } = window.GameEntities;

class Game {
  constructor() { this.player = new Player(); this.stars = this.makeStars(); this.keys = {}; this.reset(); }
  makeStars() { return Array.from({ length: 150 }, () => ({ x: Math.random() * 1280, y: Math.random() * 720, size: Math.random() < .15 ? 3 : 1, speed: 45 + Math.random() * 200 })); }
  reset() {
    this.player.reset(); this.bullets = []; this.enemies = []; this.explosions = []; this.score = 0; this.lives = 3; this.elapsed = 0; this.tension = 0;
    this.terrainProfile = new Array(1280).fill(668); this.terrainY = 668; this.terrainTargetY = 668; this.terrainHold = 180; this.terrainPixelRemainder = 0; this.terrainDistance = 0; this.groundTop = 668;
    this.playerHitCooldown = 0; this.spawnTimer = .7; this.gameOver = false; this.stopped = false; this.playerDestroyed = false; this.flash = 0;
  }
  setKey(key, pressed) {
    const map = { ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down', ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right' };
    if (map[key]) this.keys[map[key]] = pressed;
    if (key === 'KeyQ' && pressed && !this.stopped) { this.stopped = true; this.keys = {}; return 'quit'; }
    if (key === 'Space' && pressed && !this.gameOver && !this.stopped) { const bullet = this.player.fire(); if (bullet) { this.bullets.push(bullet); return 'laser'; } }
    if (key === 'KeyR' && pressed && (this.gameOver || this.stopped)) { this.reset(); return 'restart'; }
    return null;
  }
  update(dt) {
    if (this.stopped) return;
    this.terrainPixelRemainder += dt * 82;
    while (this.terrainPixelRemainder >= 1) { this.terrainPixelRemainder--; this.advanceTerrainPixel(); }
    this.stars.forEach(s => { s.x -= s.speed * dt; if (s.x < 0) { s.x = 1280; s.y = Math.random() * 720; } });
    this.flash = Math.max(0, this.flash - dt);
    this.playerHitCooldown = Math.max(0, this.playerHitCooldown - dt);
    this.explosions.forEach(explosion => { explosion.age += dt; });
    this.explosions = this.explosions.filter(explosion => explosion.age < explosion.duration);
    if (this.gameOver) return;
    this.elapsed += dt; this.tension = Math.min(1, this.elapsed / 50); this.groundTop = this.terrainYAt(this.player.x); this.player.update(dt, this.keys);
    this.bullets.forEach(b => b.x += b.vx * dt); this.bullets = this.bullets.filter(b => b.x < 1300);
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      const patterns = ['wave', 'zigzag', 'dive'];
      if (this.elapsed > 15) patterns.push('loop');
      if (this.elapsed > 30) patterns.push('corkscrew');
      const aceChance = this.elapsed < 15 ? 0 : Math.min(.32, .08 + (this.elapsed - 15) * .007);
      const type = Math.random() < aceChance ? 'ace' : 'scout';
      const spawnGroundY = this.terrainYAt(1330);
      const maxSpawnY = Math.max(30, spawnGroundY - 30);
      this.enemies.push(new Enemy(30 + Math.random() * Math.max(0, maxSpawnY - 30), patterns[Math.floor(Math.random() * patterns.length)], 160 + Math.min(120, this.elapsed * 4), type));
      this.spawnTimer = Math.max(.35, .95 - this.elapsed * .012);
    }
    this.enemies.forEach(e => e.update(dt));
    let event = null;
    for (const bullet of this.bullets) for (const enemy of this.enemies) if (!bullet.hit && !enemy.dead && Math.abs(bullet.x - enemy.x) < enemy.w / 2 + 4 && Math.abs(bullet.y - enemy.y) < enemy.h / 2 + 4) {
      bullet.hit = true; enemy.hp--; enemy.hitFlash = .12; this.flash = .05;
      if (enemy.hp <= 0) { const explosionType = enemy.type === 'ace' ? 'ace' : 'alien'; enemy.dead = true; this.explosions.push({ x: enemy.x, y: enemy.y, type: explosionType, age: 0, duration: explosionType === 'ace' ? .52 : .36 }); this.score += enemy.scoreValue; this.flash = .08; event = 'explosion'; }
      else event = 'armour';
    }
    this.bullets = this.bullets.filter(b => !b.hit);
    for (const enemy of this.enemies) if (!enemy.dead && enemy.y + enemy.h / 2 >= this.terrainYAt(enemy.x)) {
      enemy.dead = true;
      const explosionType = enemy.type === 'ace' ? 'ace' : 'alien';
      this.explosions.push({ x: enemy.x, y: this.terrainYAt(enemy.x) - 6, type: explosionType, age: 0, duration: explosionType === 'ace' ? .52 : .36 });
      event ||= 'explosion';
    }
    if (!this.playerDestroyed && this.player.y + this.player.h / 2 >= this.terrainYAt(this.player.x)) event = this.damagePlayer() || event;
    for (const enemy of this.enemies) if (!enemy.dead && overlaps(this.player, enemy)) {
      enemy.dead = true;
      event = this.damagePlayer() || event;
      break;
    }
    this.enemies = this.enemies.filter(e => !e.dead && e.x > -70 && e.y > -80 && e.y < 800);
    return event;
  }

  damagePlayer() {
    if (this.playerHitCooldown || this.playerDestroyed) return null;
    this.playerHitCooldown = 1.25;
    this.lives--;
    const finalLife = this.lives <= 0;
    this.explosions.push({ x: this.player.x, y: this.player.y, type: finalLife ? 'final' : 'player', age: 0, duration: finalLife ? 1.15 : .65 });
    this.flash = finalLife ? .55 : .2;
    if (finalLife) { this.playerDestroyed = true; this.gameOver = true; return 'gameOver'; }
    return 'damage';
  }

  advanceTerrainPixel() {
    this.terrainProfile.shift();
    const previousY = this.terrainY;
    this.terrainDistance++;
    const travelledDistance = Math.max(0, this.terrainDistance - 1280);
    const lowestY = Math.round(720 - Math.min(720 * .33, 52 + travelledDistance * .027));
    const highestY = 72;
    const maximumRelief = 96;
    this.terrainY = Math.min(this.terrainY, lowestY);
    this.terrainTargetY = Math.min(this.terrainTargetY, lowestY);
    if (this.terrainHold > 0) {
      this.terrainHold--;
    } else if (this.terrainY === this.terrainTargetY) {
      if (Math.random() < .24) {
        this.terrainHold = 6 + Math.floor(Math.random() * 23);
      } else {
        const relief = lowestY - this.terrainY;
        const climbRoom = Math.min(this.terrainY - highestY, maximumRelief - relief);
        const descendRoom = lowestY - this.terrainY;
        const canClimb = climbRoom >= 6;
        const canDescend = descendRoom >= 6;
        const climbing = canClimb && (!canDescend || (relief < 58 ? Math.random() < .56 : Math.random() < .18));
        const available = climbing ? climbRoom : descendRoom;
        const distance = Math.min(available, 6 + Math.floor(Math.random() * 23));
        this.terrainTargetY = this.terrainY + (climbing ? -distance : distance);
      }
    } else {
      const direction = Math.sign(this.terrainTargetY - this.terrainY);
      const step = Math.random() < .22 ? 0 : Math.max(0, 1 - Math.abs(this.terrainY - previousY));
      this.terrainY += direction * Math.min(Math.abs(this.terrainTargetY - this.terrainY), step);
    }
    this.terrainProfile.push(this.terrainY);
  }

  terrainYAt(x) { return this.terrainProfile[Math.max(0, Math.min(1279, Math.round(x)))] ?? 668; }
}

window.SpaceShooterGame = { Game };
})();
