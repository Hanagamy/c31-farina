const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var rope;
var watermelon;
var watermelonIMG;
var glue;
var backgroundIMG;
var cueio;
var cueiotriste;
var cueiocomendo;
var cueiopiscano;
var cueioIMG;

let engine;
let world;
var ground;

function preload(){
watermelonIMG = loadImage('melon.png');
cueioIMG = loadImage('rabbit-01.png');
cueiopiscano = loadAnimation('blink_1.png','blink_2.png','blink_3.png');
cueiopiscano.playing = true;
cueiocomendo = loadAnimation('eat_0.png','eat_1.png','eat_2.png','eat_3.png','eat_4.png');
cueiocomendo.playing = true;
cueiocomendo.looping = false;
cueiotriste = loadAnimation('sad_1.png','sad_2.png','sad_3.png');
backgroundIMG = loadImage('background.png');

}
function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  rope= new Rope(8,{x:245,y:30});
  var WATERMEOLON_options = {
    density:0.005
  };
  watermelon = Bodies.circle(60,20,10,WATERMEOLON_options);
  Matter.Composite.add(rope.body,watermelon)
  glue = new Link(rope,watermelon);

  cueiopiscano.frameDelay = 20
  cueiocomendo.frameDelay = 20
  cueio=createSprite(250,620,100,100);
  cueio.addImage(cueioIMG);
  cueio.changeAnimation(cueiopiscano);
  cueio.addAnimation(cueiocomendo);
  cueio.scale = 0.15;
  imageMode(CENTER);
  button = createImg('cut_btn.png');
  button.position(220,30)
  button.size(50,50)
  button.mouseClicked(knife);
}

function draw() 
{
  background(51);
  image(backgroundIMG,width/2,height/2)
  //ground.show();
  drawSprites(); 
  Engine.update(engine);
  image(watermelonIMG,watermelon.position.x,watermelon.position.y,75,75);
  rope.show();  
  if(watermelon!=null){
    image(watermelonIMG,watermelon.position.x,watermelon.position.y,75,75);
  }
  if(collide(watermelon,cueio)==true){
    cueio.changeAnimation(cueiocomendo);
  }
}
function knife(){
  rope.break();
  glue.detach();
  glue = null;
}
function collide(body,sprite){
  if(body!=null){
     var dista = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
     if(dista<=80){
      World.remove(engine.world,watermelon);
      watermelon=null;
      return true;
     }
     else{
      return false;
     }
  }
}




