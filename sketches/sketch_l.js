let font;
let etc1 = [];
let vehicles = [];
let txtSize = 500;

function preload() {
  font = new loadFont("sfpro.otf");
}

function setup() {
  let cnv = createCanvas(windowWidth - 100, windowHeight - 100);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);

  let i = x / 2;
  let j = y / 2;

  etc1 = font.textToPoints("adapt", i, j + windowHeight / 1.8, txtSize);

  for (i = 0; i < etc1.length; i++) {
    let pt = etc1[i];
    let r = new Vehicle(pt.x, pt.y);
    vehicles.push(r);
    /*push();
    translate(x, y);
    ellipse(pt.x, pt.y, 10, 10);
    pop();*/
  }
}

function draw() {
  background(255);
  cursor(CROSS, mouseX, mouseY);
  //fill(255, 0, 0);
  //ellipse(mouseX, mouseY, 20, 20);
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    v.behaviours();
    v.back();
    v.update();
    v.show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth - 100, windowHeight - 100);
}
