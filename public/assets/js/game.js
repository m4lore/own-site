document.addEventListener('DOMContentLoaded', () => {
  window.game = new MyGame();
});

// define classes for game characters
class PlayerCharacter {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, 'girl_walk');
    this.sprite.body.setSize(24, 128);
    this.sprite.body.setOffset(32, 0);
    this.sprite.setBounce(0.1);
    this.sprite.setCollideWorldBounds(true);
  }
  
  moveLeft(speed) {
    this.sprite.setVelocityX(-speed);
    this.sprite.setFlipX(true);
    this.sprite.anims.play('walk', true);
  }
  
  moveRight(speed) {
    this.sprite.setVelocityX(speed);
    this.sprite.setFlipX(false);
    this.sprite.anims.play('walk', true);
  }
  
  stop() {
    this.sprite.setVelocityX(0);
    this.sprite.anims.play('idle', true);
  }
  
  jump() {
    if (this.sprite.body.touching.down) {
      this.sprite.setVelocityY(-100);
    }
  }
}

class NPCCharacter {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, 'npc_idle');
    this.sprite.body.setSize(24, 128);
    this.sprite.body.setOffset(32, 0);
    this.sprite.setImmovable(true);
    this.sprite.setFlipX(true);
    this.sprite.body.allowGravity = false;
  }
  
  playIdleAnimation() {
    this.sprite.play('npc_idle_anim');
  }
}

// define Scene classes

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

class MiniGameScene extends Phaser.Scene {
  constructor() {
    super('MiniGameScene');
  }

  preload() {
    this.load.image('player', 'assets/images/player.png');
    this.load.image('obstacle', 'assets/images/obstacle.png');
  }

  create() {
    this.player = this.physics.add.sprite(400, 400, 'player');
    this.cursors = this.input.keyboard.createCursorKeys();

    this.obstacles = this.physics.add.group();
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        const x = Phaser.Math.Between(0, 800);
        const obstacle = this.obstacles.create(x, 0, 'obstacle');
        obstacle.setVelocityY(200);
      }
    });

    this.physics.add.overlap(this.player, this.obstacles, () => {
      this.scene.start('EndingScene');
    });

    this.add.text(10, 10, 'Dodge the doubts!', { font: '18px monospace', fill: '#fff' });

    // Automatically end after 15 seconds
    this.time.delayedCall(15000, () => {
      this.scene.start('EndingScene');
    });
  }

  update() {
    this.player.setVelocity(0);
    if (this.cursors.left.isDown) this.player.setVelocityX(-200);
    if (this.cursors.right.isDown) this.player.setVelocityX(200);
  }
}

class EndingScene extends Phaser.Scene {
  constructor() {
    super('EndingScene');
  }

  create() {
    this.add.text(400, 200, 'You made it!\nYour dream is alive again 💡', {
      font: '24px monospace',
      fill: '#fff',
      align: 'center'
    }).setOrigin(0.5);

    const restartBtn = this.add.text(400, 300, 'Replay Dream', {
      font: '20px monospace',
      backgroundColor: '#00b894',
      padding: { x: 10, y: 5 },
      fill: '#fff'
    }).setOrigin(0.5).setInteractive();

    restartBtn.on('pointerdown', () => {
      this.scene.start('IntroScene');
    });
  }
}

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

