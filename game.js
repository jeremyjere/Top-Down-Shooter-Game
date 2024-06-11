/**
*class representing a drawer/creator for map, enemies, projectiles,
*start and end screen
*/
class Game {
  static fps = 120; //Game fps
  static timeInterval = 1000 / Game.fps; //How much time will elapse until the next frame is drawn.
  static obstacles = [];
  enemies = [];
  specials = [];
  uiFps = document.getElementById('fps');
  static projectiles = [];
  static projectileCount = 0;
  static piercing = false;
  static startScreen = true;
  static counter = 0;
  static healthColour="rgb(0,255,0)";
  constructor() {
    this.hero = new Hero((Canvas.width / 2) - 25, (Canvas.height / 2) - 25, 50, 50, "rgba(22, 22, 222, 0.71)");
    this.controller = new Controller();
    this.makeEnemies(2);
    this.menu = "Background.png";
    //Refreshing the game
    this.gameInterval = setInterval(() => {
      if (Game.startScreen === false) {
        this.draw();
        Game.now = performance.now();
        this.uiFps.innerText = `FPS: ${1000 / (Game.now - Game.then)}`
        Game.then = Game.now;
        Canvas.context.font = "20px Comic Sans MS";
        Canvas.context.fillStyle = "red";
        Canvas.context.fillText(this.uiFps.innerText, 20, 45);
      } else {
        this.startGame();
      }
    }, Game.timeInterval)
  }

  drawMap(img, sizeX, sizeY) {
    const mapImg = document.getElementById(img);
    Canvas.context.drawImage(mapImg, Camera.mapX, Camera.mapY, sizeX, sizeY);
  }

  draw() {
    this.clear(); //Clearing the previous screen
    this.drawMap("map", 1500, 1500);
    this.hero.update(this); // update player, also draws it
    // draw all obstacles
    for (let i = 0; i < Game.obstacles.length; i++) {
      Game.obstacles[i].draw();
    }

    //drawer for the projectile
    for (let i = 0; i < Game.projectiles.length; i++) {
      if (Game.projectiles.length != 0) {
        if (Game.projectiles[i]) {
          if (Physics.hasHitBorder(Game.projectiles[i])) {
            Game.projectiles.splice(i, 1);
          } else {
            Game.projectiles[i].update(this.hero);
            Game.projectiles[i].draw();
          }
        }
      }
    }

    // draw all enemies
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update(this.hero);

      for (let j = 0; j < Game.projectiles.length; j++) {
        if (Physics.hasCollided(Game.projectiles[j],this.enemies[i], this.enemies[i].x+Camera.mapX, this.enemies[i].y+Camera.mapY)) {
          this.enemies[i].hp -= 10;
          if (!Game.piercing) {
            Game.projectiles.splice(j, 1);
          }
        }
      }
      if (this.enemies[i].hp <= 0) {
        Game.counter++;
        this.enemies.splice(i, 1);
        this.makeEnemies(2);
      }
      if (this.enemies.length === 0) {
        break; // to avoid error after splicing
      }

      if(this.enemies[i]) {
        this.enemies[i].draw();
      }
    }
    
    // draw all power ups, if collide with player, run power up code, remove that power up, add new power up
    if (this.specials.length < 1) {
      this.makePowerUps(1)
    }


      if (Physics.hasCollided(this.hero,this.specials[0], this.specials[0].x+Camera.mapX,this.specials[0].y+Camera.mapY)) {
        this.specials[0].powerUpAction();
        this.specials.splice(0, 1);
      }
    if (this.specials[0]){
      this.specials[0].draw();
    }
    
    this.drawHealth();
    if (Hero.hp <= 0) {
      this.endGame();
    }
  }

  makePowerUps(n){
    let type = 0;
    for (let i = 0; i < n; i++) {
      type = Math.floor(Math.random() * 100)
      if (type > 0 && type < 85) {
        this.specials.push(new HealthPowerUp());
      }
      else if (type > 85 && type < 95) {
        this.specials.push(new SuperShieldPowerUp());
      }
      else if (type > 95 && type < 100) {
        this.specials.push(new PiercingPowerUp());
      }
    }
  }
  
  clear() {
    Canvas.context.clearRect(0, 0, Canvas.width, Canvas.height);
  }

  makeEnemies(n) {
    let type = 0;
    for (let i = 0; i < n; i++) {
      type = Math.floor(Math.random() * 100)
      if (type > 0 && type < 50) {
        this.enemies.push(new BasicBot());
      }
      else if (type > 50 && type < 70) {
        this.enemies.push(new SpeedyBot());
      }
      else if (type > 70 && type < 90) {
        this.enemies.push(new ChunkyBot());
      }
      else if (type > 90) {
        this.enemies.push(new Leach());
      }
    }
  }


  drawHealth() {
    Canvas.context.fillStyle = "rgb(20,20,20)";
    Canvas.context.fillRect(Canvas.width/2 - 37, (Canvas.height/2 + this.hero.height/2), 100, 15);

    Canvas.context.fillStyle = Game.healthColour;
    Canvas.context.fillRect(Canvas.width/2 - 37, (Canvas.height/2 + this.hero.height/2), Hero.hp * 10, 15);
    Hero.hp;
  }

  endGame() {
    Camera.mapX = 0;
    Camera.mapY = 0;
    clearInterval(this.gameInterval);
    this.drawMap("endMenu", 1000, 1000);
    Canvas.context.font = "40px Comic Sans MS";
    Canvas.context.fillStyle = "black";
    Canvas.context.textAlign = "center";
    Canvas.context.fillText(`You've cured ${Game.counter} Vampire(s)!`, Canvas.width/2, Canvas.height/2 + 140);
  }

  startGame() {
    if (Game.startScreen === true) {
      this.drawMap("menu", 1000, 1000);
    }
  }
}
