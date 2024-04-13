var score =0;
var fighter_jet,meteor,asteroid, bullet, backBoard;

var fighter_jetImg,bubbleImg, bulletImg, blastImg, backBoardImg;

var asteroidGroup, asteroidGroup, bulletGroup;


var life =3;
var score=0;
var gameState=1

function preload(){
  fighter_jetImg = loadImage("fighter_jet.jpg");
 blastImg = loadImage("blast.png");
  bulletImg = loadImage("bullet1.png");
  meteorImg = loadImage("meteor.jpg");
  asteroidImg = loadImage("asteroid.jpg");
  backBoardImg= loadImage("back.jpg");
}
function setup() {
  createCanvas(800, 600);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  fighter_jet= createSprite(100, height/2, 50,50);
  fighter_jet.addImage(fighter_jetImg)
  fighter_jet.scale=0.2
  
  bulletGroup = createGroup();   
  meteorGroup = createGroup();   
  asteroidGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background("#BDA297");
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    fighter_jet.y=mouseY  

    if (frameCount % 80 === 0) {
      drawMeteor();
    }

    if (frameCount % 100 === 0) {
      drawasteroid();
    }

    if(keyDown("space")){
      shootBullet();
    }

    if (meteorGroup.collide(backBoard)){
      handleGameover(meteorGroup);
    }
    if (asteroidGroup.collide(backBoard)) {
      handleGameover(asteroidGroup);
    }
    
    if(meteorGroup.collide(bulletGroup)){
      handleBubbleCollision(meteorGroup);
    }

    if(asteroidGroup.collide(bulletGroup)){
      handleBubbleCollision(asteroidGroup);
    }

    drawSprites();
  }
    
  
}

function drawMeteor(){
  meteor = createSprite(800,random(20,780),40,40);
  meteor.addImage(meteorImg);
  meteor.scale = 0.1;
  meteor.velocityX = -8;
  meteor.lifetime = 400;
  meteorGroup.add(meteor);
}
function drawasteroid(){
  asteroid = createSprite(800,random(20,780),40,40);
  asteroid.addImage(asteroidImg);
  asteroid.scale = 0.1;
  asteroid.velocityX = -8;
  asteroid.lifetime = 400;
  asteroidGroup.add(asteroid);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= fighter_jet.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

   blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg);
   blast.scale=0.3;
    blast.life=20;
    bulletGroup.destroyEach();
    bubbleGroup.destroyEach();
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
     
    }
  
}
