import Player from "./player";

class ComputerPlayer extends Player {
  constructor(physics, x, ball) {
    super(physics, x);
    this.ball = ball;

    //Side multiplier used to reverse directions depending on which side of the game board the sprite is created
    if (x > 400) {
      this.sideMultiplier = 1;
    } else {
      this.sideMultiplier = -1;
    }
  }
  movePlayer() {
    if (
      this.ball.y > this.sprite.y + 40 &&
      this.ball.x > 400 * this.sideMultiplier
    ) {
      this.sprite.setVelocityY(200);
    } else if (
      this.ball.y < this.sprite.y - 40 &&
      this.ball.x > 400 * this.sideMultiplier
    ) {
      this.sprite.setVelocityY(-200);
    } else if (this.ball.x < 400) {
      this.sprite.setVelocityY(0);
    }
  }
}

export default ComputerPlayer;
