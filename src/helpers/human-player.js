import Player from "./player";

class HumanPlayer extends Player {
  constructor(physics, x, input) {
    super(physics, x);
    this.input = input;
  }
  movePlayer() {
    if (this.input.up.isDown) {
      this.sprite.setVelocityY(-200);
    } else if (this.input.down.isDown) {
      this.sprite.setVelocityY(200);
    } else if (this.input.down.isUp && this.input.up.isUp) {
      this.sprite.setVelocityY(0);
    }
  }
}

export default HumanPlayer;
