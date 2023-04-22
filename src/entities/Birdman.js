import Phaser from "phaser";

class Birdman extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'birdman');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
 
    }

    init() {
        this.gravity = 500; 
        this.body.setGravity(0, 500);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);
        this.setImmovable(true);
        this.setSize(20, 45);
        this.setOffset(7, 22);
    }

    addCollider(otherGameObject, callback) {
        this.scene.physics.add.collider(this, otherGameObject, callback, null, this)
    }
}
export default Birdman;