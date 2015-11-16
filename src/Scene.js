import PIXI from 'pixi.js';
import GameObject from './GameObject';
import Screen from './Screen';
import Size from './Size';

class Scene extends GameObject {
  constructor(screen, size) {
    if (!(size instanceof Size)) {
      size = new Size(screen.size.width, screen.size.height);
    }

    super(0, 0, size.width, size.height);

    /**
     * Screen object to draw GameObjects on
     * @member {Screen}
     */
    this.screen = screen;

    /**
     * Size of the current scene
     * @type {Size}
     */
    this.size = size;
  }
}

export default Scene;
