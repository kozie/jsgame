import PIXI from 'pixi.js';
import Size from './Size';
import _ from 'lodash';

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
    this._parent = null;
  }

  init() {
    // Should be overridden in the sub class
  }

  get size() {
    return new Size(this.rectangle.width, this.rectangle.height);
  }

  set size(size) {
    if (!(size instanceof Size)) {
      throw new TypeError("size should be of object type Size");
    }

    this.rectangle.width = size.width;
    this.rectangle.height = size.height;
  }

  get position() {
    return new PIXI.Point(this.rectangle.x, this.rectangle.y);
  }

  set position(pos) {
    if (!(pos instanceof PIXI.Point)) {
      throw new TypeError("pos should be of object type PIXI.Point");
    }

    this.rectangle.x = pos.x;
    this.rectangle.y = pos.y;
  }

  add(obj) {
    if (!(obj instanceof GameObject)) throw new TypeError("Object should be a GameObject");

    obj.parent = this;
    this.objects.push(obj);
  }

  get parent() {
    return this._parent;
  }

  set parent(obj) {
    if (obj !== null && !(obj instanceof GameObject)) throw new TypeError("Object should be a GameObject");

    this._parent = obj;
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

  // render(screen) {
  //   _.forEach(this.objects, (obj) => {
  //     obj.render(screen);
  //   });
  // }
}

export default GameObject;
