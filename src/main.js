import Phaser from "phaser";

import HelloWorldScene from "./scenes/HelloWorldScene";
import GameScene from "./scenes/GameScene";

const config = {
  type: Phaser.AUTO,
  audio: {
    noAudio: true,
  },
  width: 800,
  height: 400,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },

  scene: [GameScene, HelloWorldScene],
};

export default new Phaser.Game(config);
