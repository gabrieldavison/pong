import Phaser from "phaser";
import Arrow from "../helpers/arrow";
import Player from "../helpers/player";
import Keyboard from "../helpers/keyboard";

export default class SequencerSetup extends Phaser.Scene {
  constructor() {
    super("SequencerSetup");
    this.noteObjects = {
      leftBoundary: {
        c: undefined,
        cs: undefined,
        d: undefined,
        ds: undefined,
        e: undefined,
        f: undefined,
        fs: undefined,
        g: undefined,
        gs: undefined,
        a: undefined,
        as: undefined,
        b: undefined,
      },
      rightBoundary: {
        c: undefined,
        cs: undefined,
        d: undefined,
        ds: undefined,
        e: undefined,
        f: undefined,
        fs: undefined,
        g: undefined,
        gs: undefined,
        a: undefined,
        as: undefined,
        b: undefined,
      },
      topBoundary: {
        c: undefined,
        cs: undefined,
        d: undefined,
        ds: undefined,
        e: undefined,
        f: undefined,
        fs: undefined,
        g: undefined,
        gs: undefined,
        a: undefined,
        as: undefined,
        b: undefined,
      },
      bottomBoundary: {
        c: undefined,
        cs: undefined,
        d: undefined,
        ds: undefined,
        e: undefined,
        f: undefined,
        fs: undefined,
        g: undefined,
        gs: undefined,
        a: undefined,
        as: undefined,
        b: undefined,
      },
      leftPaddle: {
        c: undefined,
        cs: undefined,
        d: undefined,
        ds: undefined,
        e: undefined,
        f: undefined,
        fs: undefined,
        g: undefined,
        gs: undefined,
        a: undefined,
        as: undefined,
        b: undefined,
      },
      rightPaddle: {
        c: undefined,
        cs: undefined,
        d: undefined,
        ds: undefined,
        e: undefined,
        f: undefined,
        fs: undefined,
        g: undefined,
        gs: undefined,
        a: undefined,
        as: undefined,
        b: undefined,
      },
    };
    this.arrowObjects = {
      leftBoundary: {
        object: undefined,
        notes: {
          c: undefined,
          cs: undefined,
          d: undefined,
          ds: undefined,
          e: undefined,
          f: undefined,
          fs: undefined,
          g: undefined,
          gs: undefined,
          a: undefined,
          as: undefined,
          b: undefined,
        },
      },
      rightBoundary: {
        object: undefined,
        notes: {
          c: undefined,
          cs: undefined,
          d: undefined,
          ds: undefined,
          e: undefined,
          f: undefined,
          fs: undefined,
          g: undefined,
          gs: undefined,
          a: undefined,
          as: undefined,
          b: undefined,
        },
      },
      topBoundary: {
        object: undefined,
        notes: {
          c: undefined,
          cs: undefined,
          d: undefined,
          ds: undefined,
          e: undefined,
          f: undefined,
          fs: undefined,
          g: undefined,
          gs: undefined,
          a: undefined,
          as: undefined,
          b: undefined,
        },
      },
      bottomBoundary: {
        object: undefined,
        notes: {
          c: undefined,
          cs: undefined,
          d: undefined,
          ds: undefined,
          e: undefined,
          f: undefined,
          fs: undefined,
          g: undefined,
          gs: undefined,
          a: undefined,
          as: undefined,
          b: undefined,
        },
      },
      leftPaddle: {
        object: undefined,
        notes: {
          c: undefined,
          cs: undefined,
          d: undefined,
          ds: undefined,
          e: undefined,
          f: undefined,
          fs: undefined,
          g: undefined,
          gs: undefined,
          a: undefined,
          as: undefined,
          b: undefined,
        },
      },
      rightPaddle: {
        object: undefined,
        notes: {
          c: undefined,
          cs: undefined,
          d: undefined,
          ds: undefined,
          e: undefined,
          f: undefined,
          fs: undefined,
          g: undefined,
          gs: undefined,
          a: undefined,
          as: undefined,
          b: undefined,
        },
      },
    };
    this.activeArrow = "leftBoundary";
  }

