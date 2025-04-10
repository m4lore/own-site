import { PlayerCharacter } from './player.js';
import { NPCCharacter } from './npc.js';
import { Dialog } from './dialog.js';

document.addEventListener('DOMContentLoaded', () => {
  window.game = new MyGame();
});
// define scene classes

/* 
class IntroScene extends Phaser.Scene {
  constructor() {
    super('IntroScene');
  }

  preload() {
    this.load.image('bed', 'assets/images/bed.png');
  }

  create() {
    this.add.image(400, 225, 'bed').setScale(0.5);
    this.add.text(400, 100, 'You feel tired...\nTime to dream.', {
      font: '24px monospace',
      fill: '#fff',
      align: 'center'
    }).setOrigin(0.5);

    const startBtn = this.add.text(400, 300, 'Sleep', {
      font: '20px monospace',
      backgroundColor: '#9d4edd',
      padding: { x: 10, y: 5 },
      fill: '#fff'
    }).setOrigin(0.5).setInteractive();

    startBtn.on('pointerdown', () => {
      this.scene.start('AnimationTestScene');
    });
  }
}
*/
class AnimationTestScene extends Phaser.Scene {
  constructor() {
    super('AnimationTestScene');
  }

  preload() {
    this.load.image('background', 'assets/images/background/background.jpg', { width: 800, height: 450 });
    this.load.spritesheet('player_idle', 'assets/images/sprite/player/Idle.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('player_walk', 'assets/images/sprite/player/Walk.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('npc_idle', 'assets/images/sprite/npcs/girl_1/Idle.png', { frameWidth: 128, frameHeight: 128 });
  }

  create() {
    // add background and ground
    this.add.image(0, 0, 'background').setDisplaySize(800, 450).setOrigin(0, 0);
    const ground = this.physics.add.staticGroup();
    ground.create(400, 435, 'background').setAlpha(0.0).setDisplaySize(800, 30).refreshBody();

    // create characters using the new classes
    this.player = new PlayerCharacter(this, 100, 355);
    this.npc = new NPCCharacter(this, 700, 355);

    // set collisions
    this.physics.add.collider(this.player.sprite, ground);
    this.physics.add.collider(this.player.sprite, this.npc.sprite);

    // define animations
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player_walk', { start: 0, end: 11 }),
      frameRate: 15,
      repeat: -1
    });
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 6 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'npc_idle_anim',
      frames: this.anims.generateFrameNumbers('npc_idle', { start: 0, end: 8 }),
      frameRate: 6,
      repeat: -1
    });

    this.npc.playIdleAnimation();

    // setup input (WASD, space, + Enter)
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE
    });
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    // === Dialog ===
    this.dialogSystem = new Dialog(this);

    this.dialogLines = [
      "Questo è un test",
      "Non badare a quello che c'è scritto",
      "Almeno, per ora..."
    ];
  }

  update() {
    const speed = 150;
    const keys = this.cursors;

    // reset horizontal velocity
    this.player.sprite.setVelocityX(0);

    if (keys.left.isDown) {
      this.player.moveLeft(speed);
    } else if (keys.right.isDown) {
      this.player.moveRight(speed);
    } else {
      this.player.stop();
    }

    if (keys.up.isDown || keys.space?.isDown) {
      this.player.jump();
    }

    // calculate distance
    const dist = Phaser.Math.Distance.Between(
      this.player.sprite.x, this.player.sprite.y,
      this.npc.sprite.x, this.npc.sprite.y
    );

    // Start the dialog only if not already active and if player is in range
    if (!this.dialogSystem.dialogBox.visible && dist < 40 && Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      this.dialogSystem.start(this.dialogLines);
    }
  }
}
  
// create a main game class that encapsulates the game configuration
class MyGame extends Phaser.Game {
  constructor() {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 450,
      backgroundColor: '#1a1a1a',
      parent: 'game-container',
      scene: [AnimationTestScene],
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 400 }, debug: false }
      }
    };
    super(config);
  }
}

// initialize the game when DOM is loaded