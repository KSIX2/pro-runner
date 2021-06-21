let canvas = document.querySelector("#gameCanvas");
let cwidth = canvas.width = window.innerWidth;
let cheight = canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
 
var lowerTrack = [];
var upperTrack = [];

function LowerBlock(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
}

function UpperBlock(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
}

var gamepiece = {
    x: cwidth + 150,
    y: cheight/2 + 80,
    width: 70,
    height: 70,
    color: "darkred"
};

ctx.fillStyle = "darkred";
ctx.fillRect(gamepiece.x, gamepiece.y, gamepiece.width, gamepiece.height);

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

    gamepiece.x -= 5;
    ctx.fillStyle = gamepiece.color;
    ctx.fillRect(gamepiece.x, gamepiece.y, gamepiece.width, gamepiece.height);
    ctx.fillStyle = "black";

    numframe++;

    if(lowerTrack.length === 10){
        cancelAnimationFrame(stopdesignInitialTrack);
        makeRandomTrackCell();
    } else {
        stopdesignInitialTrack = requestAnimationFrame(designInitialTrack);
    }
}

var highScore;
var framenum = 30;
var stopmakeRandomTrackCell;
function makeRandomTrackCell() {
    ctx.clearRect(0, 0, cwidth, cheight);

    ctx.fillStyle = gamepiece.color;
    ctx.fillRect(gamepiece.x, gamepiece.y, gamepiece.width, gamepiece.height);

    ctx.fillStyle = "#002550";
    ctx.font = "50px Shojumaru";
    ctx.fillText(`Score : ${Math.floor((framenum-30)/15)}`, 25, 105);

    if(Math.floor((framenum-30)/15) > highScore){
        highScore =  Math.floor((framenum - 30)/15);
        localStorage.setItem("HIGHSCORE", highScore);
    } else {
        highScore = localStorage.getItem("HIGHSCORE");
    }

    ctx.fillText(`High Score : ${highScore}`, 825, 105);

    if(framenum%30 === 0){
        var x = Math.floor(Math.random()*10);
        if(x%3 === 0){
            ctx.fillStyle = "#FFE800";
            ctx.fillRect(cwidth + 150, cheight/2  + 150, 150, 20);
            lowerTrack.push(new LowerBlock(cwidth + 150, cheight/2  + 150, "#FFE800"));
        } else {
            ctx.fillStyle = "black";
            ctx.fillRect(cwidth + 150, cheight/2  + 150, 150, 20);
            lowerTrack.push(new LowerBlock(cwidth + 150, cheight/2  + 150, "black"));
        }

        x = Math.floor(Math.random()*2);
        if(x === 0 && lowerTrack[lowerTrack.length - 1].color === "black"){
            ctx.fillStyle = "#FFE800";
            ctx.fillRect(cwidth + 150, cheight/2 - 150, 150 , 20);
            upperTrack.push(new UpperBlock(cwidth + 150, cheight/2 - 150, "#FFE800"));
        } else {
            ctx.fillStyle = "black";
            ctx.fillRect(cwidth + 150, cheight/2 - 150, 150, 20);
            upperTrack.push(new UpperBlock(cwidth + 150, cheight/2 - 150, "black"));
        }
    }

    for(var i = lowerTrack.length-1; i>=0 ; i--){
        lowerTrack[i].x -= 5;
        upperTrack[i].x -= 5;
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

var stopjump;
function jump(){
    if(state === "bottom"){
        gamepiece.y -= 7;
        if(gamepiece.y === cheight/2 - 130){
            state = "top";
            cancelAnimationFrame(stopjump); 
        } else {
            stopjump = requestAnimationFrame(jump);
            console.log("up");
        } 
    } else {
        drop();
    }
}

var stopdrop;
function drop(){
    gamepiece.y += 7;
    if(gamepiece.y === cheight/2 + 80){
        state = "bottom";
        cancelAnimationFrame(stopdrop);
    } else {
        stopdrop = requestAnimationFrame(drop);
        console.log("down");
    }
}

var state = "bottom";
document.addEventListener("keyup", e => {
    if(e.code === "Space"){
        jump();
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
let modal = document.querySelector("#modal");
let score = document.querySelector("#score");
let high = document.querySelector("#highscore");
let playagain = document.querySelector("button");

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

playagain.addEventListener("click", () => {
    location.reload();
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

function checkCrash(){
    if(lowerTrack[lowerTrack.length - 9].x - gamepiece.x < 70 && gamepiece.y === cheight/2 + 80){
        if(lowerTrack[lowerTrack.length - 9].color === "#FFE800"){
            score.innerHTML = `Your score : ${Math.floor((framenum-30)/15)}`;
            high.innerHTML = `High score : ${highScore}`;
            canvas.style.filter = "blur(5px)";
            modal.style.display = "block";
            return true;
        }
    }

    if(lowerTrack[lowerTrack.length - 10].color === "#FFE800" && lowerTrack[lowerTrack.length - 9].color === "black" && gamepiece.y === cheight/2 + 80){
        if(lowerTrack[lowerTrack.length - 9].x > 0){
            score.innerHTML = `Your score : ${Math.floor((framenum-30)/15)}`;
            high.innerHTML = `High score : ${highScore}`;
            canvas.style.filter = "blur(5px)";
            modal.style.display = "block";
            return true;
        }
    }

    if(upperTrack[upperTrack.length - 9].x - gamepiece.x < 70 && gamepiece.y === cheight/2 - 130){
        if(upperTrack[upperTrack.length - 9].color === "#FFE800"){
            score.innerHTML = `Your score : ${Math.floor((framenum-30)/15)}`;
            high.innerHTML = `High score : ${highScore}`;
            canvas.style.filter = "blur(5px)";
            modal.style.display = "block";
            return true;
        }
    }

    if(upperTrack[upperTrack.length - 10].color === "#FFE800" && upperTrack[upperTrack.length - 9].color === "black" && gamepiece.y === cheight/2 - 130){
        if(upperTrack[upperTrack.length - 9].x > 0){
            score.innerHTML = `Your score : ${Math.floor((framenum-30)/15)}`;
            high.innerHTML = `High score : ${highScore}`;
            canvas.style.filter = "blur(5px)";
            modal.style.display = "block";
            return true;
        }
    }

    return false;
}







