import Phaser from "phaser";
import ScoreLabel from "../ui/ScoreLabel";
import playNote from "../sound/synthesizer";
import Sequencer from "../sound/sequencer";
import { HumanPlayer } from "../helpers/player";

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
    //Creates game objects
    this.player1 = this.createPlayer(30);
    this.player2 = this.createPlayer(770);
    this.ball = this.createBall();

    //creates boundary objects
    const topBoundary = this.createBoundary(400, 0);
    const bottomBoundary = this.createBoundary(400, 399);

    //Creates Sequencers

    const topSeq = new Sequencer(
      ["c4", "d4", "e4", "g4", "a4"],
      0,
      playNote,
      "8n"
    );
    const bottomSeq = new Sequencer(
      ["c4", "d4", "e4", "g4", "a4"],
      2,
      playNote,
      "8n"
    );

    // Adds colliders for paddle and ball with a callback function that triggers the synthesizer
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

    //Add colliders for boundary objects
    this.physics.add.collider(
      topBoundary,
      this.ball,
      () => topSeq.playNext(),
      null,
      this
    );
    this.physics.add.collider(
      bottomBoundary,
      this.ball,
      () => bottomSeq.playNext(),
      null,
      this
    );

    //Set up player 1 controls
    this.setPlayerInputKeys(this.player1Input, "W", "S");

    //Sets up ScoreLabels
    this.player1ScoreLabel = this.createScoreLabel(10, 10, 0);
    this.player2ScoreLabel = this.createScoreLabel(775, 10, 0);
  }

  update() {
    //Check for player input
    this.checkPlayerInput(this.player1Input, this.player1);

    //Moves the AI
    this.moveAi(this.player2);

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

  createComputerPlayer(x) {}

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
      //add 10% to ball velocity every time it collides with player
      (this.ball.body.velocity.x += 0.1 * this.ball.body.velocity.x)
    );
  }

  moveAi(player) {
    if (this.ball.y > player.y + 40 && this.ball.x > 200) {
      player.setVelocityY(200);
    } else if (this.ball.y < player.y - 40 && this.ball.x > 200) {
      player.setVelocityY(-200);
    }
  }

  createBoundary(x, y) {
    const boundary = this.physics.add.sprite(x, y);
    boundary.setSize(800, 10);
    boundary.setImmovable(true);
    boundary.body.setAllowGravity(false);
    return boundary;
  }
}
