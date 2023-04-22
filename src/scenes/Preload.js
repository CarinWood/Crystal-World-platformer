import Phaser from "phaser";

class Preload extends Phaser.Scene {
    constructor(config) {
            super('Preload')
    }

    preload() {
        this.load.tilemapTiledJSON('map', 'assets/crystal_world_map.json');
        this.load.image('tiles-1', 'assets/main_lev_build_1.png');
        this.load.spritesheet('player', 'assets/player/move_sprite_1.png', {
            frameWidth: 32, frameHeight: 38, spacing: 32,
        })
        this.load.spritesheet('birdman', './assets/enemy/enemy_sheet.png', {
            frameWidth: 32, frameHeight: 64, spacing: 32,
        });

    }

    create() {
        this.scene.start('Play')

    }

}

export default Preload