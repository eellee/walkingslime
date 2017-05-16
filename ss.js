var stage, hero, queue;
var keys = {
    u: false,
    d: false,
    l: false,
    r: false
};
var settings = {
    heroSpeed: 2
};

function preload(){
    "use strict";
    stage = new createjs.Stage("ss");
    queue = new createjs.LoadQueue(true);
    queue.loadManifest([
        {id: "slimeSS", src:"Animations/slime.json"}
    ]);
    queue.addEventListener('progress', function(){
        console.log("hi mom, preloading");
    });
    queue.addEventListener('complete', setup);
}

function setup(){
    "use strict";
    var slimeSS = new createjs.SpriteSheet(queue.getResult("slimeSS"));
    hero = new createjs.Sprite(slimeSS, "down");
    hero.currentDirection = "down";
    stage.addChild(hero);
    window.addEventListener('keyup', fingerUp);
    window.addEventListener('keydown', fingerDown);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', heartBeat)
}
function fingerUp(e){
    "use strict";
    //console.log(e.keyCode);
    switch(e.keyCode){
        case 37:
            keys.l = false;
            break;
        case 38:
            keys.u = false;
            break;
        case 39:
            keys.r = false;
            break;
        case 40:
            keys.d = false;
            break;
    }
}
function fingerDown(e){
    "use strict";
    switch(e.keyCode){
        case 37:
            keys.l = true;
            break;
        case 38:
            keys.u = true;
            break;
        case 39:
            keys.r = true;
            break;
        case 40:
            keys.d = true;
            break;
    }
}
function moveSlime(){
    "use strict";
    if(keys.l){
        hero.x-=settings.heroSpeed;
        if(hero.currentDirection != "left"){
            hero.gotoAndPlay('left')
            hero.currentDirection="left";
        }
    }
    if(keys.r){
        hero.x+=settings.heroSpeed;
        if(hero.currentDirection != "right"){
            hero.gotoAndPlay('right')
            hero.currentDirection="right";
        }
    }
    if(keys.u){
        hero.y-=settings.heroSpeed;
        if(hero.currentDirection != "up"){
            hero.gotoAndPlay('up')
            hero.currentDirection="up";
        }
    }
    if(keys.d){
        hero.y+=settings.heroSpeed;
        if(hero.currentDirection != "down"){
            hero.gotoAndPlay('down')
            hero.currentDirection="down";
        }
    }
}
function heartBeat(e){
    "use strict";
    moveSlime();
    stage.update(e);
}
window.addEventListener('load', preload);