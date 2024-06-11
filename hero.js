/**
*class that takes in inputs of hero's angle/aiming 
*as well as its position. Also draws hero and gives stats
*@extends IndependentMovingObject
*/
class Hero extends IndependentMovingObject {
  angle = 0;
  static hp = 10;
  #originalSpawnX;
  #originalSpawnY;
  acceleration = 5000 / 1000 / 1000;
  static frictionConstant = 3000 / 1000 / 1000;
  constructor(x, y, width, height, colour) {
    super(475, 475, 120, 100, colour)
    this.x = x;
    this.y = y;
    this.velocityX = 0 / Game.fps;
    this.velocityY = 0 / Game.fps;
    this.velocity = 200 / Game.fps;
    this.image.src = "survivor-idle_rifle_0.png";
  }

  //collisions for hero and borders
  update() {
    if (Controller.w === true) {
      this.velocityY += this.acceleration * Game.timeInterval;
      for (let obj of GameMap.objects) {
        if (Physics.hasCollided(this, obj,obj.x,obj.y)) {
          this.x = obj.x + obj.width;
        }
      }
    }
    
    if (Controller.a === true) {
      this.velocityX += this.acceleration * Game.timeInterval;
      for (let obj of GameMap.objects) {
        if (Physics.hasCollided(this, obj,obj.x,obj.y)) {
          this.x = obj.x + obj.width;
        }
      }
    }

    if (Controller.s === true) {
      this.velocityY -= this.acceleration * Game.timeInterval;
      for (let obj of GameMap.objects) {
        if (Physics.hasCollided(this, obj,obj.x,obj.y)) {
          this.y = obj.y - this.height;
        }
      }
    }

    if (Controller.d === true) {
      this.velocityX -= this.acceleration * Game.timeInterval;
      for (let obj of GameMap.objects) {
        if (Physics.hasCollided(this, obj,obj.x,obj.y)) {
          this.x = obj.x - this.width;
        }
      }
    }

    // horizontal friction
    if (this.velocityX > Hero.frictionConstant) {
      this.velocityX -= Hero.frictionConstant;
    }
    else if (this.velocityX > 0) {
      this.velocityX = 0;
    }
    if (this.velocityX < 0 && this.velocityX < Hero.frictionConstant) {
      this.velocityX += Hero.frictionConstant;
    }
    else if (this.velocityX < 0) {
      this.velocityX = 0;
    }

    //vertical friction
    if (this.velocityY > Hero.frictionConstant) {
      this.velocityY -= Hero.frictionConstant;
    }
    else if (this.velocityY > 0) {
      this.velocityY = 0;
    }
    if (this.velocityY < 0 && this.velocityY < Hero.frictionConstant) {
      this.velocityY += Hero.frictionConstant;
    }
    else if (this.velocityY < 0) {
      this.velocityY = 0;
    }

   // velocity adding and border checking
   if(this.velocityY > 0 && Camera.mapY <= 500 - this.width/2 || this.velocityY < 0 && Camera.mapY >= -1000 + this.width/2){
       Camera.mapY += this.velocityY;
    }
    else{
      this.velocityY = 0;
    }

    if(this.velocityX < 0 && Camera.mapX >= -1000 + this.width/2 || this.velocityX > 0 && Camera.mapX <= 500 - this.width/2){
      Camera.mapX += this.velocityX;
    }
    else{
      this.velocityX = 0;
    }


    for (let obj of GameMap.objects) {
      if (!Physics.hasCollided(this, obj)) {
        Camera.mapX += this.velocityX;
        Camera.mapY += this.velocityY;
      }      
    }

    this.getMouseAngle();
    if (Controller.shoot === true) {
      let projectile = new Projectile(this.originalSpawnX + this.width / 2, this.originalSpawnY + this.height / 2, 100, 100, "rgba(0, 0, 0, 0.8)", Game.projectiles.length, this.angle);
      Game.projectiles.push(projectile);
      Controller.shoot = false;
    }
      this.draw();
  }
//calculate angle of cursor
  getMouseAngle() {
    this.angle = Math.atan2(Controller.y - this.y - this.height / 2, Controller.x - this.x - this.width / 2);
  }
}