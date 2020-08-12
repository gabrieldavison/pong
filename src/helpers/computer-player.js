import Player from "./player";

class ComputerPlayer extends Player {
  constructor(physics, x, ball, side) {
    super(physics, x);
    this.ball = ball;
    this.side = side;
    //Side multiplier used to reverse directions depending on which side of the game board the sprite is created
    if (x > 400) {
      this.sideMultiplier = 1;
    } else {
      this.sideMultiplier = -1;
    }
  }
  movePlayer() {
    if (this.side === "left") {
      if (this.ball.y > this.sprite.y + 40 && this.ball.x < 400) {
        this.sprite.setVelocityY(200);
      } else if (this.ball.y < this.sprite.y - 40 && this.ball.x < 400) {
        this.sprite.setVelocityY(-200);
      } else if (this.ball.x > 400) {
        this.sprite.setVelocityY(0);
      }
    } else if (this.side === "right") {
      if (this.ball.y > this.sprite.y + 40 && this.ball.x > 400) {
        this.sprite.setVelocityY(200);
      } else if (this.ball.y < this.sprite.y - 40 && this.ball.x > 400) {
        this.sprite.setVelocityY(-200);
      } else if (this.ball.x < 400) {
        this.sprite.setVelocityY(0);
      }
    }
  }
}

export default ComputerPlayer;
