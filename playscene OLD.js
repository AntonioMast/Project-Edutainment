//The point of this script is to create a scene that lets users play the game
class playscene extends Phaser.Scene {
    constructor() {
            super({key:"playscene"});
    }

    preload() {
        //sets background to dark gray
        this.cameras.main.setBackgroundColor('#2B2B2B')
    }

    //variable declarations & game-object creations
    create(){
        this.exitbutton = this.add.image(0,0,'EXITICON').setOrigin(0);
        this.exitbutton.setScale(1.5);
        this.exitbutton.setDepth(5);
        this.exitbutton.setInteractive().on('pointerdown', () => {
            this.menumusic3.stop();
            this.scene.start("mainmenu");
        } );

        //play music
        this.menumusic3 = this.sound.add("MUSIC3");
        this.menumusic3.play();
    
        /****************************************************/
        /* The Following Code Is Used for Rendering Objects */
        /****************************************************/

        let upperMenu = this.add.graphics({
            fillStyle: {
                color: 0x000000 //Black
            }
        })
        upperMenu.setDepth(4);
    
        //sets side panel to position
        upperMenu.fillRect(0, 0, this.game.renderer.width, 30);
    }

}