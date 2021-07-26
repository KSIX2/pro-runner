let canvas = document.querySelector("#gameCanvas");
let cwidth = canvas.width = window.innerWidth;
let cheight = canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
 
var lowerTrack = [];
function LowerBlock(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
}

var upperTrack = [];
function UpperBlock(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
}

let microbeArray = ["bacteriophage.png", "blue virus.png", "purple virus.png", "red round virus.png"]
function Obstacles(x, y){
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 70;
    this.img = new Image();
    this.img.src = microbeArray[Math.floor(Math.random()*4)];
    this.draw = function() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

let powerUpArray = ["powerup blue.png", "green pwrup.png"]
function PowerUps(x, y){
    this.x = x;
    this.y = y;
    this.width = 70;
    this.height = 70;
    this.img = new Image();
    this.identify = Math.floor(Math.random()*2)
    this.img.src = powerUpArray[this.identify];
    this.draw = function() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

let gamepiecex = cwidth + 150;
let gamepiecey = cheight/2 + 80;
let gamepieceangle = 0;
let gamepiece = new Image();
gamepiece.src = "wbc.png";
gamepiece.addEventListener("load", () => {
    ctx.drawImage(gamepiece, gamepiecex, gamepiecey, 70, 70);
})

var numframe = 30;
var stopdesignInitialTrack;
function designInitialTrack(){
    ctx.clearRect(0, 0, cwidth, cheight);

    if(numframe%30 === 0){
        ctx.fillStyle = "black";

        ctx.fillRect(cwidth + 5, cheight/2  + 150, 150, 20);
        lowerTrack.push(new LowerBlock(cwidth + 5, cheight/2  + 150, "black"));

        ctx.fillRect(cwidth + 5, cheight/2 - 150, 150, 20);
        upperTrack.push(new UpperBlock(cwidth + 5, cheight/2 - 150, "black"));
    }

    for(var i = lowerTrack.length-1; i>=0 ; i--){
        lowerTrack[i].x -= 5;
        upperTrack[i].x -= 5;
        ctx.fillRect(lowerTrack[i].x, lowerTrack[i].y, 150, 20);
        ctx.fillRect(upperTrack[i].x,upperTrack[i].y, 150, 20);
    }

    gamepiecex -= 5;
    if(gamepiecestate === 1){
        ctx.save();
        ctx.translate(gamepiecex + 70/2, gamepiecey + 70/2);
        ctx.scale(1,-1)
        ctx.drawImage(gamepiece, -70/2, -70/2, 70, 70);
        ctx.restore();  
    } else if(gamepiecestate === 0){
        ctx.drawImage(gamepiece, gamepiecex, gamepiecey, 70, 70);
    }

    numframe++;

    if(lowerTrack.length === 10){
        cancelAnimationFrame(stopdesignInitialTrack);
        makeRandomTrackCell();
    } else {
        stopdesignInitialTrack = requestAnimationFrame(designInitialTrack);
    }
}

let count = 0;
let speed = 5;
let speedChange = 0;
let obstacleArray = []
let obstacleYSPEED = []
let pwrup = new PowerUps(cwidth + 40, Math.floor(Math.random()*2) ? cheight/2 - 130 : cheight/2 + 80);
let greenpwrupactivate = 0;
let greenpwrupactivatemoment = 0;
let bluepwrupactivate = 0;
let bluepwrupactivatemoment = 0;
let gameScore = 10;
var highScore;
var framenum = 30;
var stopmakeRandomTrackCell;
function makeRandomTrackCell() {
    ctx.clearRect(0, 0, cwidth, cheight);

    console.log(modal.style.display)
    if(greenpwrupactivate === 1){
        if(lowerTrack.length - greenpwrupactivatemoment >= 30){
            greenpwrupactivate = 0;
        }
    }

    if(bluepwrupactivate ===1){
        if(lowerTrack.length - bluepwrupactivatemoment >= 30){
            bluepwrupactivate = 0;
        }
    }
    if(gamepiecestate === 1){
        ctx.save();
        ctx.translate(gamepiecex + 70/2, gamepiecey + 70/2);
        ctx.scale(1,-1)
        ctx.drawImage(gamepiece, -70/2, -70/2, 70, 70);
        ctx.restore();
    } else if(gamepiecestate === 0){
        ctx.drawImage(gamepiece, gamepiecex, gamepiecey, 70, 70);
    }

    gameScore = lowerTrack.length;
    ctx.fillStyle = "#002550";
    ctx.font = "50px Shojumaru";
    ctx.fillText(`Score : ${gameScore}`, 25, 105);
    if(gameScore > highScore){
        highScore =  gameScore;
        localStorage.setItem("HIGHSCORE", highScore);
    } else {
        highScore = localStorage.getItem("HIGHSCORE");
    }
    ctx.fillText(`High Score : ${highScore}`, 700, 105);

    if(framenum%(30 - count) === 0){
        var x = Math.floor(Math.random()*10);
        if(x%3 === 0){
            ctx.fillStyle = greenpwrupactivate === 0 ? "#FFE800" : "#5DF845";
            ctx.fillRect(cwidth + 150, cheight/2  + 150, 150, 20);
            lowerTrack.push(new LowerBlock(cwidth + 150, cheight/2  + 150, greenpwrupactivate === 0 ? "#FFE800" : "#5DF845"));
        } else {
            ctx.fillStyle = "black";
            ctx.fillRect(cwidth + 150, cheight/2  + 150, 150, 20);
            lowerTrack.push(new LowerBlock(cwidth + 150, cheight/2  + 150, "black"));
        }

        x = Math.floor(Math.random()*2);
        if(x === 0 && lowerTrack[lowerTrack.length - 1].color === "black"){
            ctx.fillStyle = greenpwrupactivate === 0 ? "#FFE800" : "#5DF845";
            ctx.fillRect(cwidth + 150, cheight/2 - 150, 150 , 20);
            upperTrack.push(new UpperBlock(cwidth + 150, cheight/2 - 150, greenpwrupactivate === 0 ? "#FFE800" : "#5DF845"));
        } else {
            ctx.fillStyle = "black";
            ctx.fillRect(cwidth + 150, cheight/2 - 150, 150, 20);
            upperTrack.push(new UpperBlock(cwidth + 150, cheight/2 - 150, "black"));
        }
    }

    if(lowerTrack.length%30 === 0 && speed < 13 && lowerTrack[lowerTrack.length-1].x === cwidth + 150){
        count++;
        speedChange = speed/((150/speed)-1);
        speed += speedChange; 
        framenum = 30 - count;
    }

    if(lowerTrack.length%5 === 0 && lowerTrack[lowerTrack.length-2].color === "black" && upperTrack[upperTrack.length-2].color === "black" && lowerTrack[lowerTrack.length - 1].x === cwidth + 150 && bluepwrupactivate === 0){
        obstacleArray.push(new Obstacles(cwidth + 40, Math.random()*210 + cheight/2 - 125));
        obstacleYSPEED.push(3)
    }

    if(lowerTrack.length%90 === 0 && lowerTrack[lowerTrack.length-1].x === cwidth + 150){
        if(lowerTrack[lowerTrack.length-1].color === "black" && upperTrack[upperTrack.length-1].color === "black"){
            pwrup = new PowerUps(cwidth + 190, Math.floor(Math.random()*2) ? cheight/2 - 130 : cheight/2 + 80)
        } else if(upperTrack[upperTrack.length-1].color === "black"){
            pwrup = new PowerUps(cwidth + 190, cheight/2 - 130)
        } else if(lowerTrack[lowerTrack.length-1].color === "black"){
            pwrup = new PowerUps(cwidth + 190, cheight/2 + 80)
        }
    }

    pwrup.draw();
    pwrup.x -= speed;

    for(var i = 0; i < obstacleArray.length; i++){
        obstacleArray[i].x -= speed;
        if(obstacleArray[i].y <= cheight/2 - 135){
            obstacleYSPEED[i] = -obstacleYSPEED[i];
        } 
        if(obstacleArray[i].y >= cheight/2 + 85){
            obstacleYSPEED[i] = -obstacleYSPEED[i];
        }
        obstacleArray[i].y += obstacleYSPEED[i];
        obstacleArray[i].draw();
    }

    for(var i = lowerTrack.length-1; i>=0 ; i--) {
        lowerTrack[i].x -= speed;
        upperTrack[i].x -= speed;
        ctx.fillStyle = lowerTrack[i].color;
        ctx.fillRect(lowerTrack[i].x, lowerTrack[i].y, 150, 20);
        ctx.fillStyle = upperTrack[i].color;
        ctx.fillRect(upperTrack[i].x, upperTrack[i].y, 150, 20);
    }

    framenum++;
    if(!checkCrash()){
        stopmakeRandomTrackCell = requestAnimationFrame(makeRandomTrackCell);
    }

}

function jump(){
    gamepiecestate = 0.5;
    gamepiecey -= 10.5;
    gamepieceangle += 7.5;
    ctx.save();
    ctx.translate(gamepiecex + 70/2, gamepiecey + 70/2);
    ctx.rotate(gamepieceangle * Math.PI/180);
    ctx.drawImage(gamepiece, -70/2, -70/2, 70, 70);
    ctx.restore();
    if(gamepiecey >= cheight/2 - 125){
        var stopjump = requestAnimationFrame(jump);
    } else {
        gamepiecestate = 1
        gamepieceangle = 0
        ctx.save()
        ctx.translate(gamepiecex + 70/2, gamepiecey + 70/2)
        ctx.scale(1,-1)
        ctx.drawImage(gamepiece, -70/2, -70/2, 70, 70);
        ctx.restore()
        cancelAnimationFrame(stopjump);
    }
}

function drop(){
    gamepiecestate = 0.5
    gamepiecey += 10.5;
    gamepieceangle += 7.5;
    ctx.save();
    ctx.translate(gamepiecex + 70/2, gamepiecey + 70/2);
    ctx.rotate(gamepieceangle * Math.PI/180);
    ctx.scale(1,-1)
    ctx.drawImage(gamepiece, -70/2, -70/2, 70, 70);
    ctx.restore();
    if(gamepiecey <= cheight/2 + 75){
        var stopdrop = requestAnimationFrame(drop);
    } else {
        gamepiecestate = 0
        gamepieceangle = 0
        ctx.drawImage(gamepiece, gamepiecex, gamepiecey, 70, 70);
        cancelAnimationFrame(stopdrop);
    }
}

let gamepiecestate = 0;
document.addEventListener("keyup", e => {
    if(e.code === "Space" && gamepiecestate === 0){
        jump();
    } else if(e.code === "Space" && gamepiecestate === 1){
        drop();
    }
})

let cagecanvas = document.querySelector("#cage");
let cagewidth = cagecanvas.width = window.innerWidth/2;
let cageheight = cagecanvas.height = window.innerHeight/2;
cage = cagecanvas.getContext("2d");

let play = document.querySelector("#play");
let rightSide = document.querySelector("#right");
let leftSide = document.querySelector("#left")
let gameName = document.querySelector("#gameName");
let score = document.querySelector("#score");
let high = document.querySelector("#highscore");

play.addEventListener("mousedown", () => {
    play.style.fontSize = "70px";
    rightSide.style.padding = "203px";
})

play.addEventListener("mouseup", () => {
    play.style.fontSize = "80px";
    rightSide.style.padding = "183px";
    gameName.style.animationName = "disappearAnimation";
    cancelAnimationFrame(stopcageAnimation);
    cage.clearRect(30, cageheight/2 - 160, 630, 250);
    play.style.animationName = "disappearAnimation";
    changebg();
})

var bgchanger = 1366/2;
var stopchangebg;
function changebg(){
    leftSide.style.width = (bgchanger + "px").toString();
    bgchanger += 4;
    if(bgchanger > window.innerWidth+10){
        cancelAnimationFrame(stopchangebg);
        gameCanvas.style.zIndex = 2;
        designInitialTrack();
    } else {
        stopchangebg = requestAnimationFrame(changebg);   
    }
}

cage.strokeStyle = "black";
cage.lineWidth = 20;
cage.strokeRect(40, cageheight/2 - 150, 600, 225);

var stopcageAnimation
var x, t=0;
function cageAnimation(){
    cage.clearRect(50, cageheight/2 - 140, 580, 205);
    cage.fillStyle = "darkred";
    cage.fillRect(x, cageheight/2 - 5, 70, 70);
    x = 305 + 255*Math.sin(t);
    t+=0.05;
    stopcageAnimation = requestAnimationFrame(cageAnimation);
}

cageAnimation();

let modal = document.querySelector("#modal");
let playagain = document.querySelector("button");
playagain.addEventListener("click", () => {
    location.reload();
})

function checkCrash(){
    if(lowerTrack[lowerTrack.length - 9].x - gamepiecex <= 5 && gamepiecestate === 0){
        if(lowerTrack[lowerTrack.length - 9].color === "#FFE800"){
            postCrash();
            return true;
        }
    }

    if(lowerTrack[lowerTrack.length - 10].color === "#FFE800" && lowerTrack[lowerTrack.length - 9].color === "black" && gamepiecestate === 0){
        if(lowerTrack[lowerTrack.length - 9].x > 220 ){
            postCrash();
            return true;
        }
    }

    if(upperTrack[upperTrack.length - 9].x - gamepiecex <= 5 && gamepiecestate === 1){
        if(upperTrack[upperTrack.length - 9].color === "#FFE800"){
            postCrash();
            return true;
        }
    }

    if(upperTrack[upperTrack.length - 10].color === "#FFE800" && upperTrack[upperTrack.length - 9].color === "black" && gamepiecestate === 1){
        if(upperTrack[upperTrack.length - 9].x > 220 ){
            postCrash();
            return true;
        }
    }

    for(var i = 0; i < obstacleArray.length; i++){
        if(Math.abs(obstacleArray[i].x - gamepiecex) <= 55 && Math.abs(obstacleArray[i].y - gamepiecey) <= 55){
            postCrash();
            return true;
        }
    }

    if(Math.abs(pwrup.x - gamepiecex) <= 65 && Math.abs(pwrup.y - gamepiecey) <= 65){
        if(pwrup.identify === 1){
            powerupAnimation();
            greenpwrupactivate = 1;
            greenpwrupactivatemoment = lowerTrack.length;
        }
        if(pwrup.identify === 0){
            powerupAnimation();
            bluepwrupactivate = 1;
            bluepwrupactivatemoment = lowerTrack.length;
        }
    }

    return false;
}

var stoppowerupAnimation;
function powerupAnimation(){
    if(pwrup.width === 70){
        pwrup.width = 0;
        pwrup.height = 0;
    }
}

function postCrash(){
    score.innerHTML = `Your score : ${gameScore}`;
    high.innerHTML = `High score : ${highScore}`;
    canvas.style.filter = "blur(5px)";
    modal.style.display = "block";
}