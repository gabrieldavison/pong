class Keyboard {
  constructor(x, y, context) {
    this.keyState = {
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
    };
    this.octaveState = 3;
    this.octaveObjects = {
      2: { object: undefined, color: "0xff0000" },
      3: { object: undefined, color: "0x00ff00" },
      4: { object: undefined, color: "0x0099ff" },
      5: { object: undefined, color: "0xffff00" },
    };
    this.keyObjects = {
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
    };
    this.context = context;
    this.x = x;
    this.y = y;
    this.createKeys();
    this.createOctaves();
    this.reRender();
  }

  createKeys() {
    //draws white keys
    const whiteKeys = ["c", "d", "e", "f", "g", "a", "b"];
    for (let i = 0; i < 7; i++) {
      const key = this.context.add.rectangle(this.x + i * 50, this.y, 30, 30);
      key.setStrokeStyle(2, 0xffffff);
      this.keyObjects[whiteKeys[i]] = key;
    }
    //Draws black keys
    const blackKeys = ["cs", "ds", "fs", "gs", "as"];
    for (let i = 0; i < 5; i++) {
      let key;
      if (i > 1) {
        key = this.context.add.rectangle(
          this.x + 75 + i * 50,
          this.y - 50,
          30,
          30
        );
      } else {
        key = this.context.add.rectangle(
          this.x + 30 + i * 50,
          this.y - 50,
          30,
          30
        );
      }
      key.setStrokeStyle(2, 0xffffff);
      this.keyObjects[blackKeys[i]] = key;
    }

    for (const key in this.keyObjects) {
      this.keyObjects[key].setInteractive().on("pointerdown", () => {
        if (this.keyState[key] === undefined) {
          this.keyState[key] = this.octaveState;
        } else {
          this.keyState[key] = undefined;
        }
        this.renderKeys();
      });
    }
  }
  createOctaves() {
    const two = this.context.add.rectangle(this.x, this.y + 75, 30, 30);
    two.setStrokeStyle(2, 0xffffff);
    two.setInteractive().on("pointerdown", () => {
      this.octaveState = 2;
      this.renderOctaves();
    });
    this.octaveObjects[2].object = two;
    // this.octaveObjects[2].color = "0xff0000";

    const three = this.context.add.rectangle(this.x + 50, this.y + 75, 30, 30);
    three.setStrokeStyle(2, 0xffffff);
    three.setInteractive().on("pointerdown", () => {
      this.octaveState = 3;
      this.renderOctaves();
    });
    this.octaveObjects[3].object = three;
    // this.octaveObjects[3].color = "0x00ff00";

    const four = this.context.add.rectangle(this.x + 100, this.y + 75, 30, 30);
    four.setStrokeStyle(2, 0xffffff);
    four.setInteractive().on("pointerdown", () => {
      this.octaveState = 4;
      this.renderOctaves();
    });
    this.octaveObjects[4].object = four;
    // this.octaveObjects[4].color = "0x0099ff";

    const five = this.context.add.rectangle(this.x + 150, this.y + 75, 30, 30);
    five.setStrokeStyle(2, 0xffffff);
    five.setInteractive().on("pointerdown", () => {
      this.octaveState = 5;
      this.renderOctaves();
    });
    this.octaveObjects[5].object = five;
    // this.octaveObjects[5].color = "0xffff00";
  }

  renderOctaves() {
    for (const key in this.octaveObjects) {
      this.octaveObjects[key].object.setFillStyle();
      if (key === String(this.octaveState)) {
        this.octaveObjects[key].object.setFillStyle(
          this.octaveObjects[key].color
        );
      }
    }
  }

  renderKeys() {
    for (const key in this.keyObjects) {
      this.keyObjects[key].setFillStyle();
      if (this.keyState[key] === undefined) {
        this.keyObjects[key].setFillStyle();
      } else {
        this.keyObjects[key].setFillStyle(
          this.octaveObjects[this.keyState[key]].color
        );
      }
    }
  }

  reRender() {
    this.renderOctaves();
    this.renderKeys();
  }

  setKeyState(state) {
    this.keyState = state;
  }
  getKeyState() {
    return this.keyState;
  }
}

export default Keyboard;
