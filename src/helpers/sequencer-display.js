import { Game } from "phaser";

class SequencerDisplay {
  constructor(x, y, length, context) {
    this.length = length;
    this.xLocation = x;
    this.yLocation = y;
    this.context = context;
    this.steps = [];
    this.createRectangles();
  }

  createRectangles() {
    for (let i = 0; i < this.length; i++) {
      const rect = this.context.add.rectangle(
        this.xLocation + i * 30,
        this.yLocation,
        20,
        20
      );
      rect.setStrokeStyle(2, 0x1a65ac);
      this.steps.push(rect);
    }
  }

  activateStep(index) {
    this.steps.forEach((step) => {
      step.setFillStyle();
    });
    this.steps[index].setFillStyle(0x1a65ac);
  }
}

export default SequencerDisplay;
