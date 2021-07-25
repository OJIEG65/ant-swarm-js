/*eslint-disable*/

class Point {
  constructor() {
    this.pos;
    this.r = 20;
    this.isVisited = false;
    this.name;
  }

  // setVisited(){
  //   this.isVisited = true;
  // }

  spawn (index){
    const x = random(width - this.r);
    const y = random(height - this.r);
    this.pos = createVector(x, y);
    this.name = index;
    stroke(255);
    strokeWeight(2);
    fill(255,100);
    rect(this.pos.x, this.pos.y, this.r, this.r, 5);
  }

  show (){
    stroke(255);
    strokeWeight(2);
    fill(this.isVisited ? 255: 50,100);
    rect(this.pos.x, this.pos.y, this.r, this.r, 5);
    fill(0);
    text(this.name, this.pos.x, this.pos.y);
  }
}
