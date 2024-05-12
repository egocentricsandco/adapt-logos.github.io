function Vehicle(x, y) {
    this.pos = createVector(x, y);
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 8;
    this.maxspeed = 10;
    this.maxforce = 1;
  }
  
  Vehicle.prototype.applyForce = function (f) {
    this.acc.add(f);
  };
  
  Vehicle.prototype.back = function () {
    let arrive = this.arrive(this.target);
    let mouse = createVector(random(width), random(height));
    let flee = this.flee(mouse);
  
    arrive.mult(1);
    flee.mult(6);
  
    this.applyForce(flee);
    this.applyForce(arrive);
  };
  
  Vehicle.prototype.behaviours = function () {
    let arrive = this.arrive(this.target);
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse);
  
    arrive.mult(1);
    flee.mult(5);
  
    this.applyForce(flee);
    this.applyForce(arrive);
  };
  
  Vehicle.prototype.update = function () {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.pos.y = this.target.y;
  };
  
  Vehicle.prototype.show = function () {
    let c = color(13, 11, 11);
    fill(c);
    noStroke();
    rect(this.pos.x, this.pos.y, 3, 37);
  };
  
  Vehicle.prototype.arrive = function (target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    let speed = this.maxspeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  };
  
  Vehicle.prototype.flee = function (target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    if (d < 100) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  };