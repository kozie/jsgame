import PIXI from 'pixi.js';
import GameObject from './GameObject';
import Screen from './Screen';

class Scene extends GameObject {
  constructor(screen) {
    /**
     * Screen object to draw GameObjects on
     * @member {Screen}
     */
    this.screen = screen;

    super.constructor(0, 0, screen.width, screen.height);
  }

  render() {
    super.render(this.screen);
  }
}

export default Scene;
