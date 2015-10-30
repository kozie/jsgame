class Game {
	constructor() {
		// Well.. nothing here, actually
	}

	init() {
		// Start the game loop when we have fetched the assets
		(function isReady() {
			if (assets.isDone) {
				this.loop();
			} else {
				setTimeout(isReady.bind(this), 500);
			}
		})();
	}

	loop() {

	}
}

export default Game;
