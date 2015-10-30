import PIXI from 'pixi.js';

class Assets {
	constructor(manifest) {
		/**
		 * Holds the data of the manifest file
		 * @member {string}
		 */
		this.manifest = manifest;

		/**
		 * Flag if all manifest files are done loading
		 * @member {Boolean}
		 */
		this.isDone = false;

		/**
		 * The loader for all assets
		 * @member {PIXI.loaders.Loader} 'assets/'
		 */
		this.loader = new PIXI.loaders.Loader('assets/');
	}

	init() {
		// Add images
		for (let i in this.data.images) {
			this.loader.add(i, 'images/' + this.data.images[i]);
		}

		// When done loading..
		this.loader.once('complete', () => this.isDone = true);

		// Loading time! :D
		this.loader.load();
	}

	get data() {
		return this.manifest;
	}
}

export default Assets;
