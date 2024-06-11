/**
*class representing a controller handler
*/
class Controller {
  //Keeps track of which key is pressed down
  static w = false;
  static a = false;
  static s = false;
  static d = false;
  static shoot = false;

  constructor() {
    //Create events on instantiation for pressing down keys on the keyboard
    document.addEventListener("keydown", (e) => {
      this.keyDownHandler(e);
    })
    document.addEventListener("keyup", (e) => {
      this.keyUpHandler(e);

    })
    document.addEventListener("mousemove", (e) => {
      this.angleHandler(e);
    })
    document.addEventListener("click", (e) => {
      this.shootHandler(e);
    })
  }

  shootHandler(e) {
    Controller.shoot = true;
  }
  //gets movement based on mouse movement
  angleHandler(e) {
    const x = e.clientX;
    const y = e.clientY;
    Controller.x = x;
    Controller.y = y;
  }

  keyDownHandler(e) {
    if (e.key === "w") {
      Controller.w = true;
    }
    if (e.key === "a") {
      Controller.a = true;
    }
    if (e.key === "s") {
      Controller.s = true;
    }
    if (e.key === "d") {
      Controller.d = true;
    }
    if (e.key === "Enter") {
      Game.startScreen = false;
    }
  }
  
  keyUpHandler(e) {
    if (e.key === "w") {
      Controller.w = false;
    }
    if (e.key === "a") {
      Controller.a = false;
    }
    if (e.key === "s") {
      Controller.s = false;
    }
    if (e.key === "d") {
      Controller.d = false;
    }
  }
}
