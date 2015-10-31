import Stats from 'stats-js';

class Game {
	constructor() {
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
	}

	init() {
		// Initialize the stat counter
		this.stats.setMode(0);
		document.body.appendChild(this.stats.domElement);
		
	}

	loop(t = 0) {
		// Start stat tracking
		this.stats.begin();

		// The request should be queued for the next frame
		requestAnimationFrame((_t) => this.loop(_t));

		// Calc the delta
		var delta = t - this.lastUpdate;
		this.lastUpdate = t;

		// End stat tracking
		this.stats.end();
	}
}

export default Game;
