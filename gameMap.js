/**
*class representing keeper of objects in map
*/
class GameMap {
  static objects = []; //Keeps all the objects in the game that is not the main character
  constructor() {

  }

  //Draws all our objects
  static draw() {
    for (let object of GameMap.objects) {
      object.draw();
    }
  }
}