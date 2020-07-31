class Player {
  constructor(physics) {
    this.sprite = physics.add.sprite(x, 200, "paddle").setScale(0.3);
    this.sprite.setImmovable(true);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.body.setAllowGravity(false);
  }
  checkInput() {
    console.log("Unassigned checkInput error");
  }
}

class HumanPlayer extends Player {
  constructor(physics) {
    super(physics);
  }
  checkInput(playerInput) {
    if (playerInput.up.isDown) {
      this.sprite.setVelocityY(-200);
    } else if (playerInput.down.isDown) {
      this.sprite.setVelocityY(200);
    } else if (playerInput.down.isUp && playerInput.up.isUp) {
      this.sprite.setVelocityY(0);
    }
  }
}

export { HumanPlayer };
