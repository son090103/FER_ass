import Shape from "./Shape";
class Reactange extends Shape {
  constructor(color, length, width) {
    super(color);
    this.length = length;
    this.width = width;
  }

  getArea() {
    return this.length * this.width; // Calculate rectangle area
  }

  toString() {
    console.log(
      `Rectangle Color: ${this.color}, Length: ${this.length}, Width: ${
        this.width
      }, Area: ${this.getArea()}`
    );
  }
}
export default Reactange;
