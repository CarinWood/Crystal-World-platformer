import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {
        this.setSize(20, 38)      
        this.gravity = 500;
        this.playerSpeed = 200;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.jumpCount = 0;
        this.consecutiveJumps = 1;
        this.setOrigin(0.5, 1);

        this.body.setGravity(0, 500);
        this.setCollideWorldBounds(true);

        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('player', {start: 0, end: 7}),
            frameRate: 8,
            repeat: -1,
        })
        
        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNumbers('player', {start: 11, end: 16}),
            frameRate: 8,
            repeat: -1,
        })

        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNumbers('player', {start: 17, end: 23}),
            frameRate: 2,
            repeat: -1,
        })
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update() {
      
        const {left, right, space, up} = this.cursors;
        const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
        const onFloor = this.body.onFloor();
        

        if(left.isDown) {
            this.setVelocityX(-150);
            this.play('run', true);
            this.flipX = true;
      
        } else if (right.isDown) {
            this.setVelocityX(150)
            this.play('run', true);
            this.flipX = false
        } else {
            this.setVelocityX(0)
            this.play('idle', true);
        }

        if(isUpJustDown && (onFloor || this.jumpCount < this.consecutiveJumps)) {
             
                this.setVelocityY(-300)
                this.jumpCount++;
        }

        if(onFloor) {
            this.jumpCount = 0;
        } else {
            this.play('jump', true)
        }



  
    }

    addCollider(otherGameObject, callback) {
        this.scene.physics.add.collider(this, otherGameObject, callback, null, this)
    }

}

export default Player;