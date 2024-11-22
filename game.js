let x = 150;
let y = 100;
let vx = -4;
let vy = -4;
let gravity = 0.2;
let thrust = -3;
let state = "start";
let landingSpotY = 365;
let landingSpotWidth = 90;
let isLanding = true;

function setup() {
  createCanvas(800, 600);
  frameRate(30);
  width = 800;
  height = 600;
}

function draw() {
  clear();
  background(200, 230, 255);

  switch (state) {
    case "start":
      startScreen();
      break;
    case "instructions":
      instructionScreen();
      break;
    case "game":
      gameScreen();
      break;
    case "result":
      resultScreen();
      break;
    case "fail":
      secondResultScreen();
      break;
  }
}

//Start screen
function startScreen() {
  push();
  let rectX = 200;
  let rectY = 150;
  let rectWidth = 400;
  let rectHeight = 120;

  //start button
  push();
  fill(20, 100, 155);
  noStroke();
  rect(rectX, rectY, rectWidth, rectHeight);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("START", rectX + rectWidth / 2, rectY + rectHeight / 2);
  pop();

  //Instructions button
  push();
  fill(20, 100, 155);
  noStroke();
  rect(rectX, rectY + 150, rectWidth, rectHeight);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("CONTROLS", rectX + rectWidth / 2, rectY + 150 + rectHeight / 2);
  pop();
  pop();
}

//Instruction screen
function instructionScreen() {
  background(200, 230, 255);
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(0);

  textSize(46);
  text("CONTROLS", 410, 180);
  textSize(24);
  text(
    "Use the space bar to control the speed of the balloon\n" +
    "Use the left and right arrow keys to control the direction of the balloon\n" +
    "Click anywhere to get back to start!",
    400, 450
  );

  push();
  fill(255, 255, 255);
  strokeWeight(6);
  rect(250, 300, 300, 70, 10);
  rect(300, 220, 100, 70, 10);
  rect(410, 220, 100, 70, 10);
  pop();
}

//Game scrren
function gameScreen() {
  if (!isLanding) {
    vy += gravity;
  }

  x += vx;
  y += vy;

  x = constrain(x, 0, 800);
  y = constrain(y, 0, 600);

  if (
    y >= 300 && y <= 340 &&
    vy >= -1 && vy <= 1 &&
    x >= (width - 700 / 2 - landingSpotWidth / 2) && x <= (width / 2 + landingSpotWidth / 2)
  ) {
    isLanding = true;
    state = "result";
  } else if (y >= 600) {
    state = "fail";
  }

  push();
  landingSpotStand();
  pop();

  fill(200, 100, 100);
  rect(width - 700 / 2 - landingSpotWidth / 2, landingSpotY, landingSpotWidth, 20);

  push();
  cloud();
  pop();

  push();
  translate(360, 150);
  scale(0.5);
  cloud();
  pop();

  push();
  translate(550, 50);
  scale(0.7);
  cloud();
  pop();

  push();
  translate(260, 240);
  scale(0.3);
  cloud();
  pop();

  push();
  ground();
  pop();

  push();
  translate(x, y);
  scale(0.5);
  balloon();
  pop();

}

//Result Screen (Win)
function resultScreen() {
  background(0, 255, 0);
  textAlign(CENTER, CENTER);
  textSize(36);
  fill(255);
  text("You Landed!", width / 2, height / 2 - 50);
  textSize(24);
  text("Click to Restart", width / 2, height / 2 + 50);
}

//second result screen (Fail)
function secondResultScreen() {
  background(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(36);
  fill(255);
  text("You Failed!", width / 2, height / 2 - 50);
  textSize(24);
  text("Click to Restart", width / 2, height / 2 + 50);
}

//Balloon character function
function balloon() {
  //balloon
  fill(265, 30, 90);
  strokeWeight(6);
  ellipse(40, -165, 200);

  //ropes
  push();
  noFill();
  arc(-4, -120, 90, 60, 0, 3, PI);
  arc(85, -120, 90, 60, 0, 3, PI);
  arc(0, -100, 80, 60, 0, 3, PI);
  arc(80, -100, 80, 60, 0, 3, PI);

  line(0, 0, -50, -120);
  line(40, 0, 40, -265);
  line(75, 0, 130, -120);
  pop();

  //guy in basket
  push();
  noFill();
  strokeWeight(10);
  line(15, -30, 15, 0);
  pop();

  fill(0, 0, 0);
  ellipse(15, -30, 30);

  //basket
  fill(170, 120, 90);
  rect(0, 0, 80, 80, 15);
  rect(-10, 0, 100, 20, 10);
}

//Mouse click to change state
function mousePressed() {
  if (state === "start") {
    if (mouseY > 300) {
      state = "instructions";
    } else {
      resetGame();
      state = "game";
    }
  } else if (state === "result" || state === "fail" || state === "instructions") {
    resetGame();
    state = "start";
  }
}

//reset game parameters
function resetGame() {
  x = 150;
  y = 100;
  vx = 0;
  vy = 0;
  isLanding = false;
}

//controls
function keyPressed() {
  if (keyCode === 37) {
    vx = -2;
  } else if (keyCode === 39) {
    vx = 2;
  } else if (keyCode === 32) {
    vy = thrust;
  }
}

function keyReleased() {
  if (keyCode === 37 || keyCode === 39) {
    vx = 0;
  }
}

function cloud() {
  fill(255, 255, 255);
  noStroke();
  ellipse(150, 100, 100);
  ellipse(170, 80, 100, 90);
  ellipse(195, 130, 140, 120);
  ellipse(235, 95, 100, 80);
  ellipse(275, 135, 140, 100);
  ellipse(120, 135, 120, 100);
}

function ground() {
  push();
  fill(100, 200, 100);
  noStroke();
  rect(0, 500, 800, 100);
  pop();
}

function partner() {
  noFill();
  strokeWeight(8);
  line(150, 100, 150, 130);
  fill(0, 0, 0);
  ellipse(150, 130, 15);
  line(150, 130, 145, 150);
  line(150, 130, 155, 150);
  line(140, 120, 140, 120);
}

function landingSpotStand() {
  stroke(155, 100, 100);
  strokeWeight(20);
  line(415, 375, 415, 500);
  line(485, 375, 485, 500);

  strokeWeight(6);
  line(435, 375, 435, 500);
  line(450, 375, 450, 500);

  strokeWeight(3);
  line(435, 400, 450, 400);
  line(435, 410, 450, 410);
  line(435, 420, 450, 420);
  line(435, 430, 450, 430);
  line(435, 440, 450, 440);
  line(435, 450, 450, 450);
  line(435, 460, 450, 460);
  line(435, 470, 450, 470);
  line(435, 480, 450, 480);
  line(435, 490, 450, 490);
}