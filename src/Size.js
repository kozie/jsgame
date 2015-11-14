import PIXI from 'pixi.js';

class Size extends PIXI.Point {
  get width() {
    return this.x;
  }

  set width(w) {
    this.x = w;
  }

  get height() {
    return this.y;
  }

  set height(h) {
    this.y = h;
  }
}

export default Size;
