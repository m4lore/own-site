// Character.js
export class Character {
    constructor(scene, x, y, texture) {
      this.scene = scene;
      this.sprite = scene.physics.add.sprite(x, y, texture);
      this.sprite.body.setSize(24, 128);
      this.sprite.body.setOffset(32, 0);
    }
  }