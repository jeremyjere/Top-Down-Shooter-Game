/**
*class that gives enemies ability to chase player
*@extends MovingObject
*@abstract
*/
class Enemy extends MovingObject {
  angle = 0;
  velocityT = 80 / Game.fps;
  hp = 5;
  selfDamage = 5;
  constructor(x, y, width, height) {
    super(0, 0, width, height, "rgba(0,0,0,1)");
  }

  update(hero) { // uses angle method to stay on course for the hero
    const angle = Physics.angle(this, hero);
    this.velocityX = this.velocityT * Math.cos(angle);
    this.velocityY = this.velocityT * Math.sin(angle);

    this.x += this.velocityX;
    for (let i = 0; i < Game.obstacles.length; i++) { // check for any collisions  
      if (Physics.hasCollided(Game.obstacles[i], this)) {
        this.x -= this.velocityT * Math.cos(this.angle);
        this.velocityY = Math.sign(this.velocityY) * this.velocityT;
      }
    }

    this.y -= this.velocityY;
    for (let i = 0; i < Game.obstacles.length; i++) { // collision checker
      if (Physics.hasCollided(Game.obstacles[i], this)) {
        this.y += this.velocityY;

        // undo old x velocity, apply new x velocity (which is now equal to max velocity) 
        this.x -= this.velocityX;
        this.velocityX = Math.sign(this.velocityX) * this.velocityT;
        this.x += this.velocityX;
      }
    }

    // enemy collide with player = take damage, remove enemy, add new enemy in its place
    if (Physics.hasCollided(hero,this,this.x+Camera.mapX,this.y+Camera.mapY)) {
    Hero.hp-=this.damage;
    this.hp -= this.selfDamage;
    if (Hero.hp < 0) {
      Hero.hp = 0;
    }
  }
  }
}