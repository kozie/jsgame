import PIXI from 'pixi.js';

class Assets {
	constructor(manifest) {
		/**
		 * Holds the data of the manifest file
		 * @member {string}
		 */
		this.manifest = manifest;

		/**
		 * The loader for all assets
		 * @member {PIXI.loaders.Loader} 'assets/'
		 */
		this.loader = new PIXI.loaders.Loader('assets/');
	}

	init() {
		// Add images
		for (let i in this.data.images) {
			this.loader.add(i, `images/${this.data.images[i]}`);
		}

		// When done loading..
		// this.loader.once('complete', () => this.isDone = true);

		// When a resource has been loaded
		this.loader.on('load', (loader, res) => {
			console.log(loader.progress);

			if (res.isImage) {
				this.data.images[res.name] = res.data;
			} // else ..
		});

		// Loading time! :D
		this.loader.load();
	}

	get data() {
		return this.manifest;
	}

	get isDone() {
		if (!this.loader) return false;

		return (this.loader.loading === false && this.loader.progress === 100);
	}
}

export default Assets;
