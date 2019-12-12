import * as PIXI from "pixi.js";

export default class Slider extends PIXI.Container {
  constructor(stage) {
    super();
    this.rect = new PIXI.Rectangle(10, 10, 20, stage.height - 20);

    //super(10, 10, 20 , 20);

    console.log("Creating rect height :: ", stage._height, stage);

    this.bgGraphics = new PIXI.Graphics();
    const color = 0x2c3e50;
    this.bgGraphics.beginFill(color, 1);
    this.bgGraphics.drawRect(
      this.rect.x,
      this.rect.y,
      this.rect.width,
      this.rect.height
    );
    this.bgGraphics.endFill();
    this.addChild(this.bgGraphics);
    // stage.addChild(this);
  }

  resize(stage) {
    console.log("resize slider to height :: ", stage._height, stage);
    this.rect = new PIXI.Rectangle(
      10,
      10,
      stage._width / 10,
      stage._height - 20
    );
  }
}
