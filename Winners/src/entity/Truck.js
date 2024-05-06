///------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
Winners.entity.Truck = function(x, y, player, player2, layer0, game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */
    this.soldier = null; 
    rune.display.Sprite.call(this, x, y, 40, 40, "Truck");
    this.player2 = player2;
    this.layer0 = layer0;
    this.player = player;
    this.game = game; 
    this.deadSoldiers = 0;  // test
    this.movementspeed = 5; 
    this.reachedPlayer = false;
    
    
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Truck.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Truck.prototype.constructor = Winners.entity.Truck;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Truck.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);

    this.m_initAnimation();
    this.m_initPhysics();
    
    console.log(this.game)
};


Winners.entity.Truck.prototype.m_initAnimation = function () {
    //   this.life.globalX = this.globalX;
    // this.life.globalY = this.globalY;
    this.animation.create("idle", [0], 1, true);
    this.animation.create("walk", [0, 1], 1, true);
};

Winners.entity.Truck.prototype.stopAndSpawnSoldiers = function() {
    
    this.velocity.x = 0;
    var truckX = this.x; 
    var truckY = this.y;
    this.soldierArr = [];
    console.log(this.soldierArr)
    for (var i = 0; i < 3; i++) {
        
        var angle = Math.random() * Math.PI * 2;
        var distance = 30;
        var soldierX = truckX + Math.cos(angle) * distance;
        var soldierY = truckY + Math.sin(angle) * distance;
        
        
         this.soldier = new Winners.entity.Soldiers(soldierX, soldierY, this.player2, this.layer0, this.game);
         this.soldierArr.push(this.soldier);
        
    }
    console.log(this.soldierArr)
};



/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Truck.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
   /* if (this.game.player2.hitTest(this.soldier))   {
        console.log('HIT')
        this.layer0.removeChild(this.soldier);
    }*/
    if (!this.reachedPlayer) {
        var dx = this.player2.x - this.x;
        var dy = this.player2.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        
        if (distance <= 120) {
            this.reachedPlayer = true;
            this.stopAndSpawnSoldiers();
        } else {
            
            dx /= distance;
            dy /= distance;
            this.x += dx * this.movementspeed;
            this.y += dy * this.movementspeed;
        }

 }

 if(this.hitTestAndSeparate(this.game.player2)) {
    console.log('stop there')
 }
 
    
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Truck.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

Winners.entity.Truck.prototype.m_initPhysics = function() {
    this.velocity.drag.x = 0.05;
    this.velocity.drag.y = 0.05;
    this.velocity.max.x = 1.8;
    this.velocity.max.y = 1.8;
  

}

