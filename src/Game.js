import Stats from 'stats-js';
import Screen from './Screen';
import Scene from './Scene';
import Keyboard from './input/Keyboard';
import Mouse from './input/Mouse';
import Joystick from './Input/Joystick';

class Game {
	constructor(screen) {
		/**
		 * Keeps track of the last update
		 * @member {Number}
		 */
		this.lastUpdate = 0;
		this.frames = 0;
		this.lastFrameUpdate = 0;

		/**
		 * Stat counter
		 * @member {Stats}
		 */
		this.stats = new Stats();

		/**
		 * Current scene to use
		 * @type {Scene}
		 */
		this.scene = null;

		/**
		 * Screen to render to
		 * @type {Screen}
		 */
		this.screen = screen;

		/**
		 * Keyboard events
		 * @member {Keyboard}
		 */
		this.keyboard = new Keyboard();

		/**
		 * Mouse events
		 * @member {Mouse}
		 */
		this.mouse = new Mouse();

		/**
		 * Joystick events
		 * @member {Joystick}
		 */
		this.joystick = new Joystick();
	}

	init(scene) {
		// Initialize the stat counter
		this.stats.setMode(0);
		document.body.appendChild(this.stats.domElement);

		// Set initial scene
		this.scene = scene;
	}

	loop(t = 0) {
		// Start stat tracking
		this.stats.begin();

		// The request should be queued for the next frame
		requestAnimationFrame((_t) => this.loop(_t));

		// Calc the delta
		var delta = t - this.lastUpdate;
		this.lastUpdate = t;

		// Listen for inputs
		this.scene.input(this.keyboard, this.mouse, this.joystick);

		// Update
		this.scene.update(delta);

		// Render / draw
		this.scene.render(this.screen);

		// End stat tracking
		this.stats.end();
	}
}

export default Game;
