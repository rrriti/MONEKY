var PLAY = 1;
var END = 0;
var gameState = 1;


var monkey, monkey_running;
var banana, bananaImage, rock, rockImage;
var bananaGroup, rockGroup;
var ground, groundImage;
var survivalTime = 0;
var score = 0;

function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  monkey_collided = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
}

function setup() {

  createCanvas(400, 400);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 700, 10);
  ground.velocityX = -6;
  ground.x = ground.width / 2;
  console.log(ground.x);

  bananaGroup = new Group();
  rockGroup = new Group();

}

function draw() {
  background("lightgrey");
  
  stroke("black");
  fill("black");
  textSize(15);
  text("Score: "+ score,300,50);
  
  stroke("black");
  textSize(15);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time: " + survivalTime, 10, 50);

  drawSprites();

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    survivalTime = survivalTime + Math.round(frameCount / frameRate());

    monkey.velocityY = monkey.velocityY + 0.8

    if(keyDown("SPACE")){
      monkey.velocityY = -10;
    } 
    
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    monkey.collide(ground);
    banana();
    rock();

    if (rockGroup.isTouching(trex)) {
      gameState = END;
    }
    
  } else if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    rockGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

    monkey.changeAnimation(monkey_collided);

    bananaGroup.setLifetimeEach(-1);
    rockGroup.setLifetimeEach(-1);
    
    stroke("black");
    textSize(15);
    text("Press SPACE to restart", 200, 200);

    if (keyDown("SPACE")) {
      reset();
    }
  }
  
}

function reset(){
   gameState = PLAY;
  
  bananaGroup.destroyEach();
  rockGroup.destroyEach();
  
  monkey.changeAnimation(monkey_running);
  
  score = 0;
  survivalTime = 0;
}

function banana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400, 165, 10, 40);
    banana.velocityX = -(6 + 5 * score / 100);
  }

  banana.scale = 0.5;
  banana.lifetime = 300;
  bananaGroup.add(banana);
}

function rock() {
  if (frameCount % 200 === 0) {
    var rock = createSprite(400, 165, 10, 40);
    rock.velocityX = -(6 + 5 * score / 100);
  }

  rock.scale = 0.5;
  rock.lifetime = 300;
  rockGroup.add(rock);
}