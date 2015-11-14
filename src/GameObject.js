import PIXI from 'pixi.js';
import Size from './Size';

class GameObject {
  constructor(x = 0, y = 0, w = 0, h = 0) {
    /*xjshint ignore: start */
    // if (new.target === Player) {
    if (this.constructor === GameObject.prototype.constructor) {
      throw new TypeError(`${this.constructor.name} is an abstract class`);
    }
    /*xjshint ignore: end */

    // Create rectangle for position
    var rect = null;
    if (!(x instanceof PIXI.Rectangle)) {
      rect = new PIXI.Rectangle(x, y, w, h);
    }

    /**
     * Position and dimensions in the world/scene
     * @member {PIXI.Rectangle}
     */
    this.rectangle = rect;

    /**
     * List of GameObjects that are part of this object
     * @member {GameObject}
     */
    this.objects = [];

    /**
     * Parent object this object is added to
     * @type {GameObject}
     */
    this.parent = null;

    /**
     * Sprite to draw
     * @type {PIXI.Sprite}
     */
    this.sprite = null;
  }

  get size() {
    return new Size(this.rectangle.width, this.rectangle.height);
  }

  set size(w, h) {
    if (w instanceof Size) {
      this.rectangle.width = w.width;
      this.rectangle.height = w.height;
    } else {
      this.rectangle.width = w;
      this.rectangle.height = h;
    }
  }

  get position() {
    return new PIXI.Point(this.rectangle.x, this.rectangle.y);
  }

  set position(x, y) {
    if (x instanceof PIXI.Point) {
      this.rectangle.x = x.x;
      this.rectangle.y = x.y;
    } else {
      this.rectangle.x = x;
      this.rectangle.y = y;
    }
  }

  get sprite() {
    if (this.sprite) {
      this.sprite.position.x = this.position.x;
      this.sprite.position.y = this.position.y;
      this.sprite.width = this.size.width;
      this.sprite.height = this.size.height;
    }

    return this.sprite;
  }

  set sprite(spr) {
    // Just set the sprite
    this.sprite = spr;
  }

  add(obj) {
    if (!(obj instanceof GameObject)) throw new TypeError("Object should be a GameObject");

    obj.parent = this;
    this.objects.push(obj);
  }

  get parent() {
    return this.parent;
  }

  set parent(obj) {
    if (!(obj instanceof GameObject)) throw new TypeError("Object should be a GameObject");

    this.parent = obj;
  }

  input(keyboard, mouse, joystick) {
    _.forEach(this.objects, (obj) => {
      obj.input(keyboard, mouse, joystick);
    });
  }

  update(d) {
    _.forEach(this.objects, (obj) => {
      obj.update(d);
    });
  }

  render(screen) {
    _.forEach(this.objects, (obj) => {
      obj.render(screen);
    });
  }
}

export default GameObject;
