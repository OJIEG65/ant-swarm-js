/*eslint-disable*/
const ants = [];
const points = [];
const startPointIdx = 0;
const canvasHeight = 900;
const canvasWidth = 1520;
let secondLayer;
function setup() {
  frameRate(160);
  createCanvas(canvasWidth, canvasHeight);
  secondLayer = createGraphics(canvasWidth, canvasHeight);
  secondLayer.clear();

  for (let i = 0; i < 200; i++) {
    const point = new Point();
    point.spawn(i);
    points.push(point);
  }

  for (let i = 0; i < 10; i++) {
    const ant = new Ant();
    ants.push(ant);
    const spawnPos = points[startPointIdx];
    ant.spawn(spawnPos, secondLayer);
  }

}


function draw() {
  background(200);
  image(secondLayer, 0, 0);

  ants.forEach((ant) => {
    // if(mouseIsPressed){
    //   const wind = createVector(6,0);
    //   ant.applyForce(wind);
    // }
    ant.setDirection(points, points[startPointIdx]);
    ant.update()
    ant.show()
  })
  points.forEach((point) => {
    point.show();
  })

}

