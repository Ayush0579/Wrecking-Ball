const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var boxes = [];

function preload(){
    backgroundImg = loadImage("background.png");
}

function setup(){
    var canvas = createCanvas(2000,1000);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(1000,1000,2000,40);

    for (let i = 0; i < 6; i++) {
        for (let a = 0; a < 3; a++) {
            box = new Box(1300+(a*100),930-(i*100),100,100);
            boxes.push(box);
        }
    }

    options = {
        restitution: 0.1,
        isStatic: false,
        density: 1,
        frictionAir: 0.005
    }

    wrecker = Bodies.circle(1000,600,80,options);
    World.add(world,wrecker);

    chain = new SlingShot(wrecker,{x: 1000,y: 300});
}

function draw(){
    background(backgroundImg);
    ellipseMode(RADIUS);
    Engine.update(engine);

    ground.display();

    chain.display();

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].display();
    }

    fill("#8E878C");
    ellipse(wrecker.position.x, wrecker.position.y,80,80);
}

function mouseDragged(){
    Matter.Body.setPosition(wrecker,{x: mouseX,y: mouseY});
}