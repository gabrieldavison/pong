import Phaser from "phaser";
import ScoreLabel from "../ui/ScoreLabel";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");

    this.player1 = undefined;
    this.player2 = undefined;

    this.ball = undefined;

    this.player1Input = { up: undefined, down: undefined };
    this.player2Input = { up: undefined, down: undefined };

    this.player1ScoreLabel = undefined;
    this.player2ScoreLabel = undefined;
  }

  preload() {
    this.load.image("paddle", "./assets/paddle.png");
    this.load.image("ball", "./assets/ball.png");
  }

  create() {
    //Creates objects
    this.player1 = this.createPlayer(30);
    this.player2 = this.createPlayer(770);
    this.ball = this.createBall();

    // Adds colliders
    this.physics.add.collider(
      this.player1,
      this.ball,
      () => this.ballCollision(this.player1),
      null,
      this
    );
    this.physics.add.collider(
      this.player2,
      this.ball,
      () => this.ballCollision(this.player2),
      null,
      this
    );

    // this.physics.add.collider(this.player1, this.ball);
    // this.physics.add.collider(this.player2, this.ball);

    //Set up player 1 controls
    this.setPlayerInputKeys(this.player1Input, "W", "S");
    this.setPlayerInputKeys(this.player2Input, "UP", "DOWN");

    //Sets up ScoreLabels
    this.player1ScoreLabel = this.createScoreLabel(10, 10, 0);
    this.player2ScoreLabel = this.createScoreLabel(775, 10, 0);
  }

  update() {
    this.checkPlayerInput(this.player1Input, this.player1);
    this.checkPlayerInput(this.player2Input, this.player2);

    if (this.ball.x >= 795) {
      this.player1ScoreLabel.add(1);
      this.resetGame();
    } else if (this.ball.x <= 5) {
      this.player2ScoreLabel.add(1);
      this.resetGame();
    }
  }

  createPlayer(x) {
    const player = this.physics.add.sprite(x, 200, "paddle").setScale(0.3);
    player.setImmovable(true);
    player.setCollideWorldBounds(true);
    player.body.setAllowGravity(false);
    return player;
  }

  createBall(speed) {
    const ball = this.physics.add.sprite(400, 200, "ball");
    ball.body.setAllowGravity(false);
    ball.setCollideWorldBounds(true);
    ball.setVelocityX(Math.random() > 0.5 ? -200 : 200);
    ball.setVelocityY(Phaser.Math.Between(-100, 100));
    ball.setBounce(1);
    return ball;
  }

  setPlayerInputKeys(playerInput, up, down) {
    playerInput.up = this.input.keyboard.addKey(up);
    playerInput.down = this.input.keyboard.addKey(down);
  }

  checkPlayerInput(playerInput, player) {
    if (playerInput.up.isDown) {
      player.setVelocityY(-200);
    } else if (playerInput.down.isDown) {
      player.setVelocityY(200);
    } else if (playerInput.down.isUp && playerInput.up.isUp) {
      player.setVelocityY(0);
    }
  }

  resetGame() {
    this.player1.y = 200;
    this.player2.y = 200;
    this.ball.x = 400;
    this.ball.y = 200;
    this.ball.setVelocityX(Math.random() > 0.5 ? -200 : 200);
    this.ball.setVelocityY(Phaser.Math.Between(-100, 100));
  }

  createScoreLabel(x, y, score) {
    const style = { fontSize: "32px", fill: "#ffffff" };
    const label = new ScoreLabel(this, x, y, score, style);

    this.add.existing(label);

    return label;
  }

  ballCollision(player) {
    this.ball.setVelocityY(Math.random() * 50 + player.body.velocity.y);
    this.ball.setVelocityX(
      (this.ball.body.velocity.x += 0.1 * this.ball.body.velocity.x)
    );
  }
}
