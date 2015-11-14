import Assets from './Assets';
import Game from './Game';
import Screen from './Screen';
import MainMenuScene from './scene/MainMenuScene';

// const ROOT = window;

var manifest = require('../assets/manifest.json');
var assets = new Assets(JSON.parse(manifest));

var screen = new Screen();
var game = new Game(screen);
var mainMenu = new MainMenuScene();

assets.init();

// Start the game loop when we have fetched the assets
(function readyCheck() {
  if (assets.isDone) {
    game.init(mainMenu);
    game.loop();
  } else {
    setTimeout(readyCheck, 500);
  }
})();
