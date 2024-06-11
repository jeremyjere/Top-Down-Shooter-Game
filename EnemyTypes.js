/**
*class representing basic enemy
*@extends Enemy
*/
class BasicBot extends Enemy{

constructor(x, y, width, height) 
  { 
    super(x,y,50,50);
    this.x = Math.random() * (Canvas.width - 20);
    this.y = Math.random() * (Canvas.height - 20);
    this.velocityT = 50/Game.fps
    this.hp= 15;  
    this.damage=2
    this.selfDamage=this.hp;
    this.image.src = "skeleton-attack_0.png";
  }  
}
/**
*class representing faster enemy
*@extends Enemy
*/
class SpeedyBot extends Enemy{

constructor(x, y) 
  {
    super(x,y,50,50);
    this.x = Math.random() * (Canvas.width - 20);
    this.y = Math.random() * (Canvas.height - 20);
    this.velocityT = 75/Game.fps
    this.hp= 5; 
    this.damage = 1
    this.selfDamage=this.hp;
    this.image.src = "Giant_Bat.png";
  }  
}
/**
*class representing tankier enemy
*@extends Enemy
*/
class ChunkyBot extends Enemy{

constructor(x, y) 
  {
    super(x,y,50,50);
    this.x = Math.random() * (Canvas.width - 20);
    this.y = Math.random() * (Canvas.height - 20);
    this.velocityT = 25/Game.fps
    this.hp= 30;  
    this.damage = 3
    this.selfDamage=this.hp;
    this.image.src = "smashmallow_top-down.png";
  }  
}

class Leach extends Enemy{

constructor(x,y) 
  {
    super(x,y,50,100,"rgba(0,0,0,1)");
    this.x = Math.random() * (Canvas.width - 20);
    this.y = Math.random() * (Canvas.height - 20);
    this.velocityT = 150/Game.fps
    this.damage=0;
    this.hp= 500;
    this.selfDamage=0;
    this.image.src = "EYEBALL.png";
  }  
}