  init(data) {
    //Need to write a function that parses the array into
    // this.noteObjects.leftBoundary = data.leftBoundary;
    // this.noteObjects.rightBoundary = data.rightBoundary;
    // this.noteObjects.topBoundary = data.topBoundary;
    // this.noteObjects.bottomBoundary = data.bottomBoundary;
    // this.noteObjects.leftPaddle = data.leftPaddle;
    // this.noteObjects.rightPaddle = data.rightPaddle;
  }

  preload() {
    this.load.image("arrow", "./assets/arrow.png");
    this.load.image("paddle", "./assets/paddle.png");
    this.load.html("note-input", "./assets/note-input.html");
  }

  create() {
    //Create Paddles
    const leftPaddle = new Player(this.physics, 30);
    const rightPaddle = new Player(this.physics, 770);

    //Creates and assigns arrows
    this.arrowObjects.leftBoundary.object = new Arrow(30, 350, 180, this);
    this.arrowObjects.rightBoundary.object = new Arrow(770, 50, 0, this);
    this.arrowObjects.topBoundary.object = new Arrow(400, 30, 270, this);
    this.arrowObjects.bottomBoundary.object = new Arrow(400, 370, 90, this);
    this.arrowObjects.leftPaddle.object = new Arrow(80, 200, 180, this);
    this.arrowObjects.rightPaddle.object = new Arrow(720, 200, 0, this);
    this.renderArrows();

    //Creates click events for arrows
    for (const arrow in this.arrowObjects) {
      this.arrowObjects[arrow].object.sprite
        .setInteractive()
        .on("pointerdown", () => {
          this.noteObjects[this.activeArrow] = noteInput.getKeyState();
          this.activeArrow = arrow;
          noteInput.setKeyState(this.noteObjects[arrow]);
          this.renderArrows();
          noteInput.reRender();
        });
    }

    //Creates text input
    const noteInput = new Keyboard(200, 200, this);
    noteInput.setKeyState(this.noteObjects[this.activeArrow]);
    noteInput.reRender();

    //Creates Play text
    const playButton = this.add.text(720, 360, "Play", { fontSize: "30px" });
    playButton.setInteractive().on("pointerdown", () => {
      this.noteObjects[this.activeArrow] = noteInput.getKeyState();
      this.scene.start("game-scene", {
        // leftBoundary: this.parseNotes(this.noteObjects.leftBoundary),
        // rightBoundary: this.parseNotes(this.noteObjects.rightBoundary),
        // topBoundary: this.parseNotes(this.noteObjects.topBoundary),
        // bottomBoundary: this.parseNotes(this.noteObjects.bottomBoundary),
        // leftPaddle: this.parseNotes(this.noteObjects.leftPaddle),
        // rightPaddle: this.parseNotes(this.noteObjects.rightPaddle),
        leftBoundary: this.noteObjects.leftBoundary,
        rightBoundary: this.noteObjects.rightBoundary,
        topBoundary: this.noteObjects.topBoundary,
        bottomBoundary: this.noteObjects.bottomBoundary,
        leftPaddle: this.noteObjects.leftPaddle,
        rightPaddle: this.noteObjects.rightPaddle,
      });
    });
  }

  update() {}

  renderArrows() {
    for (const keys in this.arrowObjects) {
      this.arrowObjects[keys].object.sprite.setTintFill(0xffffff);
      if (keys === this.activeArrow) {
        this.arrowObjects[keys].object.sprite.setTintFill(0xff0000);
      }
    }
  }

  parseNotes(noteObject) {
    const noteArray = [];
    for (const note in noteObject) {
      if (noteObject[note] !== undefined) {
        const currentNote = note.split("");
        let parsedNote = currentNote[0];
        if (currentNote.length > 1) {
          parsedNote += "#";
        }
        parsedNote += noteObject[note];
        noteArray.push(parsedNote);
      }
    }
    return noteArray;
  }
}
