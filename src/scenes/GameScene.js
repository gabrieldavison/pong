import Phaser from "phaser";
import ScoreLabel from "../ui/ScoreLabel";
import playNote from "../sound/synthesizer";
import Sequencer from "../sound/sequencer";
import HumanPlayer from "../helpers/human-player";
import ComputerPlayer from "../helpers/computer-player";
import SequencerDisplay from "../helpers/sequencer-display";
import KeyRow from "../helpers/keyRow";
import Controller from "../helpers/controller";
import scaleValues from "../helpers/scale-values";

//Global Variables

let ballVelocity = 200;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game-scene");

    this.player1 = undefined;
    this.player2 = undefined;

    this.ball = undefined;

    this.controller = undefined;

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
    //Creates controller for speeds
    this.controller = new Controller(300, 300, this);

    //Creates game objects
    this.ball = this.createBall();

    //Set up player 1 as human
    // this.player1 = new HumanPlayer(this.physics, 30, this);

    //Set up player1 as computer
    this.player1 = new ComputerPlayer(this.physics, 30, this.ball, "left");

    // this.player2 = this.createPlayer(770);
    this.player2 = new ComputerPlayer(this.physics, 770, this.ball, "right");

    //creates boundary objects
    const topBoundary = this.createBoundary(400, 0, 800, 10);
    const bottomBoundary = this.createBoundary(400, 399, 800, 10);
    const leftBoundary = this.createBoundary(0, 200, 1, 400);
    const rightBoundary = this.createBoundary(799, 200, 1, 400);

    //Creates Sequencers

    const topSeqDisplay = new SequencerDisplay(100, 100, 5, this);
    const topSeq = new Sequencer(
      ["c4", "d4", "e4", "g4", "a4"],
      0,
      playNote,
      "8n",
      topSeqDisplay
    );

    // this.add.rectangle(100, 100, 20, 20, 0x6666ff);
    const bottomSeqDisplay = new SequencerDisplay(100, 130, 5, this);
    const bottomSeq = new Sequencer(
      ["c4", "d4", "e4", "g4", "a4"],
      2,
      playNote,
      "8n",
      bottomSeqDisplay
    );
    const leftSeqDisplay = new SequencerDisplay(100, 160, 4, this);
    const leftPaddleSeq = new Sequencer(
      ["c3", "d3", "c3", "a3"],
      1,
      playNote,
      "4n",
      leftSeqDisplay
    );
    const rightSeqDisplay = new SequencerDisplay(100, 190, 4, this);
    const rightPaddleSeq = new Sequencer(
      ["a6", "d6", "a6", "d6"],
      1,
      playNote,
      "4n",
      rightSeqDisplay
    );
    const leftBoundarySeqDisplay = new SequencerDisplay(100, 220, 3, this);
    const leftBoundarySeq = new Sequencer(
      ["a2", "e2", "c3"],
      1,
      playNote,
      "4n",
      leftBoundarySeqDisplay
    );
    const rightBoundarySeqDisplay = new SequencerDisplay(100, 250, 3, this);
    const rightBoundarySeq = new Sequencer(
      ["a2", "g2", "e3"],
      1,
      playNote,
      "4n",
      rightBoundarySeqDisplay
    );
    // Adds colliders for paddle and ball with a callback function that triggers the synthesizer
    this.physics.add.collider(
      this.player1.sprite,
      this.ball,
      () => {
        this.ballCollision(this.player1.sprite);
        leftPaddleSeq.playNext();
      },
      null,
      this
    );
    this.physics.add.collider(
      this.player2.sprite,
      this.ball,
      () => {
        this.ballCollision(this.player2.sprite);
        rightPaddleSeq.playNext();
      },
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

    //Add overlaps for left and right world boundary
    this.physics.add.collider(
      leftBoundary,
      this.ball,
      () => {
        leftBoundarySeq.playNext();
        this.player2ScoreLabel.add(1);
        this.resetGame();
      },
      null,
      this
    );

    this.physics.add.collider(
      rightBoundary,
      this.ball,
      () => {
        rightBoundarySeq.playNext();
        this.player1ScoreLabel.add(1);
        this.resetGame();
      },
      null,
      this
    );

    //Sets up ScoreLabels
    this.player1ScoreLabel = this.createScoreLabel(10, 10, 0);
    this.player2ScoreLabel = this.createScoreLabel(750, 10, 0);
  }

  update() {
    this.player1.movePlayer();

    this.player2.movePlayer();

    if (this.ball.x >= 790) {
      this.player1ScoreLabel.add(1);
      this.resetGame();
    } else if (this.ball.x <= 10) {
      this.player2ScoreLabel.add(1);
      this.resetGame();
    }
    const pointer = this.input.activePointer;
    if (pointer.isDown) {
      this.controller.shape.x = pointer.x;
      this.controller.shape.y = pointer.y;
      ballVelocity = Math.round(
        scaleValues(this.controller.shape.y, 0, 400, 2000, 10)
      );
      if (this.ball.body.velocity.x > 0) {
        this.ball.setVelocityX(ballVelocity);
      } else if (this.ball.body.velocity.x < 0) {
        this.ball.setVelocityX(ballVelocity * -1);
      }
    }
  }

  createBall(speed) {
    const ball = this.physics.add.sprite(400, 200, "ball");
    ball.body.setAllowGravity(false);
    ball.setCollideWorldBounds(true);
    ball.setVelocityX(Math.random() > 0.5 ? -1 * ballVelocity : ballVelocity);
    ball.setVelocityY(Phaser.Math.Between(-100, 100));
    ball.setBounce(1);
    return ball;
  }

  resetGame() {
    this.player1.y = 200;
    this.player2.y = 200;
    this.ball.x = 400;
    this.ball.y = 200;
    this.ball.setVelocityX(
      Math.random() > 0.5 ? -1 * ballVelocity : ballVelocity
    );
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
    // this.ball.setVelocityX(
    //   //add 10% to ball velocity every time it collides with player
    //   (this.ball.body.velocity.x += 0.1 * this.ball.body.velocity.x)
    // );
  }

  createBoundary(x, y, width, height) {
    const boundary = this.physics.add.sprite(x, y);
    boundary.setSize(width, height);
    boundary.setImmovable(true);
    boundary.body.setAllowGravity(false);
    return boundary;
  }
}
