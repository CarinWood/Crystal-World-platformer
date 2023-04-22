import Phaser from "phaser";
import Player from "../entities/Player";
import Birdman from "../entities/Birdman";

class Play extends Phaser.Scene {
    constructor(config) {
            super('Play')
            this.config = config;
    }

    preload() {
   

    }

    create() {
      //create the world map:
      const map = this.make.tilemap({key: 'map'});
      const tileset1 = map.addTilesetImage('main_lev_build_1', 'tiles-1');
      const playerZones = this.getPlayerZones(map.getObjectLayer('player_zones'))

      
      
      


     
   

  

      //Create platformsColliders, platforms and environment layers:
      const platformsColliders = map.createStaticLayer('platform_colliders', tileset1);
      platformsColliders.setCollisionByProperty({collides: true});

      const environment = map.createStaticLayer('environment', tileset1);

      const enemySpawns = map.createStaticLayer('enemy_spawns', tileset1);

      //Create player and enemy:  
      this.player = new Player(this, playerZones.start.x, playerZones.start.y)
  
      
      this.enemy = new Birdman(this, 510, 428)
   
      const platforms = map.createStaticLayer('platforms', tileset1);

   
 


      //add colliders:  

        this.player.addCollider(platformsColliders);
        this.enemy.addCollider(platformsColliders);
        this.physics.add.collider(this.enemy, this.player)
      
     
        

        this.createEndOfLevel(playerZones.end, this.player)

       

    //Camera:
    this.setupFollowCamera(this.player);

      

    }

    
    setupFollowCamera(player) {
            const {width, height, mapOffset} = this.config;
            this.physics.world.setBounds(0, 0, width + mapOffset, height + 200)
            this.cameras.main.setBounds(0, 0, width + mapOffset, height).setZoom(1.5);
            this.cameras.main.startFollow(player);
    }

    getPlayerZones(playerZonesLayer) {
            const playerZones = playerZonesLayer.objects;
            return {
                start: playerZones.find(zone => zone.name === 'startZone'),
                end: playerZones.find(zone => zone.name === 'endZone')
            }
    }

    createEndOfLevel(end, player) {
           const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end').setAlpha(0).setSize(5, 250).setOrigin(0.5, 2)

            const endLevelOverlap = this.physics.add.overlap(player, endOfLevel, () => {
                endLevelOverlap.active = false;
                console.log('player has reached the end')
            })

    }

      
    

}

export default Play;