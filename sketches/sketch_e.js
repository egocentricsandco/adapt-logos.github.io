let font;
let etc = [];
let vehicles = [];
let word = "adapt";

function preload() {
  font = new loadFont("sfpro.otf");
}

function setup() {
  let cnv = createCanvas(windowWidth - 100, windowHeight - 100);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);

  let txtSize = 500;
  let i = x / 2;
  let j = y / 2;
  etc = font.textToPoints(word, i, j + windowHeight / 1.8, txtSize);

  for (i = 0; i < etc.length; i++) {
    let pt = etc[i];
    let r = new Vehicle(pt.x, pt.y);
    vehicles.push(r);
  }
}

function draw() {
  background(255);
  cursor(CROSS, mouseX, mouseY);
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
