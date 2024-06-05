
//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------
/**
 * Base class for all soldier types.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc Game scene.
 */
Winners.entity.SoldierUtil = function (
    x,
    y,
    game,
    enemy,
    spriteType,
    shootDistance,
    moveSpeed,
    shootCooldown,
    SoldierOwner
) {
    this.shootDistance = shootDistance;
    this.moveSpeed = moveSpeed;
    this.shootCooldown = shootCooldown;
    this.lastShootTime = 0;
    this.game = game;
    this.SoldierOwner = SoldierOwner;
    this.enemy = enemy;
    this.isDead = false;
    this.layer = this.game.layer0;

    rune.display.Sprite.call(this, x, y, 32, 32, spriteType);
    this.layer.addChild(this);

    if (enemy === this.game.player) {
        this.texture.replaceColor(
            new rune.color.Color24(102, 102, 102),
            new rune.color.Color24(172, 50, 50)
        );
    } else if (enemy === this.game.player2) {
        this.texture.replaceColor(
            new rune.color.Color24(0, 0, 0),
            new rune.color.Color24(172, 50, 50)
        );
    }
};

Winners.entity.SoldierUtil.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
    this.m_initAnimation();
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------
Winners.entity.SoldierUtil.prototype = Object.create(
    rune.display.Sprite.prototype
);
Winners.entity.SoldierUtil.prototype.constructor = Winners.entity.SoldierUtil;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------
/**
 * Updated within a fixed time interval "loop", where it runs or checks the state of the specified properties.
 * @param {number} step - The time step for the update.
 * @returns {undefined}
 */
Winners.entity.SoldierUtil.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);

    this.currentPosition = new rune.geom.Point(this.x, this.y);
    this.targetPosition = new rune.geom.Point(this.enemy.centerX, this.enemy.centerY);

    this.distanceX = this.targetPosition.x - this.currentPosition.x;
    this.distanceY = this.targetPosition.y - this.currentPosition.y;
    this.distance = this.currentPosition.distance(this.targetPosition);

    if (this.distance <= this.shootDistance && this.distance > 90) {
        if (this.animation) {
            this.animation.gotoAndPlay("idle");
        }

        var currentTime = Date.now();
        if (currentTime - this.lastShootTime >= this.shootCooldown) {
            this.shoot();
            this.lastShootTime = currentTime;
        }
    } else {
        this.distanceX /= this.distance;
        this.distanceY /= this.distance;
        this.x += this.distanceX * this.moveSpeed;
        this.y += this.distanceY * this.moveSpeed;
        if (this.animation) {
            this.animation.gotoAndPlay("walk");
        }
    }

    this.x = rune.util.Math.clamp(this.x, 0, 1280 - this.width);
    this.y = rune.util.Math.clamp(this.y, 0, 720 - this.height);

    var angle = Math.atan2(this.distanceY, this.distanceX);
    this.rotation = angle * (180 / Math.PI);

    if (this.enemy.hitTest(this)) {
        this.handleKillSoldier();
    }
    
    this.game.bullets.hitTest(
        this,
        function (bullet, soldier) {
            
            if (bullet.bulletTarget == soldier.SoldierOwner) {
                console.log(soldier, this)
                console.log(bullet)
                this.game.bullets.removeMember(bullet, true);
                this.handleKillSoldier();
            }
        },
        this
    );
  
};

/**
 * Method to handle the animation creation related to the soldier service class.
 * @returns {undefined}
 */
Winners.entity.SoldierUtil.prototype.m_initAnimation = function () {
    this.animation.create("shoot", [0, 3], 5, true);
    this.animation.create("idle", [0], 1, true);
    this.animation.create("walk", [0, 1], 5, true);
};

/**
 * Method to be overridden by specific soldier types for shooting behavior.
 * @returns {undefined}
 */
Winners.entity.SoldierUtil.prototype.shoot = function () {
    // To be implemented by specific soldier types
};

/**
 * Method to handle the killing of a soldier.
 * @returns {undefined}
 */
Winners.entity.SoldierUtil.prototype.handleKillSoldier = function () {
    console.log(this)
    var m_this = this;
    this.game.layer0.removeChild(this, true);
    this.isDead = true;
    var powerUpProb = Math.floor(Math.random() * 4);

    if ((this.isDead && powerUpProb == 0) || powerUpProb == 2) {
        this.game.timers.create({
            duration: 1000,
            onComplete: function () {
                m_this.createPowerups();
            },
        });
    }
};

/**
 * Method to create powerups.
 * @returns {undefined}
 */
Winners.entity.SoldierUtil.prototype.createPowerups = function () {
    var ranX = Math.floor(Math.random() * (1160 - 200 + 1)) + 200;
    var ranY = Math.floor(Math.random() * (600 - 200 + 1)) + 200;
    var powerUp = new Winners.entity.Powerup(ranX, ranY, this.game, this.enemy);
    this.game.camera.addChild(powerUp);
};

/**
 * Disposes of the soldier service.
 * @returns {undefined}
 */
Winners.entity.SoldierUtil.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
};