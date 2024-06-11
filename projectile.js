/**
*class representing projectile for hero
*@extends IndependentMovingObject
*/
class Projectile extends IndependentMovingObject {
  angle = 0;
  constructor(x, y, width, height, colour, index, angle) {
    super(x - width / 2, y - height/2, width, height, colour, false)
    this.angle = angle;
    this.image.src = "syringe.png";
    this.index = index;
  }
//updates angle
  update() {
    this.x += 4 * Math.cos(this.angle);
    this.y += 4 * Math.sin(this.angle);
  }

  draw() {
    Canvas.context.save();
    Canvas.context.translate(this.x + this.width / 2, this.y + this.height /2); //x, y
    //Rotations
    Canvas.context.rotate(this.angle);
    Canvas.context.translate(-this.x - this.width /2, -this.x - this.height / 2); //x, y
    Canvas.context.restore();
    Canvas.context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}