/**
*class representing health regen power up
*@extends PowerUp
*/
class HealthPowerUp extends PowerUp {
  constructor() {
    super("rgba(236, 0, 0, 0.84)")
    this.image.src = "MedKit.png"

  }

  powerUpAction() {
    if (Hero.hp < 10) {
      Hero.hp++;
    }
  }
}
/**
*class representing sheild power up. Upon activation the sheild powerup will make one virtually invincible for 10 seconds
*@extends PowerUp
*/
class SuperShieldPowerUp extends PowerUp {
  constructor() {
    super("rgba(0, 255, 0, 0.8)")
    this.image.src = "Shield.png"

  }

  powerUpAction() {
    Hero.hp=20;
    Game.healthColour= "rgba(0, 0, 255, 0.8)";
    setTimeout(function(){Hero.hp = 10;Game.healthColour= "rgb(0,255,0)"}, this.powerUpDuration);
  }
}
/**
*class representing piercing/damage power up. Upon Activation, this rare powerup will allow your shots to pierce multiple enemies and damage them more on impact. 
*@extends PowerUpa
*/
class PiercingPowerUp extends PowerUp {
  constructor() {
    super("rgba(0, 0, 255, 0.84)")
    this.image.src = "ShieldBroken.png";
  }

  powerUpAction() {
    Game.piercing = true;
    setTimeout(() => Game.piercing = false, this.powerUpDuration);
  }
}