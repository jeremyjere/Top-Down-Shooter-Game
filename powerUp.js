/**
*class representing power ups for hero
*@extends MovingObject
*@abstract
*/
class PowerUp extends MovingObject {
  powerUpDuration = 10000;
  constructor(colour) {
    super(((Math.random() * (Canvas.width - 100)) + 50),((Math.random() * (Canvas.height - 100)) + 50), 20, 20, colour);
    this.checkPosition();
  }
  // make sure power up cannot spawn inside obstacles
  checkPosition() {
    for (let i = 0; i < Game.obstacles.length; i++) {
      while (Physics.hasCollided(Game.obstacles[i],this, this.x,this.y)) {
        this.x = Math.random() * (Canvas.width - 20);
        this.y = Math.random() * (Canvas.height - 20);
      }
    }
  }

  powerUpAction() {
    throw new Error("This is the abstract. You fool.")
  }
}