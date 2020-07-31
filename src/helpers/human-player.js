import Player from "./player";

class HumanPlayer extends Player {
  constructor(physics, x, scene) {
    super(physics, x);
    this.input = this.setInputKeys("w", "s", scene);
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
  setInputKeys(up, down, scene) {
    const input = {};
    input.up = scene.input.keyboard.addKey(up);
    input.down = scene.input.keyboard.addKey(down);
    return input;
  }
}

export default HumanPlayer;
