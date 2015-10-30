import Assets from './Assets';
import Game from './Game';

const ROOT = window;

var manifest = require('../assets/manifest.json');
var assets = new Assets(JSON.parse(manifest));

var game = new Game();
assets.init();

// Start the game loop when we have fetched the assets
(function readyCheck() {
  if (assets.isDone) {
    game.init();
    game.loop();
  } else {
    setTimeout(readyCheck, 500);
  }
})();
