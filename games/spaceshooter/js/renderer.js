(() => {
const text = (ctx, value, x, y, size, colour = '#d9f3ff', align = 'left') => { ctx.fillStyle = colour; ctx.font = `bold ${size}px monospace`; ctx.textAlign = align; ctx.fillText(value, x, y); };
const rect = (ctx, x, y, w, h, colour) => { ctx.fillStyle = colour; ctx.fillRect(Math.round(x - w / 2), Math.round(y - h / 2), w, h); };
const poly = (ctx, points, colour) => { ctx.fillStyle = colour; ctx.beginPath(); ctx.moveTo(points[0][0], points[0][1]); for (let index = 1; index < points.length; index++) ctx.lineTo(points[index][0], points[index][1]); ctx.closePath(); ctx.fill(); };
const planetaryBackdrop = new Image();
planetaryBackdrop.src = 'assets/distant-planets.png';

function drawPlayer(ctx, p, isMoving, detailLevel) {
  // Side-on hero: the nose stays pointed right, with a canopy, tail, wing, and rear engines.
  if (isMoving) {
    rect(ctx, p.x - 46, p.y - 4, 24, 7, '#f0524e');
    rect(ctx, p.x - 58, p.y - 4, 13, 4, '#ffcf63');
  }
  poly(ctx, [[p.x - 34, p.y + 9], [p.x - 24, p.y - 13], [p.x + 12, p.y - 18], [p.x + 44, p.y - 9], [p.x + 59, p.y], [p.x + 44, p.y + 10], [p.x + 9, p.y + 15], [p.x - 21, p.y + 15]], '#183654');
  poly(ctx, [[p.x - 25, p.y + 7], [p.x - 13, p.y - 11], [p.x + 13, p.y - 14], [p.x + 47, p.y - 5], [p.x + 55, p.y], [p.x + 43, p.y + 6], [p.x + 7, p.y + 11], [p.x - 22, p.y + 11]], '#58abc9');
  poly(ctx, [[p.x - 20, p.y - 10], [p.x - 16, p.y - 29], [p.x - 4, p.y - 11]], '#315f8c');
  poly(ctx, [[p.x + 3, p.y - 13], [p.x + 21, p.y - 12], [p.x + 34, p.y - 4], [p.x + 8, p.y - 4]], '#c7f7ff');
  poly(ctx, [[p.x - 3, p.y + 8], [p.x + 19, p.y + 12], [p.x + 3, p.y + 22], [p.x - 17, p.y + 13]], '#2d6390');
  rect(ctx, p.x + 20, p.y + 6, 29, 3, '#277295');
  rect(ctx, p.x - 28, p.y + 3, 10, 11, '#294a73');
  rect(ctx, p.x - 28, p.y + 3, 4, 4, '#ffcf63');
  rect(ctx, p.x + 37, p.y, 23, 4, '#d8f7ff');
  rect(ctx, p.x + 53, p.y, 8, 3, '#ffdf70');
  rect(ctx, p.x - 2, p.y - 1, 6, 4, '#163d61');
  rect(ctx, p.x + 7, p.y + 1, 3, 3, '#ffffff');
  rect(ctx, p.x - 34, p.y - 3, 4, 17, '#102c4b');
  rect(ctx, p.x - 20, p.y + 8, 12, 2, '#8ee7f6');
  rect(ctx, p.x - 7, p.y + 10, 3, 3, '#ffcf63');
  rect(ctx, p.x + 11, p.y + 9, 3, 3, '#ff6f61');
  rect(ctx, p.x + 20, p.y - 8, 2, 8, '#659bb7');
  rect(ctx, p.x + 29, p.y - 6, 2, 5, '#659bb7');
  rect(ctx, p.x + 1, p.y + 17, 22, 3, '#173c61');
  rect(ctx, p.x + 11, p.y + 18, 5, 3, '#ffdf70');
  // Additional side-profile machinery, armour seams, sensors, and weapon hardpoints.
  if (detailLevel > 0) {
  rect(ctx, p.x - 39, p.y - 4, 8, 14, '#0d243e');
  rect(ctx, p.x - 43, p.y - 4, 3, 10, '#7fc8d9');
  rect(ctx, p.x - 14, p.y - 17, 9, 3, '#204a72');
  rect(ctx, p.x - 8, p.y - 22, 3, 8, '#6aa7c5');
  rect(ctx, p.x - 8, p.y - 27, 3, 3, '#ff6f61');
  poly(ctx, [[p.x + 2, p.y + 12], [p.x + 19, p.y + 14], [p.x + 10, p.y + 20], [p.x - 2, p.y + 17]], '#397ca5');
  rect(ctx, p.x + 19, p.y + 15, 13, 3, '#102f4f');
  rect(ctx, p.x + 29, p.y + 12, 5, 3, '#8ee7f6');
  rect(ctx, p.x + 34, p.y - 3, 10, 2, '#4a8fad');
  rect(ctx, p.x + 43, p.y - 1, 4, 4, '#ffffff');
  if (detailLevel > 1) {
  rect(ctx, p.x + 48, p.y + 4, 9, 2, '#1d5378');
  rect(ctx, p.x + 12, p.y - 6, 3, 3, '#4b8caa');
  rect(ctx, p.x + 17, p.y - 5, 3, 3, '#4b8caa');
  rect(ctx, p.x - 17, p.y + 3, 3, 3, '#d9f7ff');
  }
  }
}

function drawEnemy(ctx, e, detailLevel) {
  const ace = e.type === 'ace';
  const damaged = ace && e.hp === 1;
  const outline = damaged ? '#201b35' : ace ? '#322465' : '#421d3c';
  const hull = damaged ? '#4a4076' : ace ? '#6650bf' : '#c24258';
  const panel = damaged ? '#675985' : ace ? '#866ee2' : '#e46061';
  const cockpit = damaged ? '#6f929b' : ace ? '#baf4ff' : '#ffc36a';
  // Side-on interceptors fly left: hot engines and tail sit at the right, pointed nose at the left.
  const engineLit = !damaged || Math.floor(e.age * 18) % 4 !== 0;
  if (engineLit) {
    rect(ctx, e.x + 48, e.y - 3, damaged ? 12 : 18, damaged ? 4 : 6, damaged ? '#a83e54' : '#f05d53');
    rect(ctx, e.x + 58, e.y - 3, damaged ? 6 : 10, 3, damaged ? '#c77a58' : '#ffbb61');
  }
  poly(ctx, [[e.x + 38, e.y + 10], [e.x + 27, e.y - 15], [e.x - 13, e.y - 18], [e.x - 48, e.y - 6], [e.x - 59, e.y], [e.x - 47, e.y + 8], [e.x - 11, e.y + 15], [e.x + 30, e.y + 13]], outline);
  poly(ctx, [[e.x + 34, e.y + 7], [e.x + 22, e.y - 11], [e.x - 11, e.y - 13], [e.x - 47, e.y - 4], [e.x - 54, e.y], [e.x - 41, e.y + 5], [e.x - 8, e.y + 10], [e.x + 29, e.y + 10]], hull);
  poly(ctx, [[e.x + 19, e.y - 9], [e.x + 24, e.y - 25], [e.x + 33, e.y - 10]], '#4d2446');
  poly(ctx, [[e.x - 30, e.y - 11], [e.x - 11, e.y - 10], [e.x + 4, e.y - 3], [e.x - 28, e.y - 3]], cockpit);
  poly(ctx, [[e.x - 7, e.y + 9], [e.x + 17, e.y + 13], [e.x - 3, e.y + 21], [e.x - 23, e.y + 11]], damaged ? '#39345e' : ace ? '#4f3f9e' : '#8d2d49');
  rect(ctx, e.x + 12, e.y + 6, 28, 3, damaged ? '#302b50' : ace ? '#4a3e99' : '#852842');
  rect(ctx, e.x + 28, e.y + 2, 8, 10, '#4a1f3d');
  rect(ctx, e.x - 18, e.y - 2, 5, 4, '#ffffff');
  rect(ctx, e.x + 3, e.y, 7, 4, panel);
  rect(ctx, e.x + 34, e.y - 2, 4, 16, '#351a35');
  rect(ctx, e.x + 18, e.y + 8, 11, 2, damaged ? '#756d91' : ace ? '#ab9cff' : '#ff8d70');
  rect(ctx, e.x + 5, e.y + 11, 3, 3, '#ffbd58');
  rect(ctx, e.x - 10, e.y + 9, 3, 3, damaged ? '#536f76' : ace ? '#baf4ff' : '#7e243e');
  rect(ctx, e.x - 35, e.y + 2, 10, 2, '#ffd875');
  rect(ctx, e.x - 1, e.y - 10, 2, 7, damaged ? '#5c5475' : ace ? '#a99ae9' : '#8d2d49');
  rect(ctx, e.x + 10, e.y - 9, 2, 6, damaged ? '#5c5475' : ace ? '#a99ae9' : '#8d2d49');
  // Extra armour scales, vents, targeting lights, and underslung weapons.
  if (detailLevel > 0) {
  rect(ctx, e.x + 40, e.y - 3, 8, 13, '#27152b');
  rect(ctx, e.x + 44, e.y - 3, 3, 9, ace ? '#b4a8ff' : '#ff956f');
  rect(ctx, e.x + 18, e.y - 14, 8, 3, ace ? '#4d3d99' : '#66233d');
  rect(ctx, e.x + 14, e.y - 19, 3, 7, ace ? '#a99ae9' : '#a33b50');
  rect(ctx, e.x - 7, e.y - 14, 8, 2, ace ? '#d3ccff' : '#ffae78');
  rect(ctx, e.x - 24, e.y - 8, 3, 3, ace ? '#ffffff' : '#fff0a3');
  rect(ctx, e.x - 39, e.y - 2, 5, 3, '#401b35');
  poly(ctx, [[e.x + 5, e.y + 11], [e.x + 22, e.y + 14], [e.x + 10, e.y + 20], [e.x - 2, e.y + 16]], ace ? '#4e3c9a' : '#78263f');
  if (detailLevel > 1) {
  rect(ctx, e.x - 2, e.y + 17, 15, 3, '#351a35');
  rect(ctx, e.x - 12, e.y + 14, 8, 3, ace ? '#baf4ff' : '#ffbd58');
  rect(ctx, e.x + 25, e.y + 5, 3, 3, panel);
  rect(ctx, e.x + 20, e.y + 4, 3, 3, panel);
  rect(ctx, e.x - 46, e.y + 2, 12, 3, cockpit);
  }
  }
  if (ace) {
    rect(ctx, e.x - 4, e.y - 25, 8, 3, e.hp === 2 ? '#baf4ff' : '#473789');
    rect(ctx, e.x + 7, e.y - 25, 8, 3, e.hp === 2 ? '#baf4ff' : '#473789');
  }
  if (damaged) {
    // Persistent scorched plating and pixel cracks make the remaining hit point visible.
    poly(ctx, [[e.x - 5, e.y - 9], [e.x + 13, e.y - 7], [e.x + 20, e.y + 1], [e.x + 4, e.y + 5], [e.x - 9, e.y]], '#242130');
    rect(ctx, e.x + 7, e.y - 8, 12, 3, '#15141d');
    rect(ctx, e.x + 13, e.y - 3, 3, 8, '#15141d');
    rect(ctx, e.x + 17, e.y + 2, 7, 3, '#15141d');
    rect(ctx, e.x + 35, e.y + 8, 9, 3, '#241c2d');
    if (Math.floor(e.age * 12) % 5 === 0) {
      rect(ctx, e.x + 46, e.y - 13, 5, 5, '#4d454f');
      rect(ctx, e.x + 52, e.y - 18, 3, 3, '#342f36');
      rect(ctx, e.x + 39, e.y + 13, 4, 3, '#ff9a5c');
    }
  }
  if (e.hitFlash) {
    // A compact armour strike replaces the old full-ship rectangular flash.
    const impactAlpha = Math.min(1, e.hitFlash / .12);
    ctx.globalAlpha = impactAlpha;
    rect(ctx, e.x - 18, e.y - 1, 18, 8, '#ffffff');
    rect(ctx, e.x - 30, e.y - 10, 10, 3, ace ? '#baf4ff' : '#ffdf70');
    rect(ctx, e.x - 34, e.y + 9, 8, 3, ace ? '#9c8aff' : '#ff8d55');
    rect(ctx, e.x - 10, e.y - 16, 4, 7, '#ffffff');
    ctx.globalAlpha = 1;
  }
}

function drawExplosion(ctx, explosion, detailLevel) {
  const progress = explosion.age / explosion.duration;
  const inverse = 1 - progress;
  const isFinal = explosion.type === 'final';
  const isPlayer = explosion.type === 'player' || isFinal;
  const isAce = explosion.type === 'ace';
  const radius = (isFinal ? 84 : isPlayer ? 48 : isAce ? 45 : 31) * progress;
  const core = Math.max(3, (isFinal ? 38 : isPlayer ? 25 : isAce ? 27 : 18) * inverse);
  const baseSparks = isFinal ? 16 : isPlayer ? 11 : isAce ? 12 : 7;
  const sparks = Math.max(4, Math.ceil(baseSparks * (detailLevel > 1 ? 1 : detailLevel > 0 ? .72 : .48)));
  const colours = isPlayer ? ['#ffffff', '#ffdf70', '#ff834f', '#d53c59'] : isAce ? ['#ffffff', '#baf4ff', '#9c8aff', '#5d3fc2'] : ['#fff0a3', '#ffbd58', '#f45e52'];
  const middleColour = isAce ? '#a99cff' : '#ffb85c';
  const innerColour = isAce ? '#e9fdff' : '#fff8d0';

  // Expanding shock front and hot secondary ring.
  if (progress < .78) {
    ctx.strokeStyle = isAce ? '#baf4ff' : isPlayer ? '#ffdf70' : '#ff9258';
    ctx.globalAlpha = inverse * .72; ctx.lineWidth = isFinal ? 6 : isAce ? 4 : 3;
    ctx.beginPath(); ctx.ellipse(explosion.x, explosion.y, radius * 1.22 + 4, radius * .72 + 3, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // Expanding pixel core and a deterministic spray of debris.
  rect(ctx, explosion.x, explosion.y, core * 2, core * 1.35, colours[3] || '#f45e52');
  rect(ctx, explosion.x, explosion.y, core * 1.35, core, middleColour);
  rect(ctx, explosion.x, explosion.y, core * .62, core * .62, innerColour);
  for (let index = 0; index < sparks; index++) {
    const angle = (Math.PI * 2 * index / sparks) + .35;
    const wobble = 1 + Math.sin(index * 7.1) * .18;
    const distance = radius * wobble;
    const x = explosion.x + Math.cos(angle) * distance;
    const y = explosion.y + Math.sin(angle) * distance;
    const size = Math.max(2, (isFinal ? 8 : isAce ? 6 : 5) * inverse + (index % 2));
    rect(ctx, x, y, size * 1.8, size, colours[index % colours.length]);
  }
  if (detailLevel > 0) for (let index = 0; index < Math.ceil(sparks * .55); index++) {
    const angle = (Math.PI * 2 * index / Math.ceil(sparks * .55)) + 1.07;
    const distance = radius * .58;
    const size = Math.max(2, 4 * inverse);
    rect(ctx, explosion.x + Math.cos(angle) * distance, explosion.y + Math.sin(angle) * distance, size, size, colours[(index + 1) % colours.length]);
  }
  if (detailLevel > 0 && progress > .32) {
    const smokeAlpha = Math.max(0, inverse * .5);
    ctx.globalAlpha = smokeAlpha;
    rect(ctx, explosion.x - radius * .22, explosion.y - radius * .12, 14 + radius * .18, 9 + radius * .1, '#211d21');
    rect(ctx, explosion.x + radius * .18, explosion.y + radius * .08, 10 + radius * .14, 7 + radius * .09, '#33292a');
    ctx.globalAlpha = 1;
  }
  if (detailLevel > 1) {
    const shardDistance = 10 + radius * .82;
    poly(ctx, [[explosion.x - shardDistance, explosion.y - 3], [explosion.x - shardDistance + 8 * inverse, explosion.y - 7], [explosion.x - shardDistance + 5, explosion.y + 2]], colours[2]);
    poly(ctx, [[explosion.x + shardDistance, explosion.y + 4], [explosion.x + shardDistance - 7 * inverse, explosion.y + 8], [explosion.x + shardDistance - 4, explosion.y]], colours[1]);
  }
  if (isAce) {
    const debrisDistance = 18 + progress * 42;
    rect(ctx, explosion.x - debrisDistance, explosion.y - 8, 13 * inverse + 3, 4, '#6350c7');
    rect(ctx, explosion.x + debrisDistance, explosion.y + 10, 13 * inverse + 3, 4, '#baf4ff');
  }
  if (isFinal && progress < .6) {
    ctx.fillStyle = '#ffdf70'; ctx.globalAlpha = inverse * .18;
    ctx.fillRect(0, 0, 1280, 720); ctx.globalAlpha = 1;
  }
}

function drawGround(ctx, terrainProfile) {
  if (!terrainProfile?.length) return;
  ctx.fillStyle = '#2a2927';
  ctx.beginPath(); ctx.moveTo(0, 720); ctx.lineTo(0, terrainProfile[0]);
  for (let x = 1; x < 1280; x++) ctx.lineTo(x, terrainProfile[x]);
  ctx.lineTo(1280, 720); ctx.closePath(); ctx.fill();
}

function render(ctx, game) {
  const detailLevel = game.visualDetail ?? 2;
  ctx.fillStyle = '#07111f'; ctx.fillRect(0, 0, 1280, 720);
  if (planetaryBackdrop.complete && planetaryBackdrop.naturalWidth) {
    ctx.imageSmoothingEnabled = true;
    ctx.globalAlpha = .42;
    ctx.drawImage(planetaryBackdrop, 0, 0, 1280, 720);
    ctx.fillStyle = '#07111f'; ctx.globalAlpha = .28; ctx.fillRect(0, 0, 1280, 720);
    ctx.globalAlpha = 1;
    ctx.imageSmoothingEnabled = false;
  }
  game.stars.forEach((s, index) => { if (detailLevel || index % 2 === 0) rect(ctx, s.x, s.y, s.size, s.size, s.speed > 180 ? '#b6e9ff' : '#5d91b8'); });
  drawGround(ctx, game.terrainProfile);
  for (const b of game.bullets) { rect(ctx, b.x, b.y, 20, 3, '#ffed81'); rect(ctx, b.x - 7, b.y, 6, 5, '#ff8d55'); }
  for (const e of game.enemies) drawEnemy(ctx, e, detailLevel);
  const isMoving = Object.values(game.keys).some(Boolean);
  const playerVisible = !game.playerHitCooldown || Math.floor(game.playerHitCooldown * 12) % 2 === 0;
  if (!game.playerDestroyed && playerVisible) drawPlayer(ctx, game.player, isMoving, detailLevel);
  for (const explosion of game.explosions) drawExplosion(ctx, explosion, detailLevel);
  text(ctx, `SCORE ${String(game.score).padStart(6, '0')}`, 30, 48, 22, '#ffdf70');
  text(ctx, `FX AUTO ${['LOW', 'MED', 'HIGH'][detailLevel]}`, 30, 70, 12, '#6f92a8');
  text(ctx, `LIVES ${'◆'.repeat(game.lives)}${'◇'.repeat(3 - game.lives)}`, 1250, 48, 22, '#a9d8ff', 'right');
  if (game.flash) { ctx.fillStyle = '#fff'; ctx.globalAlpha = game.flash * 1.5; ctx.fillRect(0, 0, 1280, 720); ctx.globalAlpha = 1; }
  if (game.gameOver) { ctx.fillStyle = '#02050c'; ctx.globalAlpha = .78; ctx.fillRect(0, 0, 1280, 720); ctx.globalAlpha = 1; text(ctx, 'MISSION FAILED', 640, 315, 48, '#ff6d70', 'center'); text(ctx, `FINAL SCORE  ${game.score}`, 640, 365, 24, '#ffdf70', 'center'); text(ctx, 'PRESS R TO RESTART', 640, 420, 20, '#b9dff2', 'center'); }
  if (game.stopped) { ctx.fillStyle = '#02050c'; ctx.globalAlpha = .82; ctx.fillRect(0, 0, 1280, 720); ctx.globalAlpha = 1; text(ctx, 'SESSION STOPPED', 640, 330, 44, '#ffdf70', 'center'); text(ctx, `SCORE  ${game.score}`, 640, 380, 22, '#b9dff2', 'center'); text(ctx, 'PRESS R TO RESTART', 640, 425, 18, '#8fb9d0', 'center'); }
  if (game.awaitingStart) { ctx.fillStyle = '#02050c'; ctx.globalAlpha = .72; ctx.fillRect(0, 0, 1280, 720); ctx.globalAlpha = 1; text(ctx, 'SPACE SHOOTER', 640, 310, 48, '#ffdf70', 'center'); text(ctx, 'PRESS ANY KEY OR CLICK TO START', 640, 372, 21, '#b9dff2', 'center'); text(ctx, 'GAMEPLAY AND AUDIO BEGIN TOGETHER', 640, 410, 14, '#6f92a8', 'center'); }
}

window.SpaceShooterRenderer = { render };
})();
