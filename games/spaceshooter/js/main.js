(() => {
const { Game } = window.SpaceShooterGame;
const { render } = window.SpaceShooterRenderer;
const { AudioManager } = window.SpaceShooterAudio;

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
const game = new Game();
const audio = new AudioManager();
game.awaitingStart = true;
window.SpaceShooterAudio.instance = audio;
const play = event => audio.playEffect(event);
const launch = () => {
  if (!game.awaitingStart) return false;
  game.awaitingStart = false;
  audio.unlock();
  return true;
};
window.addEventListener('keydown', event => { if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) event.preventDefault(); if (launch()) return; if (event.code !== 'Space') audio.unlock(); play(game.setKey(event.code, true)); });
window.addEventListener('keyup', event => { if (event.code !== 'Space') audio.unlock(); game.setKey(event.code, false); });
window.addEventListener('pointerdown', () => { if (!launch()) audio.unlock(); });
window.addEventListener('blur', () => { game.keys = {}; });
let previous = performance.now();
let visualDetail = 2;
let sampleSeconds = 0;
let sampleFrames = 0;
let detailCooldown = 0;

function tuneVisualDetail(dt) {
  sampleSeconds += dt; sampleFrames++; detailCooldown = Math.max(0, detailCooldown - dt);
  if (sampleSeconds < 2.5 || detailCooldown) return;
  const fps = sampleFrames / sampleSeconds;
  if (fps < 50 && visualDetail > 0) { visualDetail--; detailCooldown = 4; }
  else if (fps > 58 && visualDetail < 2) { visualDetail++; detailCooldown = 6; }
  sampleSeconds = 0; sampleFrames = 0;
}

function frame(now) {
  const dt = Math.min(.05, (now - previous) / 1000);
  previous = now;
  tuneVisualDetail(dt);
  game.visualDetail = visualDetail;
  const event = game.awaitingStart ? null : game.update(dt);
  play(event);
  audio.setTension(game.awaitingStart || game.gameOver || game.stopped ? 0 : game.tension);
  if (game.gameOver) audio.gameOverAmbience(now / 1000);
  audio.setThruster(!game.awaitingStart && !game.gameOver && !game.stopped && Object.values(game.keys).some(Boolean));
  render(ctx, game);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
})();
