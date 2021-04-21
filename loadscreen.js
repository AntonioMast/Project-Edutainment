//The point of this script is to create a scene that lets users load in assets.
class loadscreen extends Phaser.Scene {
    constructor() {
            super({key:"loadscreen"});
    }

    //used to load in assets
    preload() {
        //sets background to dark gray
        this.cameras.main.setBackgroundColor('#262626')

        //sets loading text
        var loadingText;
        loadingText = this.add.text(this.game.renderer.width / 2.6, this.game.renderer.height/3, 'Loading...', { fontSize: '64px', fontFamily: 'Futura,Trebuchet MS,Arial,sans-serif', fill: '#FFF3ED' });

        //loads assets into ram
        this.load.image("MENU",'./assets/TitleScreen.png');
        this.load.image("MENU2",'./assets/ChalkBoard.png');
        this.load.image("TEXTBUBBLE",'./assets/textBubble.png');
        this.load.image("CHECKMARK",'./assets/checkMark.png');
        this.load.image("XMARK",'./assets/X.png');
        this.load.image("SPEAKER",'./assets/speaker.png');
        this.load.image("SPEAKEROFF",'./assets/speaker-off.png');
        this.load.image("PUZZLEPIECE",'./assets/puzzlePiece.png');
        this.load.spritesheet('DINO', './assets/vita.png', { frameWidth: 96, frameHeight: 96, endFrame: 23 });
        this.load.spritesheet('STATES', './assets/spritesheetStates.png', { frameWidth: 128, frameHeight: 128, endFrame: 49 });
        this.load.spritesheet('ROCKS', './assets/rocksSheet.png', { frameWidth: 380, frameHeight: 285, endFrame: 26 });
        this.load.audio("MUSIC1", ['./assets/Sneaky Steps.mp3', './assets/Sneaky Steps.ogg']);
        this.load.audio("MUSIC2", ['./assets/IntermissionBeat.mp3', './assets/IntermissionBeat.ogg']);
        this.load.audio("MUSIC3", ['./assets/On Tiptoe.mp3', './assets/On Tiptoe.ogg']);
        this.load.audio("MUSIC4", ['./assets/Movin On.ogg']);
        this.load.audio("MUSIC5", ['./assets/Ride the Wave.ogg']);
        this.load.audio("MUSIC6", ['./assets/Happy Stroll.ogg']);
        this.load.audio("MUSIC7", ['./assets/Crafty Critters.ogg']);
        this.load.audio("JINGLE", ['./assets/jingle.ogg']);
        this.load.audio("CLICK", ['./assets/click.ogg']);

        //creates a rectangle to represent a loading bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0x23666B //Teal-ish
            }
        })

        //repositions loading bar
        loadingBar.x += this.game.renderer.width * 0.05;
    
        //sets loading bar to fill as objects load
        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * 0.9 * percent, 20);
        })

        //loads the menu scene when loading is complete
        this.load.on("complete", () => {
            this.scene.start("mainmenu");
        });
        
    }


}