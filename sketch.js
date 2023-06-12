var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var spookySound
var score = 1
var restart, restartIMG, gameOver, gameOverIMG

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  restartIMG = loadImage("restart.png");
  gameOverIMG = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 400);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 400)
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4;

  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlockGroup = new Group();
  //ghost.debug = true;
  ghost.setCollider("rectangle", -20, 25, 120 , 250 )
  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverIMG);

  restart = createSprite(300, 140);
  restart.addImage(restartIMG);

  gameOver.scale = 0.8;
  restart.scale = 0.8;

  gameOver.visible = false;
  restart.visible = false;

  spookySound.loop();
}

function draw() {
  background(200);
  
  text("Score: " + score, 400, 50);
   

  if (gameState == "play") {


    if (tower.y > 400) {
      tower.y = 300
    }
    spawnDoors();

    if (keyDown("left_arrow") && ghost.x > 10) {
      ghost.x = ghost.x - 10;
    }
    if (keyDown("right_arrow") && ghost.x < 590) {
      ghost.x = ghost.x + 10;
    }
    if (keyDown("space") && ghost.y > 10) {
      ghost.velocityY = -12
    }
    ghost.velocityY = ghost.velocityY + 0.5
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;

    }
    if (frameCount % 5 === 0) {
      score = score + 1
    }

    if (ghost.y > 599 || invisibleBlockGroup.isTouching(ghost)) {
      gameState = "end"
    }

  } else if (gameState == "end") {

    gameOver.visible = true;
    restart.visible = true;

    ghost.velocityY = 0
    tower.velocityY = 0
    climbersGroup.setVelocityYEach(0);
    doorsGroup.setVelocityYEach(0);
    invisibleBlockGroup.setVelocityYEach(0);

    climbersGroup.setLifetimeEach(-1);
    doorsGroup.setLifetimeEach(-1);
    invisibleBlockGroup.setLifetimeEach(-1);

    if (mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
}






function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50);
    door.addImage(doorImg);

    climber = createSprite(200, 10);
    climber.addImage(climberImg);
    ;
    invisibleBlock = createSprite(200, 15)
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.x = Math.round(random(120, 400));
    door.velocityY = 1;

    climber.x = door.x;
    climber.velocityY = 1;

    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;

    door.lifetime = 800;
    climber.lifetime = 800
    invisibleBlock.lifetime = 800;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    ghost.depth = invisibleBlock.depth + 2;
    restart.depth = invisibleBlock.depth + 3;
    gameOver.depth = invisibleBlock.depth + 4;
    //climber.debug = true;
    //invisibleBlock.debug = true;

    climber.setCollider("rectangle", 0, -7, 100, 5)
  }
}

function reset(){
  gameState = "play";
  gameOver.visible = false;
  restart.visible = false;

  invisibleBlockGroup.destroyEach();
  climbersGroup.destroyEach();
  doorsGroup.destroyEach();

  score = 0;
 
  ghost.y = 400 

  tower.velocityY = 1
}