/*     this.physics.add.collider(
      this.player.sprite,
      this.npc.sprite,
      (playerSprite, npcSprite) => {
        // This runs every frame while they remain in contact
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
          this.handleDialog();
        }
      },
      null,
      this
    );     */

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

    // === Dialog variables ===
    this.dialogActive = false;     // are we in a dialog?
    this.dialogTyping = false;     // are we currently typing text?
    this.dialogLines = [           // lines to display
      "Hello, traveler...",
      "I see you're on a quest!",
      "Farewell, for now..."
    ];
    this.currentLineIndex = 0;     // which line index in dialogLines
    this.currentCharIndex = 0;     // character index within the current line

    // create a semi-transparent box near the bottom for dialog text
    this.dialogBox = this.add.graphics(400, 400, 760, 80, 0xc77dff, 0.7);
    this.dialogBox.setVisible(false);
    this.dialogBox.lineStyle(3, 0x9d4edd, 1); // outer purple border
    this.dialogBox.strokeRoundedRect(20, 360, 760, 80, { tl: 12, tr: 12, bl: 12, br: 12 });
    this.dialogBox.fillStyle(0xc77dff, 0.6); // soft purple background
    this.dialogBox.fillRoundedRect(20, 360, 760, 80, { tl: 12, tr: 12, bl: 12, br: 12 });

    // create a text element for the dialog
    this.dialogText = this.add.text(50, 365, '', {
      font: '18px monospace',
      fill: '#ffffff',
      shadow: {
        offsetX: 1,
        offsetY: 1,
        color: '#000000',
        blur: 1,
        stroke: false,
        fill: true
      },
      wordWrap: { width: 700 }
    });
    this.dialogText.setVisible(false);
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

    // Calculate distance:
    const dist = Phaser.Math.Distance.Between(
      this.player.sprite.x, this.player.sprite.y,
      this.npc.sprite.x, this.npc.sprite.y
    );

    // If distance is under 50px (example) and Enter is pressed:
    if (dist < 40 && Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      this.handleDialog();
    }
  }

  handleDialog() {
    // if dialog is not active, start it
    if (!this.dialogActive) {
      this.startDialog();
      return;
    } 

    // if dialog is active and currently typing, skip to end of this line
    if (this.dialogTyping === true) {
      console.log('Skipping to end of line');
      this.completeLine();
      return;
    }

    // if we've finished typing the current line, go to the next line (or end dialog)
    this.advanceDialog();
  }

  startDialog() {
    this.dialogActive = true;
    this.currentLineIndex = 0;
    this.dialogBox.setVisible(true);
    this.dialogText.setVisible(true);
    this.startTypingLine();
  }

  advanceDialog() {
    this.currentLineIndex++;
    if (this.currentLineIndex >= this.dialogLines.length) {
      // no more lines in the dialog, so end it
      this.endDialog();
      return;
    }
    // start typing the next line
    this.startTypingLine();
  }

  startTypingLine() {
    // Stop any existing typing event if it’s still running
    if (this.typingEvent) {
      this.typingEvent.remove(false);
    }
    
    this.dialogTyping = true;
    this.currentCharIndex = 0;
    const line = this.dialogLines[this.currentLineIndex];
    this.dialogText.setText('');
  
    // Create a looped timer to type out the text character-by-character
    this.typingEvent = this.time.addEvent({
      delay: 20,          // Adjust for typing speed
      loop: true,
      callback: () => {
        // Add the next character if we still have some left
        if (this.currentCharIndex < line.length) {
          this.dialogText.setText(
            this.dialogText.text + line[this.currentCharIndex]
          );
          this.currentCharIndex++;
        } else {
          // Done typing the current line
          this.dialogTyping = false;
          // Remove this event so it doesn't keep looping
          this.typingEvent.remove(false);
          this.typingEvent = null;
        }
      }
    });
  }

  completeLine() {
    // Instantly show the entire line
    const line = this.dialogLines[this.currentLineIndex];
    this.dialogText.setText(line);
    this.dialogTyping = false;

    // If we still have a typing event running, remove it
    if (this.typingEvent) {
      this.typingEvent.remove(false);
      this.typingEvent = null;
    }
  }

  endDialog() {
    // hide the dialog box and text
    this.dialogActive = false;
    this.dialogBox.setVisible(false);
    this.dialogText.setVisible(false);
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
      scene: [IntroScene, MiniGameScene, EndingScene, AnimationTestScene],
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 400 }, debug: false }
      }
    };
    super(config);
  }
}

// initialize the game when DOM is loaded