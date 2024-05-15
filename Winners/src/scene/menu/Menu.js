//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 *
 * Game scene.
 */
Winners.scene.Menu = function () {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  /**
   * Calls the constructor method of the super class.
   */
  rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.scene.Menu.prototype = Object.create(rune.scene.Scene.prototype);
Winners.scene.Menu.prototype.constructor = Winners.scene.Menu;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated.
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
Winners.scene.Menu.prototype.init = function () {
  rune.scene.Scene.prototype.init.call(this);
  this.bg = new rune.display.Graphic(0, 0, 1280, 720, "mainbackground");
  this.stage.addChild(this.bg);
  var text = new rune.text.BitmapField("Winners ");
  //text.debug = true;
  text.autoSize = true;
  text.scaleX = 6;
  text.scaleY = 6;
  text.x = 500;
  text.y = 160;
  //text.center = this.cameras.getCameraAt(0).viewport.center;

  this.stage.addChild(text);

  this.menu = new rune.ui.VTMenu();

  this.menu.add("Best of ONE round");
  this.menu.add("Best of THREE rounds");
  this.menu.add("How to Play");
  this.menu.add("Quit");
  this.menu.scaleX = 2;
  this.menu.scaleY = 2;
  this.menu.center = this.application.screen.center;
  this.stage.addChild(this.menu);
  this.selected = 0;
};

/**
 * This method is automatically executed once per "tick". The method is used for
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.scene.Menu.prototype.update = function (step) {
  rune.scene.Scene.prototype.update.call(this, step);
  /*
    if (this.keyboard.justPressed("SPACE")) {
        this.application.scenes.load([new Winners.scene.Game()]);
    }
    */

    
  if (this.keyboard.justPressed("UP")) {
    this.menu.up();
    this.selected = (this.selected - 1 + 4) % 4;
  } else if (this.keyboard.justPressed("DOWN")) {
    this.menu.down();
    this.selected = (this.selected + 1) % 4;

  }


  if (this.keyboard.justPressed("SPACE")) {
    switch (this.selected) {
      case 0:
        this.menu.select();
        this.timers.create({
          duration: 2000,
          onComplete: function () {
            this.application.scenes.load([new Winners.scene.Game(1, 1, [])]);
          },
        });
        break;
      case 1:
        this.menu.select();
        this.timers.create({
          duration: 2000,
          onComplete: function () {
            this.application.scenes.load([new Winners.scene.Game(3, 1, [])]);
          },
        });
        break;
      case 2:
        this.menu.select();
        this.timers.create({
          duration: 2000,
          onComplete: function () {
            this.application.scenes.load([new Winners.scene.Howtoplay()]);
          },
        });
        break;
      case 3:
        this.menu.select();
        this.timers.create({
          duration: 2000,
          onComplete: function () {
            this.application.stop();
          },
        });
        break;
      default:
        break;
    }
  }
};

/**
 * This method is automatically called once just before the scene ends. Use
 * the method to reset references and remove objects that no longer need to
 * exist when the scene is destroyed. The process is performed in order to
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
Winners.scene.Menu.prototype.dispose = function () {
  rune.scene.Scene.prototype.dispose.call(this);
};
