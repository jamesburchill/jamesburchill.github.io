# Space Shooter

A lightweight browser-based side-view horizontal scrolling space shooter built with HTML5 Canvas and vanilla JavaScript. It uses separate plain JavaScript files with no build step, framework, or external assets required.

Published at [jamesburchill.com/games/spaceshooter](https://jamesburchill.com/games/spaceshooter/).

## Run

Open `index.html` in a modern browser. It works directly from disk or from a local server:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Controls

- Move: Arrow keys or `W`, `A`, `S`, `D`
- Fire: Spacebar
- Stop the current session: `Q`
- Restart after game over: `R`
- Launch: the game waits at its opening screen until any key or click. Browsers require this user gesture before Web Audio may play, so gameplay and ambient sound now begin together rather than the game running silently first.
- Audio: Music and effects use separate buses: a continuous detuned cinematic pad, slow drone, and atmospheric noise evolve smoothly with enemy pressure, while movement fades a non-musical filtered-noise thruster layer in and out. Lasers use a layered descending “pew”, armour hits use a metallic strike, and explosions combine a low noise burst with pitched impact layers.

## Structure

- `js/game.js`: game state, updates, spawning, and collision rules
- `js/entities.js`: player and enemy behaviours
- `js/renderer.js`: Canvas drawing only
- `js/main.js`: input wiring and animation loop

Explosions are stateful animated effects: alien ships produce a compact burst, a hero collision produces a larger blast for each lost life, and the final life ends in a prolonged catastrophic explosion.

Enemy paths expand through the run: looping and corkscrew manoeuvres appear after 15 and 30 seconds respectively. Purple armoured ace ships become more common over time, take two shots, and award 350 points. Their first hit produces a compact armour spark rather than an explosion; the surviving ship remains visibly damaged with darkened plating, cracks, smoke, and an unstable engine until the second hit destroys it.

The ground uses a classic stateful 1280-point integer height buffer. An accumulator advances it in exact one-pixel steps at 82 pixels per second regardless of frame rate. For each pixel, the existing samples shift left unchanged, the far-right Y continues towards a short bounded target or holds level for a plateau, and one new integer sample is appended. The new Y can change by at most one vertical pixel per appended column. Targets are limited to 6–28 pixels and overall local relief is capped at 96 pixels, preventing isolated giant peaks. Once appended, a point is never recalculated or vertically mutated. Terrain is one solid charcoal shape with no texture overlays or procedural mountain functions. Newly generated floor rises by distance up to 33% of the viewport, while the top 10% remains unavailable to terrain.

Losing a non-final life does not respawn or reposition the hero. The ship remains in place, flashes during a 1.25-second damage grace period, and can be steered away from danger before collisions become active again.

The distant planetary panorama in `assets/distant-planets.png` is rendered as a faded, fixed layer behind the procedural starfield. Keeping the large planets stationary prevents sub-pixel shimmer and reinforces their extreme distance.

The rocky terrain and starfield scroll left at flight speed while the planetary panorama remains fixed. Rendering starts at high detail and samples sustained frame rate every 2.5 seconds; it automatically steps through high, medium, and low effects detail with hysteresis before gameplay responsiveness suffers. The current level appears in the HUD as `FX AUTO`.

The canvas has an internal 1280×720 resolution and scales responsively with crisp pixel-art rendering.
