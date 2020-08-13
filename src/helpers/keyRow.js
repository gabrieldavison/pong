import Phaser from "phaser";

class KeyRow {
  constructor(keys, context, variable) {
    this.keys = keys;
    this.context = context;
    this.keyObjects = [];
    this.setupKeys();
  }

  setupKeys() {
    this.keys.forEach((key) => {
      const currentKey = this.context.input.keyboard.addKey(key);
      this.keyObjects.push(currentKey);
    });
    console.log(this.keyObjects);
  }
}

export default KeyRow;
