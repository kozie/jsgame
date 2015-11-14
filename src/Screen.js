import PIXI from 'pixi.js';
import _ from 'lodash';

class Screen {
  constructor(x = 800, y = 600) {
    var size = null;
    if (!(size instanceof PIXI.Point)) {
      size = new PIXI.Point(x, y);
    }

    /**
     * Size of the screen
     * @type {PIXI.Point}
     */
    this.size = size;

    /**
     * PIXI's renderer to draw with
     * @member {PIXI.WebGLRenderer}
     */
    this.renderer = new PIXI.WebGLRenderer(800, 600);

    // Just add the element to the root for now
    document.body.appendChild(this.renderer.view);

    /**
     * Stage to render objects on
     * @member {PIXI.Container}
     */
    this.stage = new PIXI.Container();
  }

  add(obj) {
    // Add sprite if the object has once
    if (obj.sprite !== null) {
      this.stage.add(obj.sprite);
    }

    // Check for children
    _.forEach(obj.objects, (_obj) => {
      this.add(_obj);
    });
  }

  render() {
    this.renderer.render(this.stage);
  }
}

export default Screen;
