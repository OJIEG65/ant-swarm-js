/*eslint-disable*/

class Ant {
  constructor() {
    this.speed = 10;
    // this.curiosity = 0;
    // this.food = false;
    // this.feromon = 1;
    this.pos;
    this.targetPoint;
    this.vel = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.visitedPoints = new Set();
    this.neighboursRange = 50;
    this.secondLayer;
  }

  findNeighbours(points) {
    const neighbours = [];
    const addNeighbours = (range) => {
      // const col = {};
      // this.secondLayer.stroke(0,0,0,10)
      // col.r = 250; //100-255
      // col.g = 0;
      // col.b = 0; // 0-100
      // this.secondLayer.fill(col.r, col.g, col.b,5);
      // this.secondLayer.circle(this.pos.x, this.pos.y, range*2);


      points.forEach((p) => {
        const distanceToNeighbour = dist(p.pos.x, p.pos.y, this.pos.x, this.pos.y);
        if(!this.visitedPoints.has(p.name)
          && distanceToNeighbour > 10
          && distanceToNeighbour < range) {
          neighbours.push(p);
        }
      })
      if (!neighbours.length) addNeighbours(range + 50);
      return neighbours;
    }
    return addNeighbours(this.neighboursRange);;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  spawn(spawnPos, secondLayer, ll){
    this.pos = createVector(spawnPos.pos.x,  spawnPos.pos.y);
    this.secondLayer = secondLayer;
    stroke(200);
    circle(this.pos.x, this.pos.y, 10);
  }

  setNextPoint(points) {
    const neighbours = this.findNeighbours(points);
    const nextIdx = random(neighbours.length)|0;
    this.targetPoint = neighbours[nextIdx];
  }

  setDirection(points, startPoint) {
    if (!this.targetPoint) {
      this.visitedPoints.add(startPoint.name);
      this.setNextPoint(points);
    }

    const targetPointPos = this.targetPoint.pos;
    const targetPoint = this.targetPoint;

    if(dist(targetPointPos.x, targetPointPos.y, this.pos.x, this.pos.y) < 10) {
      if (this.visitedPoints.size === points.length-1) return;
      this.visitedPoints.add(targetPoint.name);
      this.setNextPoint(points);
    }

    const newVector = p5.Vector.sub(targetPointPos, this.pos);
    newVector.setMag(this.speed);
    this.applyForce(newVector);
  }

  update() {
    this.vel.add(this.acceleration);
    this.pos.add(this.vel);
    this.acceleration.set(0,0);
    this.vel.set(0,0);
  }

  show(){
    fill('black');
    circle(this.pos.x, this.pos.y, 10);
    this.secondLayer.fill(color(255, 0, 0));
    this.secondLayer.circle(this.pos.x, this.pos.y, 1);
  }
}
