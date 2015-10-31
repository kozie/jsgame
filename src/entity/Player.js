class Player {
  constructor() {
    /*jshint ignore: start */
    // if (new.target === Player) {
    if (this.constructor.name === Player.prototype.constructor.name) {
      throw new TypeError('Player is an abstract class');
    }
    /*jshint ignore: end */
  }
}

export default Player;
