// PlayerCharacter.js
import { Character } from './character.js';

export class PlayerCharacter extends Character {
  constructor(scene, x, y) {
    super(scene, x, y, 'girl_walk');
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