var tiana_img, frog_img,dead_frog_img, bg_img, block1_img, block2_img, block3_img, block4_img, block5_img, block6_img, strawberry_img, rasberry_img, orange_img, carrot_img, apple_img, diamond_fruit_img, block7_img; 
var blocks_group, fruits_group, poisned_fruit_group, poisned_fruit_img, good_apple_img, golden_apple_group;
var score=0;
var princess_img, prince_img;


function preload(){
  frog_img=loadAnimation("frog1.png");
  bg_img=loadImage("bg (2).jpg");
  block1_img=loadImage("block1.png");
  block2_img=loadImage("block2.png");
  block3_img=loadImage("block3.png");
  block4_img=loadImage("block4.png");
  rasberry_img=loadImage("raspberry1.png");
  orange_img=loadImage("orange1.png");
  carrot_img=loadImage("carrot.png");
  apple_img=loadImage("apple1.png");
  poisned_fruit_img=loadImage("evil_fruit.png");
  good_apple_img=loadImage("good_apple.png");
  block5_img=loadImage("block5.png");
  block6_img=loadImage("block6.png");
  dead_frog_img=loadImage("frog2.png");
  diamond_fruit_img=loadAnimation("diamond","diamond_fruit.png");
  block7_img=loadImage("block7.png");
  princess_img=loadAnimation("princess","princess.png");
  prince_img=loadAnimation("prince","prince.png");
}

function setup(){
  createCanvas(600,400);
  
  frog=createSprite(35,260,20,20);
  frog.addAnimation("frog1",frog_img);
  frog.addAnimation("frog2",dead_frog_img);
  frog.addAnimation("prince", prince_img);
  frog.scale=0.06;
  



  
  diamond_fruit_group=createGroup();
  golden_apple_group=createGroup();
  block_group=createGroup();
  fruits_group=createGroup();
  poisned_fruit_group=createGroup();


  edges=createEdgeSprites();
}

function draw(){
  background(bg_img);
  textSize(20);
  fill("white");
  text("Score : "+score,10,30);
  
  if(frog.isTouching(edges)){
    frog.x=50;
    frog.y=260;
  }

  create_block_group();
  if(keyDown("up")){
    frog.y=frog.y-5;
    
  }
  
  if(keyDown("down")){
    frog.y=frog.y+5;
    
  }
  
  if(keyDown("right")){
    frog.x=frog.x+5;
    
  }
  
  if(keyDown("left")){
    frog.x=frog.x-5;
    
  }
  if(frog.isTouching(fruits_group)){
    fruits_group.destroyEach();
    score=score+1;
    
  }
  
  
  if(frog.isTouching(diamond_fruit_group)){
    frog.changeAnimation("prince", prince_img);
    diamond_fruit_group.changeAnimation("princess", princess_img);



  }
  
  
  create_golden_apple();
  create_diamond_fruit();
  drawSprites();
}

function create_block_group(){
  if(frameCount%180===0 || frameCount%480===0 || frameCount%680===0){
    
    var blocks=createSprite(600,50,1,1); 
    blocks.addImage(block1_img);
    var fruits=createSprite(600,50,1,1);
    
    
    blocks.scale=0.6;
    
  
     
    blocks.x=fruits.x;
    
    
    
    fruits.velocityX=-5;
    blocks.velocityX=-5;
    
    
    
    
    fruits.lifetime=600;
    blocks.lifetime=600;
    
    
    var randomblocks=Math.round(random(1,5));
    switch(randomblocks){
      case 1:
              fruits.addImage(apple_img);
              fruits.scale=0.05;
              break;
      case 2:
              fruits.addImage(rasberry_img);
              fruits.scale=0.1;
              break;
      case 3: 
              fruits.addImage(orange_img);
              fruits.scale=0.01;
              break;
      case 4: 
              fruits.addImage(carrot_img);
              fruits.scale=0.05;
              blocks.y=360;
              fruits.y=blocks.y;
              break;
      case 5: create_poisned_fruit();
              break;
              default:break;
    }
    
    block_group.add(blocks);
    fruits_group.add(fruits);
    frog.depth=blocks.depth;
    blocks.depth=blocks.depth+1;
    fruits.depth=blocks.depth;
    fruits.depth=fruits.depth+2;
  }
}

function create_golden_apple(){
   if(frameCount%10===0){
    if(frog.isTouching(poisned_fruit_group)){
      var blocks=createSprite(600,50,1,1);
      blocks.addImage(block6_img);
      blocks.y=360;
      score=score-1;
      blocks.velocityX=-5;
      var gold_fruit=createSprite(600,50,1,1);
      gold_fruit.scale=0.07;
      gold_fruit.addImage(good_apple_img);
      gold_fruit.y=blocks.y;
      gold_fruit.velocityX=-5;
      blocks.scale=0.6;
     
      golden_apple_group.destroyEach();
   
      golden_apple_group.add(gold_fruit);
    }
     
    if(frog.isTouching(poisned_fruit_group)){
      frog.changeAnimation("frog2", dead_frog_img);
    }
    else if(frog.isTouching(golden_apple_group)){
      frog.changeAnimation("frog1", frog_img);
    }

   }
}
function create_diamond_fruit(){
  if(frameCount%10===0){
    if(frog.isTouching(golden_apple_group)){
      var blocks=createSprite(600,50,1,1);
      blocks.addImage(block7_img);
      blocks.y=10;
      blocks.velocityX=-5;
      blocks.scale=0.6;
    
    var diamond_fruit=createSprite(600,50,1,1);
      
      diamond_fruit.addAnimation("diamond",diamond_fruit_img);
      diamond_fruit.addAnimation("princess",princess_img)
      diamond_fruit.y=blocks.y;
      diamond_fruit.velocityX=-5;
      diamond_fruit.scale=1;
     
      diamond_fruit_group.add(diamond_fruit);
     
      
    
    
    
    

    if(frog.isTouching(diamond_fruit_group)){
      frog.changeAnimation("prince", prince_img);
      diamond_fruit.changeAnimation("princess",princess_img);
    }
    
    }
  }
}

function create_poisned_fruit(){
  if(frameCount%10===0){
    var blocks=createSprite(600,50,1,1);
    blocks.addImage(block5_img);
    blocks.y=360;
    blocks.velocityX=-5;
    
    var poisned_fruit=createSprite(600,50,1,1);
      poisned_fruit.scale=0.07;
      poisned_fruit.addImage(poisned_fruit_img);
      poisned_fruit.y=blocks.y;
      poisned_fruit.velocityX=-5;
      poisned_fruit_group.add(poisned_fruit);
    blocks.scale=0.6;
      
    frog.depth=blocks.depth;
    blocks.depth=blocks.depth+1;
    poisned_fruit.depth=blocks.depth;
    poisned_fruit.depth=poisned_fruit.depth+2;
  }
}