import PIXI from 'pixi.js';
import Scene from '../Scene';

class MainMenuScene extends Scene {
  init() {
    this.title = new PIXI.Text('Hello world', {
      font: '24px Comic Sans',
      fill: 0xff1010,
      align: 'center'
    });
    this.title.position = new PIXI.Point((this.size.width - this.title.width) / 2, 200);
    this.title.pivot = new PIXI.Point(this.title.width / 2, this.title.height / 2);

    this.screen.add(this.title);
  }

  update(d) {
    this.title.rotation += d * 0.001;
  }

  // render(screen) {
  //   super.render(screen);
  // }
}

export default MainMenuScene;
