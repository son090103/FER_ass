import Shape from "./Shape";

class Triangle extends Shape {
  constructor(color, base, height) {
    super(color);
    this.base = base;
    this.height = height;
  }

  getArea() {
    return (this.base * this.height) / 2; // Calculate rectangle area
  }

  toString() {
    console.log(
      `Rectangle Color: ${this.color}, Length: ${this.base}, Width: ${
        this.base
      }, Area: ${this.getArea()}`
    );
  }
}
export default Triangle;
