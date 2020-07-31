class Player {
  constructor(physics, x) {
    this.sprite = physics.add.sprite(x, 200, "paddle").setScale(0.3);
    this.sprite.setImmovable(true);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.body.setAllowGravity(false);
  }
  checkInput() {
    console.log("Unassigned checkInput error");
  }
}

export default Player;
