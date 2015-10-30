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
	}

	init() {
		// TODO preload stuff here
		this.isDone = true;
	}

	get data() {
		return this.manifest;
	}
}

export default Assets;
