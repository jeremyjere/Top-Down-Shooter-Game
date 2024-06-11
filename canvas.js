/**
*class that creates a canvas for the game 
*/
class Canvas {
  static canvas = document.getElementById("gameScreen");
  // Canvas context is what type of canvas you want to use
  static context = Canvas.canvas.getContext('2d');
  static width = 1000;
  static height = 1000;
  constructor() {
    Canvas.canvas.width = Canvas.width;
    Canvas.canvas.height = Canvas.height;
    this.game = new Game();
  }
}
new Canvas();

