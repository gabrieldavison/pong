class Arrow {
  constructor(x, y, rotation, context) {
    this.sprite = context.physics.add.sprite(x, y, "arrow");
    this.sprite.setTintFill(0xffffff);
    this.sprite.angle = rotation;
    this.sprite.setImmovable(true);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.body.setAllowGravity(false);
  }
}

export default Arrow;
