var dog,sadDog,happyDog;
var foodObj;
var database;

var addF;
var  Petname;
//var lastFedH, lastFedM;

function preload(){
  normalDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  createCanvas(1000,600);
  database = firebase.database();

  dog = createSprite(800,310,150,150);
  dog.addImage(normalDog);
  dog.scale=0.15;

  foodObj = new Food();

  var Petname = createInput("My pet's name?");
  Petname.position(530,170);

  var title = createElement('h1')
  title.html("My Virtual Pet");
  title.position(500, 100);

  var feedB = createButton("Add Food");
  feedB.position(500,510);
  feedB.mousePressed(addFood);

  addF = createButton("Feed My Dog");
  addF.position(590, 510);
  addF.mousePressed(feedDog);

}

function feedDog(){
  dog.x = 300;
  dog.y = 180;
  dog.addImage(happyDog);
  foodObj.updateStock();
  
  foodObj.lastfed();

  var t = new Date();
  var h = t.getHours();
  var m = t.getMinutes();

  database.ref('lastFed/lastFedHour').update({
    lastFedHour: h,
  })

  database.ref('lastFed/LastFedMin').update({
    LastFedMin: m,
  })
}

function draw() {
  background("mediumslateblue");

  var lastFedH = database.ref('lastFed/lastFedHour/lastFedHour');
  lastFedH.on("value",function(data){
  lastFedH = data.val();
  })
  var lastFedM = database.ref('lastFed/LastFedMin/LastFedMin');
  lastFedM.on("value",function(data){
  lastFedM = data.val();
  })
  
  if(lastFedH < 12){
  fill("darkviolet");
  textSize(30);
  text("You last fed your dog at: " + lastFedH + " : " + lastFedM + "am",100,380);
  }
  else if(lastFedH > 12){
  fill("aquamarine");
  textSize(30);
  text("You last fed your dog at: " + lastFedH + " : " + lastFedM + "pm",100,380);
  }


  foodObj.display();
  drawSprites();
}

//function to read food Stock


//function to update food stock and last fed time


//function to add food in stock
function addFood(){
  dog.addImage(normalDog);
  dog.x = 800;
  dog.y = 310;
  foodObj.addFoods();
}
