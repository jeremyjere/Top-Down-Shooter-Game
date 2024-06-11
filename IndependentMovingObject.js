/**
*class that is an abstract for Hero with seperate methods than *MovingObject, since hero is different
*than other objects because it doesn't move
*@abstract
*/
class IndependentMovingObject {
  #originalSpawnX;
  #originalSpawnY;
  constructor(x, y, width, height, colour) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    
    this.#originalSpawnX = (Canvas.width / 2) - this.width / 2;
    this.#originalSpawnY = (Canvas.height / 2) - this.height / 2;
    this.colour = colour;
    this.image = new Image();
  }

  draw() {
    Canvas.context.save();
    Canvas.context.translate(Canvas.width / 2, Canvas.height / 2); //x, y

    //Rotations
    Canvas.context.rotate(this.angle);
    Canvas.context.translate(-Canvas.width / 2, -Canvas.height / 2); //x, y
    
    Canvas.context.drawImage(this.image, this.#originalSpawnX, this.#originalSpawnY, this.width, this.height);
    Canvas.context.restore();
  }
  

  update() {
    throw new Error("No method here")
  }

  get originalSpawnX() {
    return this.#originalSpawnX
  }

  get originalSpawnY() {
    return this.#originalSpawnY
  }
}
