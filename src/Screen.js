import PIXI from 'pixi.js';
import _ from 'lodash';
import Size from './Size';

class Screen {
  constructor(w = 800, h = 600) {
    var size = null;
    if (!(w instanceof Size)) {
      size = new Size(w, h);
    }

    /**
     * Size of the screen
     * @type {Size}
     */
    this.size = size;

    /**
     * PIXI's renderer to draw with
     * @member {PIXI.WebGLRenderer}
     */
    this.renderer = new PIXI.WebGLRenderer(this.size.width, this.size.height);

    // Just add the element to the root for now
    document.body.appendChild(this.renderer.view);

    /**
     * Stage to render objects on
     * @member {PIXI.Container}
     */
    this.stage = new PIXI.Container();
  }

  add(obj) {
    if (!(obj instanceof PIXI.DisplayObject)) {
      throw new TypeError('obj must be of type PIXI.DisplayObject');
    }

    this.stage.addChild(obj);
  }

  draw() {
    this.renderer.render(this.stage);
  }
}

export default Screen;
