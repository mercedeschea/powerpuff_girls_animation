var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y, 1000, 600);
};

Background.prototype.update = function () {
};

// function MushroomDude(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 189, 230, 5, 0.10, 14, true, 1);
//     this.x = 0;
//     this.y = 0;
//     this.speed = 100;
//     this.game = game;
//     this.ctx = game.ctx;
// }

// MushroomDude.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
// }

// MushroomDude.prototype.update = function () {
//     if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
//         this.x += this.game.clockTick * this.speed;
//     if (this.x > 1000) this.x = -230;
// }


// // inheritance 
// function Cheetah(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 512, 256, 2, 0.05, 8, true, 0.5);
//     this.speed = 350;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 0, 250);
// }

// Cheetah.prototype = new Entity();
// Cheetah.prototype.constructor = Cheetah;

// Cheetah.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     if (this.x > 1000) this.x = -230;
//     Entity.prototype.update.call(this);
// }

// Cheetah.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     Entity.prototype.draw.call(this);
// }

// inheritance 
function Kirby(game, spritesheet) {
    this.animation = new Animation(spritesheet, 60.8, 71, 10, 0.10, 10, true, 1);
    this.speed = 150;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 450);
}

Kirby.prototype = new Entity();
Kirby.prototype.constructor = Kirby;

Kirby.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 1000) this.x = -230;
    Entity.prototype.update.call(this);
}

Kirby.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Bubbles(game, spritesheet) {
    this.animation = new Animation(spritesheet, 37, 33, 6, 0.10, 6, true, 2);
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 300);
}

Bubbles.prototype = new Entity();
Bubbles.prototype.constructor = Bubbles;

Bubbles.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 1000) this.x = -230;
    Entity.prototype.update.call(this);
}

Bubbles.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}


function Buttercup(game, spritesheet) {
    this.animation = new Animation(spritesheet, 31.4, 35, 6, 0.10, 6, true, 2);
    this.speed = 200;
    this.ctx = game.ctx;
    this.count = 0;
    Entity.call(this, game, 1000, 350);
}

Buttercup.prototype = new Entity();
Buttercup.prototype.constructor = Bubbles;

Buttercup.prototype.update = function () {

    if (this.x < 0) {
        this.count++;
    }

    if (this.count > 0 && this.x > 1000 - 31.4*2) {
        this.count++;
    }

    if (this.count % 2 === 0) {
        this.x -= this.game.clockTick * this.speed;
    }

    if (this.count % 2 === 1) {
        this.x += this.game.clockTick * this.speed;
    }

    Entity.prototype.update.call(this);
    
}

Buttercup.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}





// AM.queueDownload("./img/RobotUnicorn.png");
// AM.queueDownload("./img/guy.jpg");
// AM.queueDownload("./img/mushroomdude.png");
// AM.queueDownload("./img/runningcat.png");
AM.queueDownload("./img/kirby.png");
AM.queueDownload("./img/ppg_bg.png");
AM.queueDownload("./img/bubbles_sprite.png");
AM.queueDownload("./img/buttercup_tornado.png");


AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/ppg_bg.png")));
    //gameEngine.addEntity(new MushroomDude(gameEngine, AM.getAsset("./img/mushroomdude.png")));
    // gameEngine.addEntity(new Cheetah(gameEngine, AM.getAsset("./img/runningcat.png")));
    gameEngine.addEntity(new Bubbles(gameEngine, AM.getAsset("./img/bubbles_sprite.png")));
    gameEngine.addEntity(new Kirby(gameEngine, AM.getAsset("./img/kirby.png")));
    gameEngine.addEntity(new Buttercup(gameEngine, AM.getAsset("./img/buttercup_tornado.png")));

    console.log("All Done!");
});