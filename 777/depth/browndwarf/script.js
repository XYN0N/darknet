window.addEventListener('load', checkJSLoaded)

function checkJSLoaded() {   

//HTML related
var canvasElement = document.querySelector("canvas");
var canvas        = canvasElement.getContext("2d");
var quantity      = canvasElement.getAttribute("data-starfield");

//Javascript related
var stars = [];



function Star (x, y, offset, duration = 100, size = 2) {
  //constructor
  this.x            = x;
  this.y            = y;
  this.duration     = duration;
  this.offset       = offset;
  this.size         = size;
  this.timer        = offset % duration;
  
  //functions
  this.draw = function () {
    //Calculate animations
    if (this.timer > this.duration) {
      this.timer = 0;
    }
    this.timer += 1;
    
    //Calculate
    var framesize = Math.abs((this.timer / this.duration) - 0.5) * this.size + this.size/10;
    
    //Update element
    canvas.beginPath();
    canvas.arc(this.x, this.y, framesize, 0, Math.PI * 5, false);
    canvas.fillStyle = 'hsl(' + 5000 * Math.random() + ', 150%, 50%)';
    canvas.fill();
  }
}

function ShootingStar (offset, duration = 100, size = 3) {
  //Constructor
  this.offset   = offset;
  this.duration = duration;
  this.size     = size;
}


//Spawn stars
for (let i = 0; i < quantity; i++) {
  var positionX = window.innerWidth * Math.random();
  var positionY = window.innerHeight * Math.random();
  var offset    = Math.random() * 100;
  var duration  = Math.random() * 70 + 50;
  var size      = Math.random() * 2.5;
  
  stars.push(new Star(positionX, positionY, offset, duration, size));
}

//Animate stars
function renderFrame () {
  //Clear canvas
  canvas.clearRect(0, 0, canvasElement.width, canvasElement.height);
  
  //Call all stars to update their animation
  for (let i = 0; i < quantity; i++) {
    stars[i].draw();
  }
  
  //Loop function
  setTimeout(renderFrame, 100);
}


//Set canvas size
canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

//Start animation
renderFrame();};


$(function() {
  var body = $('#starshine'),
      template = $('.template.shine'),
      stars =  100,
      sparkle = 10;
  
    
  var size = 'small';
  var createStar = function() {
    template.clone().removeAttr('id').css({
      top: (Math.random() * 200) + '%',
      left: (Math.random() * 200) + '%',
      webkitAnimationDelay: (Math.random() * sparkle) + 's',
      mozAnimationDelay: (Math.random() * sparkle) + 's'
    }).addClass(size).appendTo(body);
  };
 
  for(var i = 0; i < stars; i++) {
    if(i % 2 === 0) {
      size = 'small';
    } else if(i % 3 === 0) {
      size = 'medium';
    } else {
      size = 'large';
    }
    
    createStar();
  }
});


/*
┈┈┈╲┈┈┈┈╱
 ┈┈╱    ▔╲
┈┈┃┈▇┈┈▇┈┃
╭╮┣━━━━━━┫╭╮
┃┃┃┈┈┈┈┈┈┃┃┃
╰╯┃┈┈┈┈┈┈┃╰╯
┈┈╰┓┏━━┓┏╯
┈┈┈╰╯┈┈╰╯      

😊You r always welcome 😊

The EnD

*/