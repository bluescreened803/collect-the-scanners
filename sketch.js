//Reference: Simple Collision Detection by mleisz (https://editor.p5js.org/mleisz/sketches/zNFvlBgbJ)
let collectables = [];
let dangers = [];
let score = 0;
let lives = 10;
let selector = 5;
let playerSizeW = 217.7;
let playerSizeH = 139.2;
let gameStart = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  scanner = loadImage("scanner.png");
  idcard = loadImage("idcard.png");
  brick = loadImage("brick_wall.jpg");
  noCursor();
  for (let i=0; i < 15; i+=1) {
    if (selector > 5) {
      let collectable = new Collectable(scanner);
      collectables.push(collectable);
    }
    else {
      let danger = new Danger(brick);
      dangers.push(danger);
    }
    selector = random(1,10);
  }
}

function draw() {
  background(187, 222, 251);
  if (lives > 0 && gameStart == true) {
    rectMode(CENTER);
    fill(255);
    imageMode(CENTER);
    idcard.resize(playerSizeW,playerSizeH);
    image(idcard, mouseX,mouseY);
    //square(mouseX, mouseY, playerSize);
    for (let collectable of collectables) {
      collectable.show();
      collectable.move();
      if (checkCollision(collectable)) {
        score = score + 1;
        collectable.hide();
      }
    }
    for (let danger of dangers) {
      danger.show();
      danger.move();
      if (checkCollision(danger)) {
        lives = lives - 1;
        danger.hide();
      }
    }
    fill(0);
    textSize(50);
    textAlign(LEFT);
    text("Score: "+score, 50, height-50);
    text("Lives: "+lives, 300, height-50);
  } 
  else if (gameStart == false) {
    cursor(ARROW);
    textAlign(CENTER);
    textSize(50);
    text("Click the screen to start!", width/2, height/2);
  }  
  else {
    cursor(ARROW);
    textAlign(CENTER);
    text("Game Over! Reload the page to try again. \n Your final score was: "+score, width/2, height/2);
  }
}

class Collectable {
  constructor(image) {
    this.x = random(0,width);
    this.y = -10;
    this.sizeW = 74.35;
    this.sizeH = 94.7;
    this.speed = random(2,10);
    this.displayObj = true;
    this.image = image;
  }
  
  move() {
    if (this.y > windowHeight) {
      this.x = random(0,width);
      this.displayObj = true;
      this.y = -10;
    }
    else {
      this.y = this.y + this.speed;
    }
  }

  show() {
    if (this.displayObj == true) {
      fill(255);
      this.image.resize(this.sizeW,this.sizeH)
      image(this.image, this.x,this.y);
      //square(this.x,this.y,this.size);
    }
    else {
      // do nothing
    }
  }
  
  hide() {
    this.displayObj = false;
    this.y = windowHeight+100;
  }
}

class Danger {
  constructor(image) {
    this.x = random(0,width);
    this.y = -10;
    this.sizeW = 48;
    this.sizeH = 48;
    this.speed = random(2,10);
    this.displayObj = true;
    this.image = image
  }
  
  move() {
    if (this.y > windowHeight) {
      this.x = random(0,width);
      this.displayObj = true;
      this.y = -10;
    }
    else {
      this.y = this.y + this.speed;
    }
  }

  show() {
    if (this.displayObj == true) {
      fill(255,0,0);
      this.image.resize(this.sizeW,this.sizeH);
      image(this.image, this.x,this.y);
      //square(this.x,this.y,this.size);
    }
    else {
      // do nothing
    }
  }
  
  hide() {
    this.displayObj = false;
    this.y = windowHeight+100;
  }
}

function checkCollision(objectB) {
  if (mouseX - playerSizeW/2 < objectB.x + objectB.sizeW/2 && //check left boundary
      mouseX + playerSizeW/2 > objectB.x - objectB.sizeW/2 && //check right boundary
      mouseY - playerSizeH/2 < objectB.y + objectB.sizeH/2 && //check top boundary
      mouseY + playerSizeH/2 > objectB.y - objectB.sizeH/2) { //check bottom boundary
    return true;
  } else {
    return false;
  }
}

/* function keyPressed() {
  if (key === 'A' || key === 'a') {
    console.log("HAPPEDNED");
    gameStart = true;
  }
} */

function mousePressed() {
  gameStart = true;
}

function touchStarted() {
  gameStart = true;
}