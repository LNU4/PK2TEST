//------------------------------------------------------------------------------
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
Winners.entity.Player = function(x, y) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, 32, 32, "winner-mainchar");
   
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Player.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Player.prototype.constructor = Winners.entity.Player;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Player.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    this.m_initPhysics();
    this.m_initAnimation();
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Player.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.m_updateInput();
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Player.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
Winners.entity.Player.prototype.m_initPhysics = function() {
    this.velocity.drag.x = 0.05;
    this.velocity.drag.y = 0.05;
    this.velocity.max.x = 1.8;
    this.velocity.max.y = 1.8;
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
Winners.entity.Player.prototype.m_initAnimation = function() {
    this.animation.create("idle", [0,1,2], 1, true);
    this.animation.create("walk", [0,2], 2, true);
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
Winners.entity.Player.prototype.m_updateInput = function() {
    if (this.keyboard.pressed("D")) {
        this.velocity.x += 0.15;
        this.flippedX = false;
        this.rotation = 0;
        this.animation.gotoAndPlay("walk");
    }
    
    if (this.keyboard.pressed("A")) {
        this.velocity.x -= 0.15;
        this.flippedX = true;
        this.rotation = 0;
        this.animation.gotoAndPlay("walk");
    }
    
    if (this.keyboard.pressed("S")) {
        this.velocity.y += 0.15;
        this.rotation = 90;
        //this.flippedY = false;
        this.animation.gotoAndPlay("walk");
    }
    
    if (this.keyboard.pressed("W")) {
        this.velocity.y -= 0.15;
        //this.flippedY = true;
        this.rotation = (-90);
        this.animation.gotoAndPlay("walk");
    }
    
    if (rune.util.Math.abs(this.velocity.x) <= 0 && rune.util.Math.abs(this.velocity.y) <= 0) {
        this.animation.gotoAndPlay("idle");
    }
};