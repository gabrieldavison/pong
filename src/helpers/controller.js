class Controller {
  constructor(x, y, context) {
    this.x = x;
    this.y = y;
    this.context = context;
    this.shape = this.createShape();
  }

  createShape() {
    const shape = this.context.add.circle(this.x, this.y, 20, 0x9ee378);

    return shape;
  }
}
export default Controller;
