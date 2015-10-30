import Assets from './Assets';
import Game from './Game';

const ROOT = window;

var manifest = require('../assets/manifest.json');
var assets = new Assets(JSON.parse(manifest));
console.log(assets.data);

var game = new Game();
game.init();
