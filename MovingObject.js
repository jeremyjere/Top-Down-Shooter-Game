/**
*class that is abstract for the background, Enemy, PowerUp
*@abstract
*/
class MovingObject {
  constructor(x, y, width, height, colour) { 
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colour = colour;
    this.image = new Image();
    this.#incrementProjectileCount();
  }

  #incrementProjectileCount() {
    Game.projectileCount++
  }

  draw() { 
    Canvas.context.save();  
    Canvas.context.translate(this.x + this.width / 2, this.y + this.height / 2); //x, y

    //Rotations
    Canvas.context.rotate(this.angle * Math.PI/180);
    Canvas.context.translate(-this.x - this.width / 2, -this.y - this.height / 2); //x, y


    //Camera.map offsets the change in movement when hero "moves"
    Canvas.context.drawImage(this.image,this.x - this.width/2 + Camera.mapX, this.y - this.height/2 + Camera.mapY, 120, 100);

    
    Canvas.context.restore();
  }
  update() {
    throw new Error("No method here yet");
  }

    static angle(obj1, obj2) { // get angle from obj 1 to obj 2
    let y = obj1.y+Camera.mapY + obj1.height/2 - (obj2.y + obj2.height/2); // because y is inverted
    let x = obj2.x-Camera.mapX + obj2.width/2 - (obj1.x + obj1.width/2);
    return Math.atan2(y, x);
    }
}
