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

let player1Velocity = 500;
let player2Velocity = 500;

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

    this.leftBoundaryNotes = undefined;
    this.rightBoundaryNotes = undefined;
    this.topBoundaryNotes = undefined;
    this.bottomBoundaryNotes = undefined;
    this.leftPaddleNotes = undefined;
    this.rightPaddleNotes = undefined;
  }
  init(data) {
    this.leftBoundaryNotes = data.leftBoundary;
    this.rightBoundaryNotes = data.rightBoundary;
    this.topBoundaryNotes = data.topBoundary;
    this.bottomBoundaryNotes = data.bottomBoundary;
    this.leftPaddleNotes = data.leftPaddle;
    this.rightPaddleNotes = data.rightPaddle;
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
    const topBoundary = this.createBoundary(400, 0, 900, 20);
    const bottomBoundary = this.createBoundary(400, 400, 900, 20);
    const leftBoundary = this.createBoundary(0, 200, 1, 400);
    const rightBoundary = this.createBoundary(799, 200, 1, 400);

    //Creates Sequencers
    if (this.topBoundaryNotes.length > 0) {
      var topSeqDisplay = new SequencerDisplay(
        100,
        100,
        this.topBoundaryNotes.length,
        this
      );
      var topSeq = new Sequencer(
        this.topBoundaryNotes,
        0,
        playNote,
        "8n",
        topSeqDisplay
      );
    }

    if (this.bottomBoundaryNotes.length > 0) {
      var bottomSeqDisplay = new SequencerDisplay(
        100,
        130,
        this.bottomBoundaryNotes.length,
        this
      );
      var bottomSeq = new Sequencer(
        this.bottomBoundaryNotes,
        2,
        playNote,
        "8n",
        bottomSeqDisplay
      );
    }

    if (this.leftPaddleNotes.length > 0) {
      var leftSeqDisplay = new SequencerDisplay(
        100,
        160,
        this.leftPaddleNotes.length,
        this
      );
      var leftPaddleSeq = new Sequencer(
        this.leftPaddleNotes,
        1,
        playNote,
        "4n",
        leftSeqDisplay
      );
    }

    if (this.rightPaddleNotes.length > 0) {
      var rightSeqDisplay = new SequencerDisplay(
        100,
        190,
        this.rightPaddleNotes.length,
        this
      );
      var rightPaddleSeq = new Sequencer(
        this.rightPaddleNotes,
        1,
        playNote,
        "4n",
        rightSeqDisplay
      );
    }

    if (this.leftBoundaryNotes.length > 0) {
      var leftBoundarySeqDisplay = new SequencerDisplay(
        100,
        220,
        this.leftBoundaryNotes.length,
        this
      );
      var leftBoundarySeq = new Sequencer(
        this.leftBoundaryNotes,
        1,
        playNote,
        "4n",
        leftBoundarySeqDisplay
      );
    }

    if (this.rightBoundaryNotes.length > 0) {
      var rightBoundarySeqDisplay = new SequencerDisplay(
        100,
        250,
        this.rightBoundaryNotes.length,
        this
      );
      var rightBoundarySeq = new Sequencer(
        this.rightBoundaryNotes,
        1,
        playNote,
        "4n",
        rightBoundarySeqDisplay
      );
    }

    // Adds colliders for paddle and ball with a callback function that triggers the synthesizer
    this.physics.add.collider(
      this.player1.sprite,
      this.ball,
      () => {
        this.ballCollision(this.player1.sprite);
        if (this.leftPaddleNotes.length > 0) {
          leftPaddleSeq.playNext();
        }
      },
      null,
      this
    );
    this.physics.add.collider(
      this.player2.sprite,
      this.ball,
      () => {
        this.ballCollision(this.player2.sprite);
        if (this.rightPaddleNotes.length > 0) {
          rightPaddleSeq.playNext();
        }
      },
      null,
      this
    );

    //Add colliders for boundary objects
    this.physics.add.collider(
      topBoundary,
      this.ball,
      () => {
        if (this.topBoundaryNotes.length > 0) {
          topSeq.playNext();
        }
      },
      null,
      this
    );
    this.physics.add.collider(
      bottomBoundary,
      this.ball,
      () => {
        if (this.bottomBoundaryNotes.length > 0) {
          bottomSeq.playNext();
        }
      },
      null,
      this
    );

    //Add overlaps for left and right world boundary
    this.physics.add.collider(
      leftBoundary,
      this.ball,
      () => {
        if (this.leftBoundaryNotes.length > 0) {
          leftBoundarySeq.playNext();
        }
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
        if (this.rightBoundaryNotes.length > 0) {
          rightBoundarySeq.playNext();
        }
        this.player1ScoreLabel.add(1);
        this.resetGame();
      },
      null,
      this
    );

    //Sets up ScoreLabels
    this.player1ScoreLabel = this.createScoreLabel(10, 10, 0);
    this.player2ScoreLabel = this.createScoreLabel(750, 10, 0);

    //Set up edit button
    const editButton = this.add.text(720, 360, "Edit", { fontSize: "30px" });
    editButton.setInteractive().on("pointerdown", () => {
      this.scene.start("SequencerSetup", {
        leftBoundary: this.leftBoundaryNotes,
        rightBoundary: this.rightBoundaryNotes,
        topBoundary: this.topBoundaryNotes,
        bottomBoundary: this.bottomBoundaryNotes,
        leftPaddle: this.leftPaddleNotes,
        rightPaddle: this.rightPaddleNotes,
      });
    });
  }

  update() {
    this.player1.movePlayer(player1Velocity);

    this.player2.movePlayer(player2Velocity);

    //Increments score
    if (this.ball.x >= 790) {
      this.player1ScoreLabel.add(1);
      this.resetGame();
    } else if (this.ball.x <= 10) {
      this.player2ScoreLabel.add(1);
      this.resetGame();
    }
    const pointer = this.input.activePointer;
    if (pointer.isDown) {
      //Moves controller to pointer
      this.controller.shape.x = pointer.x;
      this.controller.shape.y = pointer.y;

      //Sets ball velocity to a new value dependent on position of pointer
      ballVelocity = Math.round(
        scaleValues(this.controller.shape.y, 0, 400, 2000, 10)
      );

      //Sets velocity of both players depending on pointer y position
      player1Velocity = Math.round(
        scaleValues(this.controller.shape.y, 0, 400, 2000, 10)
      );
      player2Velocity = Math.round(
        scaleValues(this.controller.shape.y, 0, 400, 2000, 10)
      );

      //Modifies player velocities depending on pointer x position to give one of them an advantage if cursor is on their size
      player1Velocity *= scaleValues(this.controller.shape.x, 0, 800, 1.5, 0.2);
      player2Velocity *= scaleValues(this.controller.shape.x, 0, 800, 0.2, 1.5);

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
    ball.setBounce(1, 1);
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
    if (player.body.velocity.y === 0) {
      this.ball.setVelocityY(Math.random() * 20);
    }
    this.ball.setVelocityY(Math.random() * 100 + player.body.velocity.y);
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
