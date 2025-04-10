// NPCCharacter.js
import { Character } from './character.js';

export class NPCCharacter extends Character {
  constructor(scene, x, y) {
    super(scene, x, y, 'npc_idle');
    this.sprite.setImmovable(true);
    this.sprite.setFlipX(true);
    this.sprite.body.allowGravity = false;
  }
  
  playIdleAnimation() {
    this.sprite.play('npc_idle_anim');
  }
}