/**
*class representing detector/collision maker between hero 
*and map border
*/
class Physics {
  constructor() {
  }
  static hasHitBorder(obj) {
    //Hit left borders
    if (obj.x <= 0) {
      obj.x = 0;
      return true;
    }

    //Hit right border
    if (obj.x + obj.width >= Canvas.width) {
      obj.x = Canvas.width - obj.width;
      return true;
    }

    //Hit top border
    if (obj.y <= 0) {
      obj.y = 0;
      return true;
    }

    //Hit bottom border
    if (Camera.mapY >= -1000 + this.width/2) {
      obj.y = Canvas.height - obj.height;
      return true;
    }
    return false;
  }

  static hasCollided(obj1,obj2, obj2X,obj2Y) {
    if (
      (obj1.x + obj1.width) > obj2X && // from right
      obj1.x < obj2X + obj2.width && // from left
      (obj1.y + obj1.height) > obj2Y && // from bottom
      obj1.y < obj2Y + obj2.height // from above
    ) {
      return true;
    }

    return false;
  }
  
  static angle(obj1, obj2) { // get angle from obj 1 to obj 2

    let y = obj1.y + Camera.mapY + obj1.height / 2 - (obj2.y + obj2.height / 2); // because y is inverted
    let x = obj2.x - Camera.mapX + obj2.width / 2 - (obj1.x + obj1.width / 2);
    return Math.atan2(y, x);
  }
}